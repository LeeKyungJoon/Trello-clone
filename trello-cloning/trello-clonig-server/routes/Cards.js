const express = require("express");
const router = express.Router();

const User = require('../models/User')
const Board = require('../models/Board')
const List = require('../models/List')
const Card = require('../models/Card')
// 카드 가져오기
router.get("/:id", (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .populate("list")
    .then(card => {
      if (!card) {
        throw new Error("카드가 없습니다.");
      }

      res.json({
        message: "성공적으로 카드를 가져왔습니다.",
        data: card
      });
    })
    .catch(error => next(error));
});

//카드 내용 수정
router.put("/:id", (req, res, next) => {
  const cardId = req.params.id;
  const newtitle = req.body.cardtitle;

  Card.findById(cardId)
    .populate({
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error("해당 카드가 없습니다.");
      }
        return Card.findByIdAndUpdate(
        cardId,
        {
          cardtitle: newtitle
        },
        { new: true }
      )
    .then(result => {
      res.json({
        message: "성공적으로 수정하였습니다.",
        data: result
      });
    })
    .catch(error => next(error));
});

//카드 삭제
router.delete("/:id/card", (req, res, next) => {
  const cardId = req.params.id;
  let deletedCard;
  Card.findById(cardId)
    .populate("list")
    .then(card => {
      if (!card) {
        throw new Error("해당 카드가 없습니다.");
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then(result => {
      deletedCard = result;
      console.log('여기는?', deletedCard)
      return List.collection.update(
        { },
        { $pull: {cards: { _id: deletedCard._id } } },
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
          deletedResource: deletedCard
        }
      })
    })
    .catch(error => next(error));
});
})

module.exports = router;