const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("Contacts").find();
  result.toArray().then((Contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(Contacts);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find({ _id: userId });
  result.toArray().then((Contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(Contacts[0]);
  });
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDate: req.body.birthdate,
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
    birthDate: req.body.birthdate,
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
    .remove({ _id: userId }, true);
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
