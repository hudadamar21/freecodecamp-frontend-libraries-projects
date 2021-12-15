import { Link } from 'react-router-dom'

function Home () {
  return (
    <section className='flex flex-col mt-32 items-center h-screen'>
      <a href='https://www.freecodecamp.org' className='text-2xl '>FreeCodeCamp</a>
      <h1 className='text-4xl font-bold '>
        Front End Development Libraries Projects
      </h1>
      <ul className='flex items-center justify-center gap-8 mt-10'>
        <MyLink to="/random-quotes">Random Quotes</MyLink>
        <MyLink to="/markdown-previewer">Markdown Previewer</MyLink>
        <MyLink to="/drum-machine">Drum Machine</MyLink>
        <MyLink to="/calculator">Calculator</MyLink>
        <MyLink to="/25-plus-5-clock">25 + 5 Clock</MyLink>
      </ul>
    </section>
  )
}

function MyLink({to, children}) {
  return (
    <Link className='bg-gray-200 px-6 py-3' to={to} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}

export default Home