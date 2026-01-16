const Comment = require('../models/Comment');

// Create Comment
exports.createComment = async(req, res) => {
   try {
      const {comment} = req.body;

      const newComment = await Comment.create({ blogId: req.params.id, userId: req.user.id, comment,});
      res.status(201).json({ message: 'Comment added successfully', newComment });

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// Get All Comments on Blog
exports.getComments = async(req, res) => {
   try {
      const comments = await Comment.find({ blogId: req.params.id}).populate("userId","name").sort({ createdAt: -1});

      return res.status(200).json({ comments });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}