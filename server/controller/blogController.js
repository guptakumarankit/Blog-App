import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/user.js'
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req , res) => {
    try {
        const {title , subTitle , description , category , isPublished} = JSON.parse(req.body.blog);

        const imageFile = req.file;
        // console.log(imageFile);

        // check if all fields are present 
        if(!title || !description || !category || !imageFile){
            return res.json({success : false , message : "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to imagekit
        const response = await imagekit.upload({
            file : fileBuffer ,
            fileName : imageFile.originalname,
            folder : "/blogs"
        })

        // optimizaion through imagekit URL transformation 
        const optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {quality : 'auto'}, // Auto compression
                {format : 'webp'}, // convert to modern format 
                {width : '1280'}   // width resizing
            ]
        })

        const image = optimizedImageUrl;
        console.log(image);
          
        // Add in database
        await Blog.create({title , subTitle , description , category , image , isPublished});

        res.json({success : true , message : "Blog added successfully"});
    } catch (error) {
        res.json({success : false , message : error.message});
    }
}

export const getAllBlogs = async (req , res) => {
    try {
        const blogs = await Blog.find({isPublished : true});
        console.log(blogs);
        res.json({success : true , blogs});
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export const getBlogById = async (req , res) => {
   try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if(!blog){
        res.json({success : false , message : "Blog doesn't Found"})
    }
    res.json({success : true , blog})
   } catch (error) {
     res.json({success : false , message : error.message})
   }
}

export const deleteBlogById = async (req , res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // Delete All comments associated with the blog
        await Comment.deleteMany({blog : id})

        res.json({success : true , message : "Blog deleted Successfully"})
    } catch (error) {
        res.json({success : false , message : error.message});
    }
}

export const togglePublish = async (req , res) => {
    try {
        const { id } = req.body;
        // console.log("id" , id)

        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({success : true , message : 'Blog status updated'});
    } catch (error) {
        res.json({success : false , message : error.message});
    }
}

export const addComment = async (req , res) => {
    try {
        const {blog , name , content} = req.body;
        await Comment.create({blog , name , content});
        res.json({success : true , message : 'Comment added for review'});
    } catch (error) {
       res.json({success : false , message : error.message}); 
    }
}

export const getBlogComments = async (req , res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({blog : blogId , isApproved : true}).sort({createdAt : -1})
        res.json({success : true , comments});
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export const generateContent = async(req , res) => {
    try {
        const { prompt } = req.body;
        console.log(prompt);
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format');
        res.json({success: true , content});
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}