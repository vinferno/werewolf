import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

import {PlayerModel} from "./schemas/player.schema.js";
import {GameModel} from "./schemas/game.schema.js";
import {CardModel} from "./schemas/card.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import { authHandler } from "./middleware/auth.middleware.js";


dotenv.config();

const saltRounds = 10;



const __dirname = path.resolve();

async function runner() {}

runner();

dotenv.config();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});




app.post("/api/create-user", function (req, res) {
  const { name, email, username, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new UserModel({
        name,
        username,
        email,
        password: hash,
      });
      user
        .save()
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.status(501);
          res.json({ errors: err });
        });
    });
  });
});

app.post("/api/login", function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
        console.log(user);
      
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({user}, access_secret)
          res.cookie('jwt', accessToken, {
              httpOnly: true,
              maxAge: 60 * 1000,
          })
          res.json({message: 'Successfully Logged In'})
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      return res.sendStatus(404);
    });
});

app.get("/api/users", authHandler, function (req: any, res) {
  UserModel.find({}, '-password')
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});




app.get('/api/logout', function(req, res){
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 0,
    })
    res.json({message: 'Successfully Logged Out'})
});

app.get('/api/check-login', authHandler, (req, res) => {
  res.json({message: 'yes'});
})







app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});



server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'work')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});