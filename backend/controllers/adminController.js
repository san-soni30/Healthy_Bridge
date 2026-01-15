const User = require('../models/User');

// Get All Users
exports.getAllUsers = async (req, res) => {
   try {
      const users = await User.find().select('-password');
      return res.status(200).json(users);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Get User By ID
exports.getUserById = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select('-password');

      if (!user || !user.isActive) {
         return res.status(404).json({ message: 'User not Found or may be Inactive' });
      }

      return res.status(200).json(user);

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Update User Profile
exports.updateUser = async (req, res) => {
   try {
      // const updatedUser = await User.findByIdAndUpdate( req.params.id, updates, {new: true, runValidators: true}).select('-password');

      // if(!updatedUser || !updatedUser.isActive){
      //    return res.status(404).json({message: 'User not Found or may be Inactive'});
      // }

      const fields = ['name', 'email', 'role'];
      const updates = {};

      fields.forEach(field => {
         if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
         }
      });

      const user = await User.findById(req.params.id);
      if (!user || !user.isActive) {
         return res.status(404).json({ message: 'User not Found or may be Inactive' });
      }

      if (req.user.id === req.params.id && updates.role) {
         return res.status(403).json({
            message: 'Admin cannot change own role'
         });
      }
      Object.assign(user, updates);
      await user.save();
      return res.status(200).json({ success: true, message: 'User Updated Successfully'});

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Deactivate User
exports.deactivateUser = async (req, res) => {
   try {
      if (req.user.id === req.params.id) {
         return res.status(403).json({
            message: 'Admin cannot deactivate own account'
         });
      }

      const user = await User.findById(req.params.id);

      if (!user || !user.isActive) {
         return res.status(404).json({ message: 'User not Found or may be Inactive' });
      }

      user.isActive = false;
      await user.save();
      return res.status(200).json({ message: 'User Deactivated Successfully' });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

// Activate User
exports.activateUser = async (req, res) => {
   try{
      const user = await User.findById(req.params.id);

      if(!user){
         return res.status(404).json({message: 'User not found'});
      }
      if(user.isActive){
         return res.status(400).json({message: 'User is already active'});
      }

      user.isActive = true;
      await user.save();
      return res.status(200).json({message: 'User Activated Successfully'});

   } catch (error) {
      return res.status(500).json({ message: error.message});
   }
}
// Delete User 
exports.deleteUser = async (req, res) => {
   try {

      if (req.user.id === req.params.id) {
         return res.status(403).json({
            message: 'Admin cannot delete own account'
         });
      }
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
         return res.status(404).json({ message: 'User not Found' });
      }

      return res.status(200).json({ message: 'User Deleted Successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
