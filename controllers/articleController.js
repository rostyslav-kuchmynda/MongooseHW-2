module.exports = { addArticle, showArticles, updateArticle, deleteArticle };
const articleModel = require('../models/articleModel');
const userModel = require('../models/userModel');


async function addArticle(req, res) {
    try {
        const query = articleModel.create(req.body);
        const article = await query;
        const owner = await userModel.findById(article.owner)
        if (owner) {
            await userModel.updateOne({ _id: article.owner }, { $inc: { "numberOfArticles": 1 } })
            return res.status(201).json({
                status: "Success",
                data: {
                    article
                }
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

async function updateArticle(req, res) {
    try {
        const id = req.params.articleId;
        const body = req.body;

        const userQuery = userModel.findOne({ _id: id });
        const articleQuery = articleModel.findOne({ _id: id });

        const user = await userQuery;
        const article = await articleQuery;

        if (user || article) {
            const updatedArticle = await articleModel.updateOne({ _id: id }, { $set: body });
            res.status(200).json({
                status: "Success",
                result: updatedArticle,
                article
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

async function showArticles(req, res) {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        const query = articleModel.find(queryObj).populate('owner');

        const articles = await query;

        return res.status(200).json({
            status: "Success",
            results: articles.length,
            articles
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}
async function deleteArticle(req, res) {
    try {
        const id = req.params.articleId;
        const article = await articleModel.findById(id);

        await userModel.updateOne({ _id: article.owner }, { $inc: { "numberOfArticles": -1 } })
        await articleModel.deleteOne({ _id: id });
        return res.status(200).json({
            status: "Success",
            message: "Item was removed from the database"
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}