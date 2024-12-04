var express = require('express');
const mongoose = require('mongoose');
// MongoDB URI
const uri = 'mongodb://localhost:27017/myDatabase';
var router = express.Router();
const User = require('../models/User'); // User 모델 불러오기
const {MongoClient, ObjectId} = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017'; // MongoDB 접속 주소
const DB_NAME = 'paran'; // 사용할 데이터베이스 이름
const COLLECTION_NAME = 'member'; // 사용자 컬렉션 이름
const client = new MongoClient(MONGO_URL);
const db = client.db(DB_NAME);
const collection = db.collection(COLLECTION_NAME);

mongoose.connect(uri, {
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// 연결 상태 확인
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
      const member = await collection.find().toArray();
      if (member) {
          res.json({
              code: 200,
              user: member
          });
      } else {
          res.status(404).json({
              code: 404,
              message: 'User not found'
          });
      }
  } catch (err) {
      next(err); // 에러 처리 미들웨어로 전달
  }
});

/* POST users. */
router.post('/', async function(req, res, next) {
  try {

      const result = await db.collection('member').insertOne({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      })
    //   let newUser = new User({
    //       name: req.body.name,
    //       email: req.body.email,
    //       age: req.body.age
    //   });
      if(result.insertedCount > 0){
        console.info('Document inserted successfully');
      }
    //   const user = await newUser.save() // MongoDB에 새 사용자 저장
    //   res.json({
    //       code: 201,
    //       message: 'User created successfully',
    //       user: user
    //   });
  } catch (err) {
      next(err);
  }
});

/* DELETE user. */
router.delete('/:name', async function(req, res, next) {
  try {
      let userName = req.params.userName;
      let result = await db.collection('member').deleteOne();

      if (result) {
          res.json({
              code: 200,
              message: 'User deleted successfully',
              user: result
          });
      } else {
          res.status(404).json({
              code: 404,
              message: 'User not found'
          });
      }
  } catch (err) {
      next(err);
  }
});

module.exports = router;
