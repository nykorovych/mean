const Post = require('../models/post');

exports.createPosts =  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.usr.userId
    });
    post.save().then(result => {
      res.status(201).json({
        message: "post added to db",
        post: {
          ...result,
          id: result._id
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'creating a post failed!'
        })
      })
    }
)};

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename
    }
  
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.usr.userId
    })
    Post.updateOne({
      _id: req.params.id,
      creator: req.usr.userId
    }, post).then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'Update successful!'
        })
      } else {
        res.status(401).json({
          message: 'Failed to Authorizite'
        })
      }
  
    })
    .catch(error => {
      res.status(500).json({
        message: "Post wasnt updated Pepeg"
      })
    
    })
  
};

exports.getPosts =  (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
  
    }
    postQuery.then(documents => {
      fetchedPosts = documents;
      return Post.count()
    }).then(count => {
      res.status(200).json({
        message: "posts fetched",
        posts: fetchedPosts,
        maxPosts: count,
      })
  
  
    })
    .catch(error => {
      res.status(500).json({
        message: "No fetchy fetchi"
      })
    })
  
};

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post not found'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "No fetchy fetchi"
      })
    })
};

exports.deletePost =  (req, res, next) => {
    Post.deleteOne({
      _id: req.params.id, creator: req.usr.userId
    }).then(result => {
      if (result.n >0) {
        res.status(200).json({
          message: 'postDeleted!'
        });
      } else {
        res.status(401).json({
          message: 'Cant delete Pepeg'
        })
      }
    }).catch(error => {
      res.status(500).json({
        message: "No delete fetchy fetchi"
      });
    })
    
};