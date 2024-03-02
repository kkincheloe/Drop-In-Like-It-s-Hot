const express = require('express')

const router = express.Router()

const jwt = require('jwt-simple');

const db = require('../models')

const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};
/* Routes */

router.get('/:poisId', function (req, res) {
    db.Comment.find({ poisId: req.params.poisId })
        .then(comments => res.json(comments))
})


router.post('/', authMiddleware, (req, res) => {
    // Perform any actions that require authorization
    db.Comment.create({
        ...req.body,
        // The auth middleware validated the JWT token 
        // and added the decoded payload to the req.user object
        userId: req.user.id
    })
        .then(comment => res.json(comment))
})


router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id) {
        // If it is the original author, update the comment
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
    // Check if the user who sent the delete request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id) {
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id)
        res.send('You deleted comment ' + deletedComment._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})



module.exports = router