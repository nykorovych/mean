const express = require('express');

const router = express.Router();

const PostController = require('../controllers/posts')
const extractFile = require('../middleware/file')


const checkAuth = require('../middleware/check-auth')




router.post('', checkAuth, extractFile, PostController.createPosts );



router.put('/:id', checkAuth,extractFile, PostController.updatePost)
router.get('/:id', PostController.getPost)
router.get('', PostController.getPosts);

router.delete('/:id', checkAuth, PostController.deletePost)

module.exports = router;
