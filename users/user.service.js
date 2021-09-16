const config = require("config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const User = db.User;
const LoggedUser = db.LoggedUser;

module.exports = {
  authenticate,
  getAll,
  getAllWithRole,
  getById,
  create,
  update,
  logout,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.hash)) {
    user.loggedin_Time = new Date();
    user.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("User Logged successfully");
      }
    });
    console.log("users object", user);
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    return {
      ...userWithoutHash,
      token,
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getAllWithRole(role) {
  console.log(
    "Role.Auditor.toLowerCase().includes(role.toLowerCase())",
    Role,
    " ",
    role.toLowerCase()
  );
  if (!(role && Role.Auditor.toLowerCase().includes(role.toLowerCase()))) {
    throw "Unauthorized";
  }

  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function logout(userParam) {
  console.log("id", userParam.username);
  //const user = await User.findById(userParam.id);
  const user = await User.findOne({ username: userParam.username });
  if (!user) throw "User not found";
  else {
    user.loggedout_Time = new Date();
    user.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("User Logged out successfully");
      }
    });
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
