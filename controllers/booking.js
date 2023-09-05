const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  User.destroy({ where: { id: req.body.id } })
    .then(() => {})
    .catch((err) => console.log(err));
};

// exports.postEditUser = (req, res, next) => {
//   User.destroy({ where: { id: req.body.id } })
//     .then(() => {})
//     .catch((err) => console.log(err));
// };

exports.addBooking = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const date = req.body.date;
  const time = req.body.time;
  await User.create({
    name: name,
    email: email,
    number: number,
    date: date,
    time: time,
  })
    .then((user) => {
      res.json(user.id);
    })
    .catch((err) => console.log(err));
};