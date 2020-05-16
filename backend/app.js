const express = require ('express');
const  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req,res, next) => {
    const post = req.body;
    console.log (post);
    res.status(201).json({
        message: 'Post added successfully!'
    })
})

app.get ('/api/posts', (req,res,next) => {
    const posts = [
        {id: 'sdfasdf2', title: 'First server-side post', content: 'This is first content'},
        {id: '234sdg', title: 'SECOND server-side post', content: 'This is SECOND content'}
    ];
    res.status(200).json({
        message: 'Posts',
        posts: posts
    });
});

module.exports = app;