import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let blogNumber = 0;
let storedBlogs = 0;
let blogTitle = [];
let blogText = [];
let storedBlogTitle = [];
let storedBlogText = [];

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get("/", (req, res) => {
  console.log("homepage get route hit");
  res.render("index.ejs");
});
app.get("/delete", (req, res) => {
  console.log("delete get route hit");
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  console.log("create get route hit");
  res.render("blog.ejs");
});

app.get("/own-blog", (req, res) => {
  console.log("own-blog get route hit");
  //console.log("Cookie Section");
  //console.log(storedBlogText);
  //console.log(storedBlogTitle);
  console.log(blogTitle);
  console.log(blogText);
  console.log(storedBlogs);
  res.render("own-blog.ejs", {
    BlogTitle: blogTitle,
    BlogText: blogText,
    BlogNumber: storedBlogs,
  });
});
app.post("/create-blog", (req, res) => {
  console.log("create-blog post route hit");
  //console.log("reached blog submission route");
  blogTitle[blogNumber] = req.body["name"];
  blogText[blogNumber] = req.body["blog"];
  storedBlogs = blogNumber;
  console.log(blogTitle[blogNumber]);
  console.log(blogText[blogNumber]);
  console.log(blogTitle);
  console.log(storedBlogs);
  res.render("own-blog.ejs", {
    BlogTitle: blogTitle,
    BlogText: blogText,
    BlogNumber: storedBlogs,
  });
  blogNumber = blogNumber + 1;

  console.log("for troubleshooting of create-blog");
});

app.post("/delete", (req, res) => {
  let deleteBlog = req.body["delete"];

  console.log(deleteBlog);
  blogTitle[deleteBlog] = "";
  blogText[deleteBlog] = "";
  storedBlogs = storedBlogs - 1;
  console.log("delete post route hit");

  //console.log("Variable storage section hit");
  //console.log(blogTitle);
  //console.log(blogText);
  //console.log("Blog Deleted");
  //const blogTitle = req.body["name"];
  //const blogText = req.body["blog"];
  //blogTitle = "";
  //blogText = "";

  //console.log(blogTitle);
  //console.log(blogText);
  res.render(
    "index.ejs"
    // {
    //BlogTitle: blogTitle,
    //BlogText: blogText,
    //  }
  );
});

// app.post("/submit", (req, res) => {
//   console.log("submit post route hit");
//   const firstName = req.body["fName"];
//   const lastName = req.body["lName"];
//   const fullName = firstName + " " + lastName;
//   //console.log(fullName);
//   //console.log(firstName);
//   res.render("index.ejs", { FULLNAME: fullName });
// });
