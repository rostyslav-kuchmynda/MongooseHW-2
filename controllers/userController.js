module.exports = { createUser, updateUser, showUser, deleteUser, showUserArticles };
const userModel = require('../models/userModel');
const articleModel = require('../models/articleModel');


async function createUser(req, res) {
  try {
    const query = userModel.create(req.body);
    const newUser = await query;
    return res.status(201).json({
      status: "Success",
      data: {
        newUser
      }
    })
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err
    })
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.userId;
    const body = req.body;

    const query = userModel.updateOne({ _id: id }, { $set: body });
    const user = await query;
    return res.status(200).json({
      status: "Success",
      data: user
    })
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err
    })
  }
}

async function showUser(req, res) {
  try {
    const id = req.params.userId;
    const userQuery = userModel.findById(id);
    const articlesQuery = articleModel.find({ owner: id });

    const user = await userQuery;
    const articles = await articlesQuery;
    return res.status(200).json({
      status: "Success",
      data: user, articles
    })
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err
    })
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.userId;
    await userModel.deleteOne({ _id: id });
    await articleModel.deleteMany({ owner: id });
    return res.status(200).json({
      status: "Success",
      message: "Deleted"
    })
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err
    })
  }
}

async function showUserArticles(req, res) {
  try {
    const query = await articleModel.find({ owner: req.params.userId }).populate('owner');

    const articles = await query;

    return res.status(200).json({
      status: "Success",
      data: {
        articles
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "Fail"

    })
  }
}