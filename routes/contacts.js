const express = require("express");
const router = express.Router();

const usersController = require("../controllers/contacts");
const validation = require("../middleware/validate");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/", validation.saveContact, usersController.createContact);

router.put("/:id", validation.saveContact, usersController.updateContact);

router.delete("/:id", usersController.deleteContact);

module.exports = router;
