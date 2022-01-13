import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async(req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //gettting the start index of every page
        const total = await PostMessage.countDocuments({});

        const posts= await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async(req,res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsByCreator = async(req, res) => {
    const { name } = req.query;
    try {
        const posts = await PostMessage.find({ name });
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Query /posts?page=1 -> page=1
//params /posts/:id /posts/123 -> id=123

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // Test, TEST, test -> test
        const posts = await PostMessage.find({ $or: [ { title } ,  { tags: { $in: tags.split(',') } } ] });
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async(req,res) => {

    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};


export const updatePost = async (req,res) => {
    const { id } = req.params;
    const post = req.body; 
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
       
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const deletePost = async (req, res) =>  {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    try {
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: 'Post SuccessFully Deleted' })
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const likePost = async (req, res) =>  {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    try{
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const post = await PostMessage.findById(id);
        post.comments.push(value);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}