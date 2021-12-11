import { useEffect, useState } from "react"

function DrumMachine () {

  const drums = [
    {
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyTrigger: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyTrigger: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyTrigger: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

  const [ clickedDrum, setClickedDrum] = useState()

  const actionDrum = (e, currDrum) => {
    if(drums.some(drum => drum.keyTrigger === currDrum.keyTrigger)) {
      const audioEl = document.getElementById(currDrum.keyTrigger)
      console.log(audioEl);
      if(audioEl) {
        audioEl.currentTime = 0
        audioEl.play()
        setClickedDrum(currDrum.id)
      }
    }
  }

  useEffect(() => {
    document.body.classList.add('bg-orange-100')
    document.addEventListener('keyup', (e) => {
      const drumEl = document.getElementById(e.key.toUpperCase())
      drumEl.click()
      drumEl.parentElement.classList.add('active')
      setTimeout(() => {
        drumEl.parentElement.classList.remove('active')
      }, 150)
    })
    return () => {
      document.body.classList.remove('bg-orange-100')
    }
  }, [])  

  const drumClass = 'drum-pad bg-orange-400/90 rounded-lg hover:bg-orange-400 ring-orange-300 text-white text-3xl font-bold focus:outline-none active:bg-orange-500 active:ring-4 aspect-square'

  return (
    <div id="drum-machine" className="flex flex-col items-center justify-center gap-10 h-screen">
      <div className="grid grid-cols-3 grid-rows-3 w-96 gap-3">
       {drums.map(drum => {
          return (
            <button
            id={drum.id}
            key={drum.keyTrigger}
            className={drumClass}
            onClick={(e) => actionDrum(e, drum)}
          >
            <audio id={drum.keyTrigger} className="clip" src={drum.url} />
            {drum.keyTrigger}
          </button>
          ) 
        })}
      </div>
      <div id="display" className="bg-orange-500 h-10 w-32 grid place-items-center text-white font-semibold shadow-lg">{clickedDrum}</div>
    </div>
  )
}
export default DrumMachine