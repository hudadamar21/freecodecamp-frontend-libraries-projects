import { useState } from 'react'
import { marked } from 'marked'

marked.setOptions({
  breaks: true
})

const markdownDefault = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:
  console.log('hello world')
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  
`

function App() {
  const [input, setInput] = useState(markdownDefault)
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className='h-screen bg-gray-500 flex flex-col'>
        <h1 className='h-12 flex items-center justify-center font-bold text-2xl text-gray-100'>Editor</h1>
        <textarea 
          id='editor' 
          onInput={handleInput} 
          value={input} 
          className='flex-grow w-full bg-gray-900 text-white p-5 text-lg focus:outline-none decoration-none' 
          spellcheck="false" 
          placeholder='type markdown here..'
        >

        </textarea>
      </div>
      <div className='flex flex-col h-screen'>
        <h1 className='h-12 flex items-center justify-center font-bold text-2xl bg-gray-200'>Preview</h1>
        <div id='preview' className='prose-lg p-5 flex-grow break-all text-gray-700 overflow-auto' dangerouslySetInnerHTML={{ __html: marked.parse(input)}}>
      </div>
      
      </div>
    </div>
  )
}

export default App
