const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);

router.get("/audit", getAllWithRole);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/logout", logout);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  //console.log("req.body", req);
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => {
      if (err == "Unauthorized") {
        return res.status(401).json({ message: "Unauthorized" });
      }
    });
}

function getAll(req, res, next) {
  userService
    .getAll(req.body.role)
    .then((users) => res.json(users))
    .catch((err) => {
      console.log("err", err);
      next(err);
    });
}

function getAllWithRole(req, res, next) {
  //console.log("req.body.role", req.user.role);
  userService
    .getAllWithRole(req.user.role)
    .then((users) => res.json(users))
    .catch((err) => {
      console.log("err", err);
      next(err);
    });
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({ sucess }))
    .catch((err) => next(err));
}

function logout(req, res, next) {
  console.log("req.params.id", req.body);
  userService
    .logout(req.body)
    .then(() => res.json(true))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
