import { useEffect, useMemo, useState } from "react";
import cals from "../data/calculator";

function Calculator () {
  const [ value, setValue ] = useState(0)
  const [ result, setResult ] = useState(0)
  const operatorRegex = /[x|\/|+|-]/
  const valueShow = useMemo(() => value.toString().replaceAll('*', 'x'), [value])
  
  const handleClick = (cal) => {
    
    // jika operator terakhir adalah minus, dan kedua terakhir juga adalah operator, maka tidak boleh lagi memilih operator, jika memilih kedua operator akan direplace degan operator yang diklik
    if(valueShow.at(-1) === '-' && operatorRegex.test(valueShow.at(-2)) && operatorRegex.test(cal.key)) {
      setValue(curr => {
        return curr.slice(0,-2)+cal.key
      })
      return
    }

    // jika value terakhir adalah operator, dan value yang diklik adalah operator minus (-)
    // maka minus bukan lagi menjadi operator pengurangan tetapi menjadi negatif
    if(operatorRegex.test(valueShow.at(-1)) && cal.key === '-') {
      setValue(curr => curr+cal.key)
      return
    }

    // jika value terakhir adalah operator dan value yang diklik ada operator juga
    // maka replace value terakhir dengan value yang diklik
    if(operatorRegex.test(cal.key) && operatorRegex.test(valueShow.at(-1))) {
      setValue(curr => curr.replace(/.$/,cal.key))
      return
    } 

    if(!value && operatorRegex.test(cal.key)) return 
      switch(cal.key) {
        case 'AC':
          setValue(0)
          setResult(0)
          break
        case 'DEL':
          setValue(curr => curr.toString().slice(0,-1))
          break
        case 'x':
          setValue(curr => curr + '*')
          break
        case '=': 
          // jika value nya ada dan value terakhir bukan operator
          if(value && !operatorRegex.test(value.at(-1))) {
            setResult(() => eval(value))
            setValue(curr => eval(curr))
          }
          break
        default:
          if(value[0] == 0 && cal.key == 0) break
          if(value[value.length - 1] == '.' && cal.key == '.') break
          if(cal.key === '.') {
            const onlyNumbers = value.split(operatorRegex)
            if(onlyNumbers.at(-1).includes('.')) return
          }
          setValue(curr => !curr ? cal.key : curr + cal.key)
      }
  } 

  useEffect(() => {
    const lastValue = valueShow.split(operatorRegex)
    const isOperator = valueShow[valueShow.length - 1]?.match(operatorRegex)
    
    setResult(() => isOperator 
      ? valueShow[valueShow.length - 1] 
      : lastValue[lastValue.length - 1]
    )
  }, [value])

  return (
    <div className="calculator flex items-center justify-center h-screen bg-gray-500">
      <div className="grid grid-cols-4 w-80 bg-gray-700 border-8 border-gray-700 gap-1">
        <div  className="col-span-4 h-28 bg-black text-white p-3">
          <div id="display" className="text-right mb-2 text-lg tracking-widest overflow-auto">
            {valueShow || 0}
          </div>
          <div className="text-right text-4xl tracking-wider overflow-auto">
            {result || 0}
          </div>
        </div>  
        {cals.map(cal => (
          <KeyCap 
            key={cal.id}
            onClick={() => handleClick(cal)} 
            id={cal.id} 
            className={`bg-gray-500 aspect-square ${cal?.addClass}`}
          >
            {cal.key}
          </KeyCap>
        ))}
      </div>
    </div>
  )
}

function KeyCap({className, id, onClick, children}) {
  return (
    <button id={id} onClick={onClick} className={`${className} text-2xl text-white hover:opacity-90 active:ring-4 ring-gray-800`}>
      {children}
    </button>
  )
}

export default Calculator