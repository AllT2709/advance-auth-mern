const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const { verifyToken, getTokenfrom } = require("../helper/handlerToken");

exports.protectRoute = async (req, res, next) => {
  let token = getTokenfrom(req);
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route ", 401));
  }
};
