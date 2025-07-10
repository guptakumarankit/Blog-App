import jwt from 'jsonwebtoken';
import Blog from '../models/user.js';
import Comment from '../models/Comment.js';

export const adminLogin = (req , res) => {
    try {
        const {email , password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            res.json({success : false , message : 'Invalid Credentials'})
        }

        const token = jwt.sign({email} , process.env.JWT_SECRET)
      
        res.json({success : true , token})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export const getAllBlogsAdmin = async (req , res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        res.json({success : true , blogs});
    } catch (error) {
        res.json({success : false , message : error.message});
    }
}

export const getAllComments = async (req ,res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt : -1});
        res.json({success : true , comments});
    } catch (error) {
        res.json({success : false , message : error.message});
    }
}

export const getDashBoard = async (req , res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt : -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished : false});

        const dashBoardData = {
            blogs , comments , drafts , recentBlogs
        }
        // console.log(dashBoardData)
        res.json({success : true , dashBoardData});
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export const deleteCommentById = async(req ,res)=>{
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success : true , message : "Comment deleted Successfully"})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export const approvedCommentById = async(req ,res)=>{
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id , {isApproved : true});
        res.json({success : true , message : "Comment approved Successfully"})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}