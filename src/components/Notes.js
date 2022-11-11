import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote } = context;
  const [note, setNote] = useState({etitle : "" ,  edescription:"" , etag: ""})
  useEffect(() => {
    getNote();
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({etitle : currentNote.title , edescription:currentNote.description , etag : currentNote.tag})
  };
  const ref = useRef(null);
  const handleClick=(e)=>{
    console.log("Updating the note..." ,note)
    e.preventDefault()

  }
  const onChange =(e)=>{

      setNote({...note , [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel" ref={ref}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Added Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag " value={note.etag} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >
                update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        
        <h2 className=" my-3">Your note</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
