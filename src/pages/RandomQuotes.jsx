import { useState, useEffect } from 'react'

const quotes = [
  {
    author: 'Nicolas Cage',
    text: 'Semua yang kita lakukan berdampak pada kehidupan orang lain'
  },
  {
    author: '-',
    text: 'Mereka yang berdiri setelah dihantam badai, tidak akan terusik oleh gerimis'
  },
  {
    author: 'Raplh Waldo Emerson',
    text: 'Write it on your heart that every day is the best day in the year.'
  },
  {
    author: '-',
    text: 'Not all stroms come to disrupt your life, some come to clear your path'
  },
  {
    author: 'Winston Churchill',
    text: 'Success is not final, Failure is not fatal, It is the courage to continue that counts'
  },
  {
    author: 'Earl Nightingale',
    text: 'Learn to enjoy every minute of your life, Be happy now'
  },
]

function RandomQuotes() {
  const [quote, setQuote] = useState({})
  
  useEffect(() => {
    getNewQuotes()
  }, [])

  const getNewQuotes = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  return (
    <div id='quote-box' className='h-screen grid place-items-center'>
      <div className='max-w-[600px] -mt-20'>
        <div className='mb-10 min-h-[250px] bg-white shadow-lg p-10 border-b-4 border-blue-400'>
          <h2 id='text' className='text-4xl font-bold mb-5 tracking-wide'>{quote?.text}</h2>
          <h3 id='author' className='text-sm text-right font-semibold'> - {quote?.author}</h3>
        </div>
        <div className='space-x-8'>
          <button id='new-quote' className='bg-blue-500 px-4 py-2 rounded shadow shadow-blue-500/20 text-white font-semibold' onClick={getNewQuotes} >get new qoute</button>
          <a href="https://twitter.com/intent/tweet" id='tweet-quote' className='decoration-blue-300 underline font-semibold text-blue-500' target="_blank">tweet this quote on twitter</a>
        </div>
      </div>
    </div>
  )
}

export default RandomQuotes
