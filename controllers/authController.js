const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const { generateWebToken, verifyToken } = require("./../utils/tokenUtils");
const asyncHandler = require('./../utils/asyncHandler')
const CustomError = require('./../utils/CustomError');

const registerUser = asyncHandler(async (req, res,next) => {
  //check the data
  if (Object.keys(req.body).length === 0)  return next(new CustomError(400,'Missing required fields.'))

    //add the user
    const createdUser = await User.create(req.body);

    //generate a token and send it
    const token = generateWebToken(createdUser._id);

    //respond with a nice response
    res.status(201).json({ success:true,message:'User created successfully',data:{token, user_id: createdUser._id}});

})
const loginUser = asyncHandler(async (req, res, next) => {
  //get the credentials
  const { email, password } = req.body;
  if(!email || !password) return next(new CustomError(400,`Missing required fields: ${!email?'email':''} ${!password?'password':''}`))

    //find the user
    const user = await User.findOne({ email }).select(`+password`);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new CustomError(401,'Invalid email or password'))
 
    //generate web token
    const token = generateWebToken(user._id);

    //send the response
    res.status(200).json({ success:true,message:'Login successful',data:{token, user_id: user._id}});
}
)

const logoutUser = (req, res) => {
  res.status(204).send();
};

const changePassword = asyncHandler(async (req, res,next) => {

  // get the user Id and new data
  const _id = req.userId;
  const {oldPassword,newPassword} = req.body;
  if(!oldPassword||!newPassword) return next(new CustomError(400,"Old password and new password are required"));

  // check the user if it exists
  const user = await User.findById({ _id }).select(`+password`);
  if (!user) return next(new CustomError(404,'User not found'))

  // check the old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return next(new CustomError(400,'Incorrect old password'))

  // change the new password
  user.password = newPassword;
  const newUser = await user.save();

  // respond with success
  res.status(201).json({ message: "changed successfully", newUser });
})

const authorizedUserRoute = async (req, res, next) => {
  const id = req.params.id;
  if (id !== req.userId) {
    return next(new CustomError(401,"User is not authorized of this action"))
  }
  return next();
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  authorizedUserRoute,
};
