import express from 'express'
import { adminLogin, approvedCommentById, getAllBlogsAdmin, getAllComments, getDashBoard } from '../controller/adminController.js';
import { getAllBlogs } from '../controller/blogController.js';
import auth from '../middleware/auth.js';

const adminRouter =  express.Router();

adminRouter.post('/login' , adminLogin);
adminRouter.get('/comments' , auth , getAllComments);
adminRouter.get('/blogs' , auth , getAllBlogsAdmin);
adminRouter.post('/approve-comment' , auth , approvedCommentById);
adminRouter.post('/dashboard' , auth , getDashBoard);

export default adminRouter;