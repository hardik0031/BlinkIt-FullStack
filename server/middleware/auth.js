import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "You have not login",
        error: true,
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    request.userId = decoded.id;
    next();
  } catch (error) {
    return response.status(500).json({
      message: "Unauthorized access",
      error: true,
      success: false,
    });
  }
};

export default auth;
