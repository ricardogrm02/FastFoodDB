const express = require('express');
const Blog = require('../model/customer')
const router = express.Router();
const app = express();


router.post('/', async (req, res)=>{
    const blog = new Blog(req.body)
    try{
        await blog.save()
        res.status(201).send(blog)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/', async (req, res)=>{
    const blog = await Blog.find({})
    try{
        await blog.save()
        res.status(200).send(blog)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.delete('/blogs/:id', async (req, res) => {
    try{
        const blogs = await Blog.findByIDAndDelete(req.params.id)
        if(!blog){
            res.status(404).send()
        }
        res.send(blogs)
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const blogs = await Blog.findByIDAndUpdate(req.params.id, req.body, {new:true})
        if(!blog){
            res.status(404).send()
        }
        res.status(200).send(blog)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router