import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwttoken.js";
import User from "../models/User.js";

//Register a user
export const registerUser = catchAsyncErrors(async(req,res,next) => {

    const {name, email, password} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
    });

   sendToken(user,201,res);
});

//Login a user
export const loginUser = catchAsyncErrors(async(req,res,next) => {
    const { email, password } = req.body;

    //Checkin if user has given email and password both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and pasword", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

//Logout a user
export const logout = catchAsyncErrors(async(req,res,next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});
