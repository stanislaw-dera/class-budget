import jwt from "jsonwebtoken";
import saveRefreshToken from "../db/tokens/saveRefreshToken.js"
import getRandomString from "./getRandomString.js";

import "dotenv/config"

const {
  randomBytes
} = await import('crypto');

const maxAge = 30;
const refreshMaxAge = 60 * 24 * 60 * 60;

const createAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
    expiresIn: maxAge
  });
};

const createRefreshToken = async (userId) => {

  const tokenValue = getRandomString();

  
  const token = jwt.sign({token: tokenValue}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshMaxAge
  })
  
  await saveRefreshToken({
    userId: userId,
    token: tokenValue
  })

  return token
}

export {maxAge, refreshMaxAge, createAccessToken, createRefreshToken};