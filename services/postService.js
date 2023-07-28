const Post = require('../models/postModel');
const mongoose=require("mongoose");

class PostService{
    async feed(req){
        const data=await Post.find({}).sort({ createdAt: -1 });
        if(data.length===0){
            return {
                data:null,
                status:200,
                message:"No posts available"
            }
        }
        return {data};
    }

    async getPost(req){
        const postId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
           return {
            data:null,
            status:400,
            message:"Invalid id"
           }
        }
        const data=await Post.findById(postId);
        if(data!==null)
            return {data}
        else
            return {
                data:null,
                status:400,
                message:"Invalid id"
            }
    }

    async createPost(req){
        const { title, description, author } = req.body;

        const newPost = new Post({
          title,
          description,
          author
        });

        const validationError = newPost.validateSync();
        if (validationError) {
        const errors = Object.values(validationError.errors).map(err => err.message);
            return {
                data: null,
                status: 400,
                message: errors.join(', ')
            };
        }
      
        await newPost.save()
        return {data:"Successfully created new post"}
    }

    async updatePost(req) {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return {
        data: null,
        status: 400,
        message: 'Invalid id'
        };
    }

    
        const exist = await Post.findById(postId);
        if (exist === null) {
        return {
            data: null,
            status: 400,
            message: 'Post not found'
        };
        }

        const { title, description } = req.body;

        const updates = { updatedAt: Date.now() };
        if (title) {
        updates.title = title;
        }
        if (description) {
        updates.description = description;
        }

        exist.set(updates);
        const validationError = exist.validateSync();
        if (validationError) {
        const errors = Object.values(validationError.errors).map(err => err.message);
        return {
            data: null,
            status: 400,
            message: errors.join(', ')
        };
        }

        const updatedPost = await exist.save();

        return {
        data: updatedPost,
        status: 200,
        message: 'Post updated successfully'
        };
    }

    async deletePost(req){
        const postId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return {
             data:null,
             status:400,
             message:"Invalid id"
            }
        }

        const exist=await Post.findById(postId)
        if(exist===null){
            return {
                data:null,
                status:400,
                message:"Invalid id"
               }
        }
        await Post.findByIdAndRemove(postId)
        return {data:"Successfully deleted the post"};
    }
}
module.exports=PostService;