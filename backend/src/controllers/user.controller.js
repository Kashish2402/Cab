import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generate access token and refresh token..."
    );
  }
};

const signup = asyncHandler(async (req, res, next) => {
  const { fullName, username, email, age, password } = req.body;

  console.log("Signup Called")

  if (!(fullName && username && email && age && password)) {
    return next(
      new ApiError(400, "Fullname, username, email,password, age required")
    );
  }

  const checkUser = await User.findOne({ $or: [{ username }, { email }] });

  if (checkUser) return next(new ApiError(400, "User Account already exists"));

  const createUser = await User.create({
    fullName,
    username,
    email,
    age,
    password,
  });

  if (!createUser)
    return next(new ApiError(500, "Failed to create user account"));

  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User Account created successfully!!"
      )
    );
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username && !password)
    return next(new ApiError(400, "Username and password are required"));

  const user = await User.findOne({ username });

  if (!user) return next(new ApiError(400, "User doesn't Exist"));

  const checkPassword = await user.validatePassword(password);

  if (!checkPassword) return next(new ApiError(400, "Wrong Password !!"));

  const loggedInUser = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully!!"
      )
    );
});

const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully..."));
});

const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!(oldPassword && newPassword && confirmNewPassword))
    return next(new ApiError(400, "Please fill all fields!!"));

  const user = await User.findById(req.user?._id);

  const checkPassword = await user.validatePassword(oldPassword);

  if (!checkPassword)
    return next(new ApiError(400, "Please Enter corrrect password"));

  if (newPassword !== confirmNewPassword)
    return next(
      new ApiError(400, "new Password and confirm password does not match!!")
    );

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      password: newPassword,
    },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Password changed Successfully...")
    );
});

const changeUserDetails = asyncHandler(async (req, res, next) => {
  const { fullName, age } = req.body;

  const user = await User.findById(req.user?._id);

  if (fullName) user.fullName = fullName;
  if (age) user.age = age;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated Successfully!!"));
});

const updateAvatar = asyncHandler(async (req, res, next) => {
  const { avatar } = req.file.path;

  const avatarURL = await uploadOnCloudinary(avatar);

  if (!avatarURL)
    return next(
      new ApiError(
        400,
        "Something went wrong while uploading avatar on server!!!"
      )
    );

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      avatar: avatarURL,
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) return next(new ApiError(400, "Unable to update User!!!"));

  res
    .status(200)
    .json(
      new ApiResponse(200, updateAvatar, "User Avatar Updated Successfully...")
    );
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Fetched Successfully!! "));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  let incomingRefreshToken =
    req.cookies.accessToken || req.body.refreshAccessToken;

  if (!incomingRefreshToken)
    return next(new ApiError(400, "UNAUTHORISED REQUEST!!"));

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN
    );
    if (!decodedToken) return next(new ApiError(400, "Unauthorised TOKEN"));

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return next(new ApiError(401, "INVALID REFRESH TOKEN "));
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return next(new ApiError(401, "Refresh Token is expired or used"));
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user?._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, user, "Access Token Refreshed successfully!!")
      );
  } catch (error) {
    return next(new ApiError(401, error?.message || "INVALID REFRESH TOKEN"));
  }
});

export {
  signup,
  login,
  logout,
  changePassword,
  changeUserDetails,
  updateAvatar,
  getCurrentUser,
  refreshAccessToken,
};
