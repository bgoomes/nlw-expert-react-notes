import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'

import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){
    const [sholdShowOnboarding, setSholdShowOnboarding] =  useState(true)
    const [isRecording, setIsReconsrding] = useState(false)
    const [ content, setContent] = useState('')

    function handleStartEditor(){
      setSholdShowOnboarding(false)
      setIsReconsrding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
      setContent(event.target.value)

      if(event.target.value === ''){
        setSholdShowOnboarding(true)
      }
    }

    function handleSaveNote(event: FormEvent){
      event.preventDefault()

      if(content === ''){
        return
      }
      onNoteCreated(content)
      setSholdShowOnboarding(true)

      toast.success('Nota criada com sucesso!')

    }

    function handleStartRecording(){
      const isSpeechRecognitionApiAvalible = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

      if(!isSpeechRecognitionApiAvalible){
        alert('Infelizmente seu navegador não suporta a API de gravação!')
        return
      }

      setIsReconsrding(true)
      setSholdShowOnboarding(false)

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition 

      const speechRecognition = new SpeechRecognitionAPI()

      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuou = true
      speechRecognition.maxlternative = 1
      speechRecognition.interinResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
            return text.concat(result[0].transcript)
        }, '')

        setContent(transcription)
      }

      speechRecognition.error = (event) => {
        console.error(event)
      }
      speechRecognition.start()
    }

    function handleStopRecording(){
      setIsReconsrding(false)
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
            <form className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-3 p-5'>
                <span className=' text-sm font-medium text-slate-200 '>
                Adiconar nota
                </span>
                {sholdShowOnboarding ? (
                  <p className=' text-sm leading-6 text-slate-400 '>
                      Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando</button> uma nota em áudio ou se preferir <button className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}>utilize apenas texto</button>
                  </p>
                ): (
                  <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange}/>
                )}
                
              </div>

                  {isRecording ?(
                    <button type='button' onClick={handleStopRecording} className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100'>
                      <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                      Gravando (Clique para iterromper)
                    </button>
                  ) : (
                    <button type='button' onClick={handleSaveNote} className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                      Salvar nota
                    </button>
                  )}
              
            </form>

            
          </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>
        
    )
}