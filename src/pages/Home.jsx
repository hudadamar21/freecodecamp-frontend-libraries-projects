import { Link } from 'react-router-dom'

function Home () {
  return (
    <section className='flex flex-col mt-32 items-center h-screen'>
      <a href='https://www.freecodecamp.org' className='text-2xl '>FreeCodeCamp</a>
      <h1 className='text-4xl font-bold '>
        Front End Development Libraries Projects
      </h1>
      <ul className='flex items-center justify-center gap-8 mt-10'>
        <Link className='bg-gray-200 px-6 py-3' to="/random-quotes" target="_blank" rel="noopener noreferrer">Random Quotes</Link>
        <Link className='bg-gray-200 px-6 py-3' to="/markdown-previewer" target="_blank" rel="noopener noreferrer">Markdown Previewer</Link>
        <Link className='bg-gray-200 px-6 py-3' to="/drum-machine" target="_blank" rel="noopener noreferrer">Drum Machine</Link>
        <Link className='bg-gray-200 px-6 py-3' to="/calculator" target="_blank" rel="noopener noreferrer">Calculator</Link>
      </ul>
    </section>
  )
}

export default Home