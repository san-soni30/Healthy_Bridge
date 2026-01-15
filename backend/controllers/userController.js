const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hashedPassword, role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Account is deactivated. Contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // role embedded in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // frontend will use this
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Profile
exports.getProfileById = async (req, res) => {
  try {
    const user = await User.findById((req.user.id)).select('-password');
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User Not Found or Inactive' });
    }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const user = await User.findById(req.user.id);

    if (!user || !user.isActive) {
      return res.status(404).json({ message: "User Not Found or Inactive" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin Profile cannot be updated" });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User Profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if(!user || !user.isActive){
      return res.status(404).json({message: 'User Not Found or Inactive'});
    }

    if(user.role === 'admin'){
      return res.status(403).json({message: 'Admin Account cannot be Removed'});
    }

    user.isActive = false;
    await user.save();
    // await User.findByIdAndUpdate(req.user.id, { isActive: false }, { new: true});
    return res.status(200).json({ message: 'User Removed Successfully' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}