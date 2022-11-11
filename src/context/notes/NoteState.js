import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
     const host = "http://localhost:5000"
    
    const notesInitial = [
      
      ]
      const [notes, setNotes] = useState(notesInitial)
     // get all notes
const getNote= async()=>{
  // Api call 
  const response = await fetch(`${host}/api/notes/fetchallnotes` ,{
   method : 'GET',
   headers :{
     'Content-Type' : 'application/json',
     "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MTc0ZWRhNGRlZmQwMzYzY2ExOGNjIn0sImlhdCI6MTY2NTIzNDE2M30.f51QMDqhatrDHLiihHVvqU-LOcTUbtkLsQ7vjWn9NyQ"
   }
  
   
 });
 const json = await response.json()
 console.log(json)
 setNotes(json)
}

     // add a note

    const addNote= async(title ,description ,tag)=>{
       // Api call 
       const response = await fetch(`${host}/api/notes/addnotes` ,{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json',
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MTc0ZWRhNGRlZmQwMzYzY2ExOGNjIn0sImlhdCI6MTY2NTIzNDE2M30.f51QMDqhatrDHLiihHVvqU-LOcTUbtkLsQ7vjWn9NyQ"
        },
        body : JSON.stringify({title ,description ,tag})
      })
      const json = await response.json()
      console.log(json)
      setNotes(json)
      
      

       const note ={
        "_id": "63428234319d3b6cb4eed8020",
        "user": "634174eda4defd0363ca18cc",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-10-09T08:11:32.180Z",
        "__v": 0
      }
      setNotes(notes.concat(note))

    }
     
     //delete a note
     
    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}` ,{
        method : 'DELETE',
        headers :{
          'Content-Type' : 'application/json',
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MTc0ZWRhNGRlZmQwMzYzY2ExOGNjIn0sImlhdCI6MTY2NTIzNDE2M30.f51QMDqhatrDHLiihHVvqU-LOcTUbtkLsQ7vjWn9NyQ"
        },
      })
      const json  = await response.json()
      console.log(json)


      console.log("deleting the note" , id)
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }
     // edit a note

     const editNote= async(id ,title ,description ,tag )=>{
      //Api call

      const response = await fetch(`${host}/api/notes/updatenote/${id}` ,{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json',
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MTc0ZWRhNGRlZmQwMzYzY2ExOGNjIn0sImlhdCI6MTY2NTIzNDE2M30.f51QMDqhatrDHLiihHVvqU-LOcTUbtkLsQ7vjWn9NyQ"
        },
        body : JSON.stringify({title ,description ,tag})
      })
      const json  =  response.json()
      // logic for edit the note
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
       
        if (element._id ===id) {
          element.title = title
          element.description = description
          element.tag = tag
        }
    }
    }
    return(
        <NoteContext.Provider value = {{notes ,setNotes , addNote , deleteNote , editNote ,getNote}} >
           {props.children}
        </NoteContext.Provider>

    );
}

export default NoteState;