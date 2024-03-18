const express = require('express');
const router = express.Router();
const Review = require('../../model/review');

// Customer Reviews

router.post("/", async (req, res)=>{
    // take the body and post a new review 
})

router.get("/", async (req, res)=>{
    // find the user id's reviews and return an array of each object
})

router.get("/:id", async (req, res)=>{
    // find the user id's reviews and return an array of each object
})

router.delete('/:id', async (req, res) => {
    // find review and delete it
})

router.patch('/:id', async (req, res) => {
    // find review and edit it
})

module.exports = router;