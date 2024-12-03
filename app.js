var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});
const {MongoClient, ObjectId} = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017'; // MongoDB 접속 주소
const DB_NAME = 'paran'; // 사용할 데이터베이스 이름
const COLLECTION_NAME = 'users'; // 사용자 컬렉션 이름


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');

var app = express();

app.use(cors({
    origin: 'http://localhost:3001', // 허용할 도메인
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 HTTP 헤더
    credentials: true, // 쿠키 허용
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);

module.exports = app;
