const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//route 1 : get all the notes using GET "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(" Internal some error occured");
  }
});
//route 2 : Add a new note using POST "/api/auth/addnotes" login required
router.post("/addnotes",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter at least 5 character description").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are error  , return bad requested and errors ;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({title,description,tag,user: req.user.id});
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(" Internal some error occured");
    }
  }
);
//route 3 : update a existing note using POST "/api/auth/updatenote" login required

router.put('/updatenote/:id' , fetchuser , async (req,res)=>{
const {title,description,tag} = req.body;
try {
  
  //create a new note
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
if(tag){newNote.tag= tag};
// find to be note for update

let note = await Notes.findById(req.params.id);
if(!note){ return res.status(404).send("Not found")}

if(note.user.toString() !== req.user.id ){
  return res.status(401).send("Not Allowed");
}

note  = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote}, {new:true})
res.json({note})

} catch (error) {
  console.error(error.message);
      res.status(500).send(" Internal some error occured");
}

})
//route 4 : Delete a existing note using Delete "/api/auth/deletenote" login required

router.delete('/deletenote/:id' , fetchuser , async (req,res)=>{
// find to be note for deleting
try {
  
  let note = await Notes.findById(req.params.id);
  if(!note){ return res.status(404).send("Not found")}
  // Allow the deletetion only user own this note
  if(note.user.toString() !== req.user.id ){
    return res.status(401).send("Not Allowed");
  }

  note  = await Notes.findByIdAndDelete(req.params.id )
  res.json({"Success" : "Note has been deleted" , note:note})

} catch (error) {
  console.error(error.message);
      res.status(500).send(" Internal some error occured");
}

})


module.exports = router;
