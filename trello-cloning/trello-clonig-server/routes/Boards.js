const express = require("express");
const router = express.Router();

const Board = require('../models/Board');
const User = require('../models/User');
const List = require('../models/List');

//보드 가져오기(안쪽으로 계속 들어가는 구조로)
router.get("/:id", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
      }
    })
    .then(board => {
      if (!board) {
        throw new Error("해당 보드가 없습니다.");
      }

      res.json({
        data: board
      });
    })
    .catch(error => next(error));
});


//보드 업데이트
router.put("/:id", (req, res, next) => {
  const boardId = req.params.id;
  let newTitle = req.body.boardtitle;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("해당 보드가 없습니다.");
      }

      return Board.findByIdAndUpdate(
        boardId,
        {
          boardtitle: newTitle
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: "성공적으로 제목을 바꿨습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

//보드에 리스트 추가
router.post("/:id/lists", (req, res, next) => {

  const { listtitle, boardId } = req.body;
  let newList;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("해당 보드가 없습니다.");
      }
      return List.create({
        listtitle: listtitle,
        cards: [],
        board: boardId
      });
    })
    .then(result => {
      newList = result;
      return Board.findByIdAndUpdate(boardId, {
        $addToSet: { lists: result.id }
      });
    })
    .then(() => {
      res.json({
        message: "성공적으로 리스트를 추가하였습니다.",
        data: newList
      });
    })
    .catch(error => next(error));
});

//리스트 가져오기
router.get("/:id/lists", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
      }
    })
    .then(board => {
      if (!board) {
        throw new Error("해당 보드가 없습니다.");
      }
      res.json({
        data: board.lists
      });
    })
    .catch(error => next(error));
});

//보드 삭제
router.delete("/:id", (req, res, next) => {
  const boardId = req.params.id;
  let deletedBoard;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("해당 보드가 없습니다.");
      }
      return Board.findByIdAndRemove(boardId);
    })
    .then(result => {
      deletedBoard = result;
      return User.update(
        { boards: { $in: [deletedBoard._id] } },
        {
          $pull: { boards: deletedBoard._id }
        },
        { multi: true }
      );
    })
    .then(() => {
      res.json({
        message: "성공적으로 보드를 삭제했습니다.",
        data: {
          deletedResource: deletedBoard
        }
      });
    })
    .catch(error => next(error));
});


module.exports = router;