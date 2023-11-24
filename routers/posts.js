const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// GET /posts
router.get('/', postsController.index);

// GET /posts/:id
/* router.get('/:id', postsController.show); */
router.get('/:slug', postsController.show);

// POST /posts
router.post('/', postsController.store);

// PUT /posts/:id
router.put('/:id', postsController.update);

// DELETE /posts/:id
router.delete('/:id', postsController.destroy);


module.exports = router;