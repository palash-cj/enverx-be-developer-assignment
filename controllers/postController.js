const {sendError, sendResponse}=require('./baseController');
const createError=require('../utils/error')
const PostService=require('../services/postService');
const postServiceInstance = new PostService();

/**
 * feed: returns the content of all the posts in a most recent chronological order
 * @param {*} req 
 * @param {post list with details} res 
 * @param {error message} next 
 */
const feed=async(req,res,next)=>{
    try {
        const data=await postServiceInstance.feed(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("API worked successfully!",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * getPost: fetches the details of post based on id
 * @param {id} req 
 * @param {post details} res 
 * @param {error message} next 
 */
const getPost=async(req,res,next)=>{
    try {
        if(req.params.id!==undefined && req.params.id!==""){
            const data=await postServiceInstance.getPost(req);
            if(data.data!==null){
                res.status(200).send(sendResponse("API worked successfully!",data.data));
            }else{
                next(createError(data.status, data.message))
            }
        }else{
            next(createError(400, "id required"))
        }        
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * createPost: creates new post
 * @param { title, description, author} req 
 * @param { success message } res 
 * @param {error message} next 
 */
const createPost=async(req,res,next)=>{
    try {
        const { title, description, author } = req.body;
        const message = (!title || !description || !author)
            ? (!title ? 'Title is required. ' : '') +
            (!description ? 'Description is required. ' : '') +
            (!author ? 'Author is required.' : '')
            : '';
        
        if (!title || !description || !author) {
            next(createError(400,message));
        }
        const data=await postServiceInstance.createPost(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("API worked successfully!", data.data));
        }else{
            next(createError(data.status, data.message))
        }
    } catch (error) {
        console.log(error)
        next(createError(500,error.message));
    }
}

/**
 * updatePost: updates the post with the passed 
 * @param { title, description} req 
 * @param { success message } res 
 * @param {error message} next 
 */
const updatePost=async(req,res,next)=>{
    try {
        if(req.params.id!==undefined && req.params!=""){
            const { title, description } = req.body;
            const message = (!title && !description)
                ? 'Nothing to update.'
                : '';
            if (!title && !description) {
                next(createError(400,message));
            }
            const data=await postServiceInstance.updatePost(req);
            if(data.data!==null){
                res.status(200).send(sendResponse("API worked successfully!", data.data));
            }else{
                next(createError(data.status, data.message))
            }
        }else{
            next(createError(400, "id required"))
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * deletePost: deletes the post
 * @param {id}req
 * @param {success message}res
 * @param {error message}next
 */
const deletePost=async (req,res,next)=>{
    try {
        if(req.params.id!==undefined && req.params.id!==""){
            const data=await postServiceInstance.deletePost(req);
            if(data.data!==null){
                res.status(200).send(sendResponse("API worked successfully!", data.data));
            }else{
                next(createError(data.status, data))
            }
        }else{
            next(createError(400, "id required"))
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

module.exports={feed, getPost, createPost, updatePost, deletePost};