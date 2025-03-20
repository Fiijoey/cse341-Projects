const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      }
    });
};

const getSingle = (req, res) => {
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .insertOne(newContact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error creating contact");
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .replaceOne({ _id: userId }, newContact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error updating contact");
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error deleting contact");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
