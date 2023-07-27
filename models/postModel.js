const mongoose=require("mongoose");

/**
 * schema for Post
 */
const PostSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:20
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        minlength:3
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports=Post;