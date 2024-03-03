const express = require('express')

const router = express.Router()

const jwt = require('jwt-simple');

const db = require('../models')

const config = require('../../jwt.config.js')


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};
/* Routes */

router.get('/:poisId', function (req, res) {
    db.Comment.find({ poisId: req.params.poisId })
        .then(comments => res.json(comments))
})


router.post('/', authMiddleware, (req, res) => {
    db.Comment.create({
        ...req.body,
        userId: req.user.id
    })
        .then(comment => res.json(comment))
})


router.put('/:id', authMiddleware, async (req, res) => {
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id) {
        const newComment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newComment)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})


router.delete('/:id', authMiddleware, async (req, res) => {
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id) {
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id)
        res.send('You deleted comment ' + deletedComment._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})



module.exports = router