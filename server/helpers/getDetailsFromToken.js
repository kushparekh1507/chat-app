const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function getDetailsFromToken(token) {
  try {
    if (!token) {
      return {
        message: "User not logged in",
        logOut: true
      }
    }

    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const user = await User.findById(decoded?._id).select("-password");
    return user;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY, { ignoreExpiration: true });
      const user = await User.findById(decoded._id).select("-password");
      return user;
    }
  }

}


module.exports = getDetailsFromToken