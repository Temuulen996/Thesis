const jwt = require("jsonwebtoken");

exports.tokenRefreshMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization header

  if (!token) {
    return next(); // Continue without refreshing the token if it's not provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Token is valid; check if it needs refreshing (e.g., if it expires in less than 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp - currentTime < 300) {
      // Less than 5 minutes to expiration, refresh the token
      const newToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 300, // Refreshed token expires in 5 minutes
        }
      );

      // Optionally send the new token back in the response headers
      res.setHeader("Authorization", `Bearer ${newToken}`);
    }
  } catch (error) {
    // Token expired or invalid; you can decide to either prompt for re-login or automatically issue a new token if the application requires
    return res.status(401).json({ message: "Token expired or invalid." });
  }

  next();
};
