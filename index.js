const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const _ = require("lodash");
const cors = require('cors')
app.use(cors());
// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const mongoDBUri = "put-your-uri";
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Content variables
const homeContent = "Lorem ipsum dolor sit amet...";
const aboutContent = "Lorem ipsum dolor sit amet...";
const contactContent = "Lorem ipsum dolor sit amet...";

// Mongoose schema for blogs
const blogSchema = new mongoose.Schema({
    heading: String,
    content: String, // Changed from 'Content' to 'content'
    author: String,
    date: { type: Date, default: Date.now },
    place: String,
    tags: [String]
});


const Blog = mongoose.model("Blog", blogSchema);

app.get("/", async (req, res) => {
    try {
        const posts = await Blog.find({});
        res.render("home", { content: homeContent, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

app.get("/about", (req, res) => {
    res.render("about", { content: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { content: contactContent });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", async (req, res) => {
    const newBlog = new Blog({
        heading: req.body.title,
        content: req.body.post,
        author: req.body.author,
        place: req.body.place,
        tags: req.body.tags.split(',').map(tag => tag.trim()) // convert comma-separated string to array
    });
    try {
        await newBlog.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving post');
    }
});

// Ricordarsi di mettere route non dinamiche PRIMA di una dinamica ;) 
app.get('/search', async (req, res) => {
    if (!req.query.query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const query = req.query.query; // This explicitly fetches the 'query' parameter from the request URL
        const searchResults = await Blog.find({
            heading: { $regex: new RegExp(query, 'i') }
        }).limit(5);
        res.json(searchResults);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send('Error performing search');
    }
});

// Generic routes should come after all specific routes
app.get("/posts/:postName", async (req, res) => {
    try {
        const postName = decodeURIComponent(req.params.postName);  // Explicitly decode, though Express does it
        const post = await Blog.findOne({ heading: new RegExp('^' + _.escapeRegExp(postName) + '$', 'i') });
        if (post) {
            res.render("posts", {
                id : post._id,
                title: post.heading,
                post: post.content,
                author: post.author,
                date: post.date,
                place: post.place,
                tags: post.tags
            });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching post');
    }
});

app.post('/posts/delete/:id', async (req, res) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send('Post not found');
        }
        res.redirect('/'); // Redirect to the homepage or another appropriate page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting post');
    }
});



// Update any redirect or link that refers to this route
// For example, in your views or redirection after creating a post




// Listen on default port 3000
app.listen(3000);
