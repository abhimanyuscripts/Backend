import { useState , useEffect } from 'react'
import axios from "axios" 
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


function App() {
  const [notes, setnotes] = useState([])

  useEffect(()=>{
    fetchNotes()
  },[])
  
  function fetchNotes(){
  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setnotes(res.data.notes)
  })
  }


 function handleSubmit(e){
  e.preventDefault()
   const {title , description} = e.target.elements

   console.log(title.value,description.value)

   axios.post("http://localhost:3000/api/notes",{
    title : title.value,
    description : description.value
   })
   .then(res=>{
    console.log(res.data)
    fetchNotes()
   })
 }

 function handleDeleteNote(id){
  axios.delete("http://localhost:3000/api/notes/"+id)
  .then(res=>{
     console.log(res.data)
     fetchNotes()
  })

 }
 
 function handleUpdateNote(id,description){
  console.log(id,description)
  const newDescription = prompt(
    "Enter new description",
    description
  )
  axios.patch("http://localhost:3000/api/notes/"+id,{
    description : newDescription
  })
  .then(res=>{
    fetchNotes()
  })
 }
  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name = "title" type="text" placeholder='Input Title' />
      <input name = "description" type="text" placeholder='Input Description'/>
      <button> Create Note </button>
    </form>


      <div className="notes">
        {notes.map(note=>{
          return <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <div className="button-container">
            <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
            <button onClick={()=>{handleUpdateNote(note._id,note.description)}}>Update</button>
          </div>
        </div>
        })
      }
      </div>
    </>
  )
}

export default App
