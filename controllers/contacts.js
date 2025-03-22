const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const contactsResult = await mongodb
      .getDatabase()
      .db()
      .collection("Contacts")
      .find();
    contactsResult
      .toArray()
      .then((Contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(Contacts);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve contacts" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching contacts" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
  }

  const userId = new ObjectId(req.params.id);
  const contactResult = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find({ _id: userId });
  contactResult.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact[0]);
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
  }
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
