import jwt from "jsonwebtoken"
import "dotenv/config"

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send();
      } else {
        req.decodedToken = decodedToken
        next();
      }
    });
  } else {
    res.status(401).send();
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


export {requireAuth, checkUser}