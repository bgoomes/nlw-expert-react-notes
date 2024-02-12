import { ChangeEvent, useState } from 'react'
import Logo from './assets/Logo-nlw-expert.svg'
import { NewNoteCard } from './componentes/NewNoteCard'
import { NoteCard } from './componentes/NoteCard'

interface Note{
  id: string,
  date: Date,
  content: string,
}


export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const noteOnStorege = localStorage.getItem('@nlwExpert')

    if(noteOnStorege){
      return JSON.parse(noteOnStorege)
    }
    
    return []
  })

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const noteArray = [newNote, ...notes]
    setNotes(noteArray)
    localStorage.setItem('@nlwExpert', JSON.stringify(noteArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }

  const filterSearch = search != '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return(
    <div className=' mx-auto max-w-6xl my-12 space-y-6'>
       <img src={Logo} alt="Logo nlw Expert" />

       <form className=' w-full'>
         <input type="text" placeholder='Busque suas notas...' onChange={handleSearch}  className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'/>
       </form>

       <div className=' h-px  bg-slate-700' />

       <div className=' grid grid-cols-3 gap-6 auto-rows-[250px] '>
        <NewNoteCard onNoteCreated={onNoteCreated}/>

        {filterSearch.map(note => { 
          return <NoteCard key={note.id} note={note}/>
        })}
      </div> 
   </div> 
  )
}


