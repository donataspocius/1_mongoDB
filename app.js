const express = require("express");
const mongoose = require("mongoose");

const Post = require("./models/post.model.js");

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());

// connecting mongoDB (gaunam link iš serverio). grąžina promise.
mongoose
  .connect(
    "mongodb+srv://user:labas@cluster0.xo6dswz.mongodb.net/my-first-database?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch((e) => console.log("connection to mongoDB error" + e));

// Routes
app.get("/api", (req, res) => res.json({ message: "API is running" }));

// CREATE new post in Database
app.post("/api/post", async (req, res) => {
  const newPost = req.body;

  try {
    const post = new Post(newPost);

    const savedPost = await post.save();

    res.json({
      message: "Post saved",
      savedPost,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Post save failed" });
  }
});

// GET all posts
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

// GET post by id
app.get("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  //   const post = await Post.find({ _id: id });
  const post = await Post.findById(id);

  //   if (!post) res.json({ message: "No such post" });
  res.json(post);
});

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

// THEN EXAMPLE
// app.post("/api/post", (req, res) => {
//   const newPost = req.body;
//   console.log(newPost);

//   //   validating newPost if it matches Post model schema. jei neatitiks, mes error. jei ok tai ok.
//   const post = new Post(newPost);
//   //   console.log(post);

// //   saving to Database
//   post
//     .save()
//     .then((post) => {
//       res.json({
//         message: "Post saved",
//         post,
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//       res.json({ message: "Post save failed" });
//     });
// });
