const express = require("express");
const router = express.Router();

const Board = require('../models/Board');
const User = require('../models/User');
const List = require('../models/List');
const Card = require('../models/Card');

//리스트 제목 수정
router.put("/:id", (req, res, next) => {
  const listId = req.params.id;
  const newtitle = req.body.listtitle;

  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("해당 리스트가 없습니다.");
      }
      return List.findByIdAndUpdate(
        listId,
        {
          listtitle: newtitle
        },
        { new: true }
      ).populate({
        path: "cards"
      });
    })
    .then(result => {
      res.json({
        message: "성공적으로 제목을 수정하였습니다.",
        data: result
      });
    });
});

//리스트 삭제
router.delete("/:id", (req, res, next) => {
  const listId = req.params.id;
  let deletedList;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("해당 리스트가 없습니다.");
      }
      return List.findByIdAndRemove(listId);
    })
    .then(result => {
      deletedList = result;

      return Board.collection.update(
        { },
        { $pull: {lists: { _id: deletedList._id } } },
        { multi: true }
      );
    })
    .then(result => {
      return result
    })
    .then(() => {
      res.json({
        message: "성공적으로 삭제하였습니다.",
        data: {
          deletedResource: deletedList
        }
      });
    })
    .catch(error => next(error));
});

//카드 추가
router.post("/:id/cards", (req, res, next) => {
  const { cardtitle, listId } = req.body;
  let newCard;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("해당 리스트가 없습니다.");
      }
      return Card.create({
        cardtitle: cardtitle,
        list: listId
      });
    })
    .then(result => {
      newCard = result;
      return List.findByIdAndUpdate(listId, {
        $addToSet: { cards: result._id }
      });
    })
    .then(() => Card.findById(newCard._id))
    .then(result => {
      res.json({
        message: "성공적으로 추가하였습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

module.exports = router;