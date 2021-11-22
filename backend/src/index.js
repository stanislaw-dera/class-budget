import cookieParser from "cookie-parser";
import express from "express"

import getAllCollectionsByClass from "./db/collections/getAllCollectionsByClass.js"
import getAllUsersByClass from "./db/users/getAllUsersByClass.js"
import createUsers from "./db/users/createUsers.js"
import createColletion from "./db/collections/createCollection.js"

import { requireAuth } from "./middleware/authMiddleware.js";
import { getHash } from "./utils/hash.js";
import signIn, { signInWithRefreshToken } from "./utils/signIn.js";

import "dotenv/config"

const app = express()
app.use(cookieParser());
const port = 3000
app.use(express.json());

app.get('/api/users', requireAuth, async (req, res) => {
  const users = await getAllUsersByClass(req.decodedToken.classId)
  res.send(users)
})

app.post('/api/users', async (req, res) => {
  const {classId, users} = req.body

  if(typeof classId != 'number' || typeof users != 'object') {
    res.status(400).send("Invalid data");
    return 0;
  }

  createUsers(classId, users).then(() => {
    res.status(200).send()
  })
})

app.get('/api/sign-in', (req, res) => {
  const {email, password} = req.body;
  signIn(email, password, res)
})

app.get('/api/collections', async (req, res) => {
  const users = await getAllCollectionsByClass(req.body.classId)
  res.send(users)
})

app.post('/api/collection', async (req, res) => {

  const {classId, name, description, amount} = req.body

  if(typeof classId != 'number' || typeof name != 'string' || typeof description != 'string', typeof amount != 'number') {
    res.status(400).send("Invalid data");
    return 0;
  }

  createColletion(req.body).then(() => {
    res.status(200).send()
  })
})

app.get('/api/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  signInWithRefreshToken(refreshToken, res)
})

// TODO: Delete below
app.get('/hash', async (req, res) => {
  const a = await getHash(req.body.password)
  res.send(a)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
}) 