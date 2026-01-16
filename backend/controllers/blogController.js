const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// Create Blog by Admin
exports.createBlog = async (req, res) => {
   try {
      if(!req.file) {
         return res.status(400).json({ message: 'Image is required' });
      }
      const { title, description, tags } = req.body;

      const blog = await Blog.create({
         title,
         description,
         tags,
         image: {
            url: req.file.path,
            public_id: req.file.filename,
         },
      });
      res.status(201).json({ message: 'Blog created successfully',blog});

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update Blog by Admin
exports.updateBlog = async (req, res) => {
   try {
      const { title, description, tags } = req.body;

      const blog = await Blog.findById(req.params.id);

      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }

      if(!req.file) {
         if(blog.image?.public_id) {
            await cloudinary.uploader.destroy(blog.image.public_id);
         }

         blog.image = {
            url: req.file.path,
            public_id: req.file.filename,
         };
      }
      if (title) blog.title = title;
      if (description) blog.description = description;
      if (tags) blog.tags = tags;
      await blog.save();
      return res.status(200).json({ message: 'Blog updated successfully', blog });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Delete Blog by Admin
exports.deleteBlog = async (req, res) => {
   try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }  

      if(blog.image?.public_id) {
         await cloudinary.uploader.destroy(blog.image.public_id);
      }
      await blog.deleteOne();
      return res.status(200).json({ message: 'Blog deleted successfully' });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Get All Blogs - User
exports.getAllBlogs = async (req, res) => {
   try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json({ blogs });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Like Unlike Blog - User

exports.toggleLike = async (req, res) => {
   try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }

      const userId = req.user.id;
      const isLiked = blog.likes.includes(userId);

      if (isLiked) {
         blog.likes.pull(userId); 
         blog.likesCount -= 1;
      } else {
         blog.likes.push(userId);
         blog.likesCount += 1;
      }

      await blog.save();
      return res.status(200).json({ message: isLiked ? 'Unliked' : 'Liked', likesCount: blog.likesCount});

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Share Blog - User
// exports.shareBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { shares: 1 } },
//       { new: true }
//     );

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.status(200).json({
//       message: "Blog shared",
//       shares: blog.shares,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

