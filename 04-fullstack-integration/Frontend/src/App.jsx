import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  
  const [notes, setnotes] = useState
  ([
    {
      title : "test title",
      description : "test description"
    },
    {
      title : "test title",
      description : "test description"
    },
    {
      title : "test title",
      description : "test description"
    },
    {
      title : "test title",
      description : "test description"
    },
  ])
  return (
    <>

    </>
  )
}

export default App
