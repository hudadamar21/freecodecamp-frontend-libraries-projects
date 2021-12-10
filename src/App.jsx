import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import MarkdownPreviewer from './MarkdownPreviewer'
import RandomQuotes from './RandomQuotes'
import NotFound from './NotFound'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random-quotes" element={<RandomQuotes />} />
      <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App