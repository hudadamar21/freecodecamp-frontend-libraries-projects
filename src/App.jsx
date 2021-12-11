import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import MarkdownPreviewer from './pages/MarkdownPreviewer'
import RandomQuotes from './pages/RandomQuotes'
import DrumMachine from './pages/DrumMachine'
import NotFound from './pages/NotFound'
import Calculator from "./pages/Calculator";

function App () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random-quotes" element={<RandomQuotes />} />
      <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
      <Route path="/drum-machine" element={<DrumMachine />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App