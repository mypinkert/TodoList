const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Post
router.get('/', async ( req, res) => {
   const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray()); 
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})
// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)        
    });
    res.status(200).send();
});
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://newUser:123abc@dbvue-n6tw5.mongodb.net/admin?retryWrites=true&w=majority', {
        useNewUrlParser: true,
       
    });
    return client.db('vue_express').collection('_posts')
}
module.exports = router;