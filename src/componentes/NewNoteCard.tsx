import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'

import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){
    const [sholdShowOnboarding, setSholdShowOnboarding] =  useState(true)
    const [ content, setContent] = useState('')

    function handleStartEditor(){
      setSholdShowOnboarding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
      setContent(event.target.value)

      if(event.target.value === ''){
        setSholdShowOnboarding(true)
      }
    }

    function handleSaveNote(event: FormEvent){
      event.preventDefault()
      onNoteCreated(content)
      setSholdShowOnboarding(true)

      toast.success('Nota criada com sucesso!')

    }


    return(
        <Dialog.Root>
          <Dialog.Trigger className=' rounded-md text-left flex flex-col gap-3 bg-slate-700 p-5 space-y-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
          <span className=' text-sm font-medium text-slate-200 '> Adiconar nota</span>
          <p className=' text-sm leading-6 text-slate-400 '>Grave um anota em áudio que sera convertida para texto automaticamente</p>
        </Dialog.Trigger >

        <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/50' />
          <Dialog.Content className='overflow-hidden fixed left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[648px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
            <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
              <X className='size-5'/>
            </Dialog.Close>
            <form onSubmit={handleSaveNote} className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-3 p-5'>
                <span className=' text-sm font-medium text-slate-200 '>
                Adiconar nota
                </span>
                {sholdShowOnboarding ? (
                  <p className=' text-sm leading-6 text-slate-400 '>
                      Comece <button className='font-medium text-lime-400 hover:underline'>gravando</button> uma nota em áudio ou se preferir <button className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}>utilize apenas texto</button>
                  </p>
                ): (
                  <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange}/>
                )}
                
              </div>

              <button type='submit' className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                Salvar nota
              </button>
            </form>

            
          </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>
        
    )
}