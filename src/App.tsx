import Logo from './assets/Logo-nlw-expert.svg'
import { NewNoteCard } from './componentes/NewNoteCard'
import { NoteCard } from './componentes/NoteCard'


export function App() {
  return(
    <div className=' mx-auto max-w-6xl my-12 space-y-6'>
       <img src={Logo} alt="Logo nlw Expert" />

       <form className=' w-full'>
         <input type="text" placeholder='Busque suas notas...'  className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'/>
       </form>

       <div className=' h-px  bg-slate-700' />

       <div className=' grid grid-cols-3 gap-6 auto-rows-[250px] '>
        <NewNoteCard />

        <NoteCard />
        <NoteCard />
        
      </div> 
   </div> 
  )
}


