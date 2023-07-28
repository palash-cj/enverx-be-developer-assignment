const express=require("express");
const app=express.Router();
const multer=require("multer");
const upload=multer();
const {feed, getPost, createPost, updatePost, deletePost}=require('../controllers/postController');

app.get('/',feed);
app.get('/:id',getPost);
app.post('/',upload.none(),createPost);
app.put('/:id',upload.none(),updatePost);
app.delete('/:id',deletePost);

module.exports=app;