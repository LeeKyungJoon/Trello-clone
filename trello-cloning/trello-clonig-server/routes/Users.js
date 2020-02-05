const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const User = require("../models/User");
const Board = require("../models/Board")
users.use(cors());

process.env.SECRET_KEY = 'secret';

// 회원가입
users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})

//로그인
users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }else {
                res.json({ error: "User does not exist" })
            }
        }else {
            res.json({ error: "User does not exist" })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

//이름 변경
users.put("/:id/name", (req, res, next) => {
  let userId = req.body._id;
  let newTitle = req.body.name;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new Error("해당 유저가 없습니다.");
      }

      return User.findByIdAndUpdate(
        userId,
        {
          name: newTitle
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: "성공적으로 이름을 바꿨습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

//비밀번호 변경
users.put("/:id/password", (req, res, next) => {
  let passwordId = req.body._id;
  let newPassword = req.body.password;

  User.findById(passwordId)
    .then(user => {
      if (!user) {
        throw new Error("해당 보드가 없습니다.");
      }

        return User.findByIdAndUpdate(
                  passwordId,
                  {
                    password: bcrypt.hashSync(newPassword, 10, (err, hash) => {
                        return hash
                    })
                  },
                  { new: true }
                );
    })
    .then(result => {
      res.json({
        message: "성공적으로 비밀번호를 바꿨습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

//회원탈퇴
users.delete("/:id/delete", (req, res, next) => {
  let deleteId = req.params.id;

  User.findById(deleteId)
    .then(user => {
      if (!user) {
        throw new Error("해당 유저가 없습니다.");
      }
      return User.findByIdAndRemove(deleteId);
    })
    .then(result => {
      res.json({
        message: "성공적으로 탈퇴하였습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

//내정보(이름, 이메일)
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process, env.SECRET_KEY)

    user.findOne({
        _id: decoded._id
    })
    .then(user => {
        if(user) {
            res.json(user)
        }else {
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

//유저 가져오기
users.get("/:id", (req, res) => {
  User.findById(req.params.id)
  .populate({
      path: "boards",
      populate: {
        path: "lists",
        populate: {
          path: "cards"
        }
      }
    })
    .then(user => {
      if (!user) {
        throw new Error("해당 유저가 없습니다.");
      }

      res.json({ data: user });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

//모든 유저 가져오기(board에서 users에 추가하기위한??)
users.get("/", (req, res, next) => {
  User.find({})
    .then(users => {
      res.json({ data: users });
    })
    .catch(error => {
      next(error);
    });
});

//유저의 보드 가져오기
users.get("/:id/boards", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "boards",
      populate: {
        path: "lists",
        populate: {
          path: "cards"
        }
      }
    })
    .then(user => {
      res.json({ data: user.boards });
    })
    .catch(error => next(error));
});

//보드 만들기
users.post("/:id/boards", (req, res, next) => {
  const { boardtitle, userId } = req.body;
  // let userId = req.params.id;
  let board;
  Board.create({
    boardtitle,
    lists: [],
  })
    .then(result => {
      board = result;
      return User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { boards: board }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        status: '성공적으로 보드가 추가되었습니다.',
        data: board
      });
    })
    .catch(error => next(error));
});



module.exports = users