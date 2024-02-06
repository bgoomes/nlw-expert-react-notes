import Logo from './assets/Logo-nlw-expert.svg'


export function App() {
  return(
    <div className=' mx-auto max-w-6xl my-12'>
       <img src={Logo} alt="Logo nlw Expert" />

       <form className=' w-full'>
         <input type="text" placeholder='Busque suas notas...'  className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500'/>
       </form>
      
    </div>
   
  )
}


