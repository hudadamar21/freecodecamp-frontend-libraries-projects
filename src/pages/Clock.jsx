// 25 + 5 Clock

import { useState, useEffect, useMemo, useRef } from "react"

function Clock() {

  const [breakLength, setBreakLength] = useState(1)
  const [sessionLength, setSessionLength] = useState(1)
  const [sessionTimer, setSessionTimer] = useState(sessionLength * 60)
  const [breakTimer, setBreakTimer] = useState(breakLength * 60)
  const [isTimerStop, setIsTimerStop] = useState(true)
  const [breakInterval, setBreakInterval ] = useState(null)
  const [sessionInterval, setSessionInterval ] = useState(null)
  const [isBreakTime, setIsBreakTime] = useState(false)
  const audioRef = useRef('')
  const timeLeftRef = useRef('')

  const sessionTimerFormat = useMemo(() => formatTime(sessionTimer))
  const breakTimerFormat = useMemo(() => formatTime(breakTimer))

  useEffect(() => {
    if(isTimerStop) return
    if(!isBreakTime) {
      setSessionInterval(setInterval(() => setSessionTimer(curr => curr - 1) , 10))
    } else {
      setBreakInterval(setInterval(() => setBreakTimer(curr => curr - 1) , 10))
    }
  }, [isTimerStop, isBreakTime])

  useEffect(() => {
    if(sessionTimer < 0) {
      setIsBreakTime(true)
      setSessionInterval(null)
      clearInterval(sessionInterval)
      audioRef.current.play()
      setTimeout(() => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }, 5000);
    }
  }, [sessionTimer])

  useEffect(() => setBreakTimer(() => breakLength * 60), [isBreakTime])

  useEffect(() => {
    if(breakTimer <= 0){
      clearInterval(breakInterval)
      setBreakInterval(null)
      setIsBreakTime(false)
      setSessionTimer(() => sessionLength * 60)
    }
  }, [breakTimer])

  

  const startStopTimer = () => {
    setIsTimerStop(curr => !curr)
    clearInterval(sessionInterval)
    clearInterval(breakInterval)
    setBreakInterval(null)
    setSessionInterval(null)
  }

  const resetTimer = () => {
    setSessionLength(25)
    setBreakLength(5)
    clearInterval(sessionInterval)
    clearInterval(breakInterval)
    setBreakInterval(null)
    setSessionInterval(null)
    setIsBreakTime(false)
    setIsTimerStop(true)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    console.log('reset time', sessionLength, breakLength);
    setSessionTimer(() => sessionLength * 60)
    setBreakTimer(() => breakLength * 60)
  }

  useEffect(() => {
    setSessionTimer(() => sessionLength * 60)
    console.log('session timer', sessionTimer);
  }, [sessionLength])
  useEffect(() => {
    setBreakTimer(() => breakLength * 60)
    console.log('break timer', breakTimer);
  }, [breakLength])

  function formatTime(time) {
    return `${num2digit(Math.floor(time / 60))}:${num2digit(time % 60)}`
  }

  function num2digit(num) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <h1 className="text-5xl font-bold ">25 + 5 Clock</h1>
      <div className="flex items-center gap-10 mb-5">

        <div className="flex flex-col items-center gap-3 bg-white py-6 px-8 shadow">
          <label id="break-label" className="text-3xl font-bold" title="Break time will run after sessoin time reach zero">Break Length</label>
          <Counter
            name="break"
            initial={breakLength}
            getVal={setBreakLength}
          />
        </div>

        <div className="flex flex-col items-center gap-3 bg-white py-6 px-8 shadow">
          <label id="session-label" className="text-3xl font-bold">Session Length</label>
          <Counter
            name="session"
            initial={sessionLength}
            getVal={setSessionLength}
          />
        </div>
      
      </div>
      <div className="flex flex-col items-center gap-5">
        <label id="timer-label" className="text-3xl font-bold">
          {sessionTimer <= 0 ? 'Break' : 'Session'}
        </label>
        <label id="time-left" ref={timeLeftRef} className={`
        font-bold text-5xl
        ${(sessionTimer >= 0 && sessionTimer < 60) || (breakTimer >= 0 && breakTimer < 60) ? 'text-red-500' : 'text-black'}
        `}>
          {sessionTimer < 0 ? breakTimerFormat : sessionTimerFormat }
        </label>
        <div className="mt-3">
          <button 
            id="start_stop" 
            className="text-2xl bg-green-500 px-5 py-1.5 text-white font-semibold" 
            onClick={startStopTimer} 
          >
            {isTimerStop ? 'start' : 'stop'}
          </button>
          <button 
            id="reset" 
            className="text-2xl bg-red-500 px-5 py-1.5 text-white font-semibold" 
            onClick={resetTimer}
          >
            reset
          </button>
        </div>
      </div>
      
      <TimeoutAudio audioRef={audioRef}/>
    </div>
  )
}

export default Clock

function Counter({name, initial, getVal}) {
  const [counter, setCounter] = useState(initial)

  useEffect(() => {
    setCounter(initial)
  }, [initial])

  const decrementCounter = () => counter > 1 && setCounter(curr => curr -= 1)
  const incrementCounter = () => counter < 60 && setCounter(curr => curr += 1)

  useEffect(() => getVal(counter), [counter])

  const btnClass = 'bg-blue-500 active:bg-blue-700 text-white px-3 py-1 rounded font-bold'

  return(
    <div className="flex items-center gap-5 mt-2">
      <button 
        id={`${name}-decrement`} 
        onClick={decrementCounter}
        className={btnClass}
      >
        -
      </button>
      <div id={`${name}-length`} className="text-xl font-bold">
        {counter}
      </div>
      <button 
        id={`${name}-increment`} 
        onClick={incrementCounter}
        className={btnClass}
      > 
        +
      </button>
    </div>
    
  )
}

function TimeoutAudio({audioRef}) {
  return (
    <audio
      id="beep"
      preload="auto"
      ref={audioRef}
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
  )
}