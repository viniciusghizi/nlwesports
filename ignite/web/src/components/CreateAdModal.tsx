import {CaretDown, CaretUp, Check, GameController, MagnifyingGlassPlus} from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Input } from './form/Input';
import { FormEvent, useEffect, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import * as Select from '@radix-ui/react-select';

interface Game {
    id: string;
    title: string;
  }

export function CreateAdModal(){

    const [games,setGames] = useState<Game[]> ([]);
    const [weekDays, setWeekDays] = useState<string[]> ([]);
    const [useVoiceChannel,setVoiceChannel] = useState(false);

    useEffect(() => {
        axios('http://localhost:3333/games')  
        .then(response =>{
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent){
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)
        try{
            await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
                name:data.name,
                yearPlaying:Number(data.yearPlaying),
                discord:data.discord,
                weekDays:weekDays.map(Number),
                hourStart:data.hourStart,
                hourEnd:data.hourEnd,
                useVoiceChannel:useVoiceChannel
            })

            alert('Anúncio criado com Sucesso!')
        }catch (err){
            console.log(err)
            alert('Erro ao criar o anuncio')
        }

    }

    return(
        <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2 '>
              <label htmlFor="game">Qual o seu Game?</label>
              <Select.Root name="game">
                    <Select.Trigger  defaultValue=""  aria-label="Game" className="bg-zinc-900 inline-flex py-3 px-4 rounded text-sm  justify-between items-center">
                        <Select.Value placeholder="Selecione um game que deseja jogar"/>
                        <Select.Icon>
                            <CaretDown />
                        </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm text-white cursor-pointer">
                        <Select.Content>
                            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zinc-900 cursor-default">
                                <CaretUp/>
                            </Select.ScrollUpButton>
                            <Select.Viewport className="p-1">
                                {games.map(game=>{
                                    return(
                                    <Select.Group key={game.id}>
                                        <Select.Item value={game.id} className="flex relative items-center hover:bg-violet-500 rounded h-6 p-2">
                                            <Select.ItemText >{game.title}</Select.ItemText>
                                        </Select.Item>
                                    </Select.Group>
                                    )
                                })}
                            </Select.Viewport>
                            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-zinc-900 cursor-default">
                                <CaretDown/>
                            </Select.ScrollDownButton>
                        </Select.Content>
                    </Select.Portal>
                  </Select.Root>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome ou Nickname?</label>
              <Input
                name="name" 
                id="name" 
                placeholder="Como te chamam dentro do jogo?" 
              />
            </div>
            
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearPlaying" className='font-semibold'>Joga há quantos anos?</label>
                <Input
                  name="yearPlaying"     
                  id="yearPlaying"
                  type="number" 
                  placeholder="Tudo bem ser ZERO" 
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual o seu Discord?</label>
                <Input 
                  name="discord"
                  id="discord"
                  type="text" 
                  placeholder="Usuario#0000" 
                />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weeksDays">Quando costuma jogar?</label>

            
                <ToggleGroup.Root 
                    type='multiple' 
                    className='grid grid-cols-4 gap-2'
                    value={weekDays} 
                    onValueChange={setWeekDays}
                >
                    <ToggleGroup.Item 
                            value='0'
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-600' : ''}`}
                            title='Domingo'
                        >D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                            value='1' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-600' : ''}`}
                            title='Segunda'
                        >S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                            value='2' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-600' : ''}`}
                            title='Terça'
                        >T
                            </ToggleGroup.Item>
                    <ToggleGroup.Item
                            value='3' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-600' : ''}`}
                            title='Quarta'
                        >Q
                            </ToggleGroup.Item>
                    
                    <ToggleGroup.Item
                            value='4' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-600' : ''}`}
                            title='Quinta'
                        >Q
                            </ToggleGroup.Item>
                    
                    <ToggleGroup.Item
                            value='5' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-600' : ''}`}
                            title='Sexta'
                        >S
                            </ToggleGroup.Item>
                    
                    <ToggleGroup.Item
                            value='6' 
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-600' : ''}`}
                            title='Sabado'
                        >S
                    </ToggleGroup.Item>
            </ToggleGroup.Root>
            
              </div>
              <div  className= 'flex flex-col gap-1 flex-1 text-white'>
                <label htmlFor="hourStart">Qual o horário que costuma jogar?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input 
                    name='hourStart'
                    id="hourStart" 
                    type="time" 
                    placeholder="De"
                  />
                  <Input 
                    name='hourEnd'
                    id="hourEnd" 
                    type="time" 
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
            <label className='mt-2 flex gap-2 items-center text-sm cursor-pointer'>
              <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked)=> {
                    if(checked == true){
                        setVoiceChannel(true)
                    }else{
                        setVoiceChannel(false)
                    }
              }} className='w-6 p-1 h-6 rounded bg-zinc-900'>
                <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400' />
                </Checkbox.Indicator>    
              </Checkbox.Root>
              Costumo me conectar ao chat de voz. 
              </label>
            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close 
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar
              </Dialog.Close>
              <button 
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              type="submit">
                <GameController size={24}/> Encontrar duo
              </button>
            </footer>
          </form>
          </Dialog.Content>
      </Dialog.Portal>
    );

}