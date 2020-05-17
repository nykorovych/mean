const express = require ('express');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')


const app = express();

mongoose.connect('mongodb+srv://iurii:ak4FxjW9LSwWmE6@cluster0-unshw.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected');
    })
    .catch(() => {
        console.log('connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req,res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then (result => {
        res.status(201).json({
            id: result._id
        })
    });
    
})

app.get ('/api/posts', async (req,res,next) => {
      posts = await Post.find(() => {
        console.log ('ok')});
   
      res.status(201).json({
          message: 'okkk',
          posts: posts });

});

app.delete('/api/posts/:id', (req,res, next) =>{
    Post.deleteOne({_id: req.params.id}).then (result => {
        console.log(result)
    });
    res.status(200).json({
        message: 'postDeleted!'
    });
})
module.exports = app;