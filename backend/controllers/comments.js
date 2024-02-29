const express = require('express')

const router = express.Router()


const db = require('../models')


/* Routes */

router.get('/:poisId', function (req, res) {
    db.Comment.find({ poisId: req.params.poisId })
        .then(comments => res.json(comments))
})


router.post('/', (req, res) => {
    db.Comment.create(req.body)
        .then(comment => res.json(comment))
})

router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedCommentId: req.params.id }))
})


module.exports = router