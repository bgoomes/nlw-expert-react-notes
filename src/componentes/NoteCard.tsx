export function NoteCard(){
    return(
        <button className=' text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative  outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 '>
          <span className=' text-sm font-medium text-slate-200 '> há 2 dias</span>
          <p className=' text-sm leading-6 text-slate-400 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta animi consequuntur ut dolorum neque optio totam amet saepe sed, labore, debitis sequi magni minus culpa fugit quos repellendus quia nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam blanditiis id eum praesentium ea optio? Mollitia quam similique repellendus ea. Cupiditate doloremque tempora sunt natus consectetur non eligendi nobis dignissimos.</p>

          <div className=' absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 ' />
        </button>
    )
}