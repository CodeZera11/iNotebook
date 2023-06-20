const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// Route-1: Fetch all notes of User using: GET '/api/notes/fetchallnotes'. Login Required
router.get('/fetchallnotes', fetchuser ,async(req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Error"})
    }
   
});

// Route-2: Adding a note using: POST '/api/notes/addnote'. Login Required
router.post('/addnote', fetchuser ,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Enter a valid description').isLength({min: 5})
] ,async(req,res)=>{

    try {
        // If errors then return bad request and return the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    let {title, description, tags} = req.body;

    const note = new Note({
        title, description, tags, user: req.user.id
    })

    const savednote = await note.save();

    res.json(savednote);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Error"})
    }

    
    

});

module.exports = router