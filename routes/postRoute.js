const express=require("express");
const app=express.Router();
const {feed, getPost, createPost, updatePost, deletePost}=require('../controllers/postController');

app.get('/',feed);
app.get('/:id',getPost);
app.post('/',createPost);
app.put('/:id',updatePost);
app.delete('/:id',deletePost);

module.exports=app;