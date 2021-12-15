import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import MarkdownPreviewer from './pages/MarkdownPreviewer'
import RandomQuotes from './pages/RandomQuotes'
import DrumMachine from './pages/DrumMachine'
import NotFound from './pages/NotFound'
import Calculator from "./pages/Calculator";
import Clock from "./pages/Clock";

function App () {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random-quotes" element={<RandomQuotes />} />
        <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
        <Route path="/drum-machine" element={<DrumMachine />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/25-plus-5-clock" element={<Clock />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <div className="fixed top-5 right-5">
        <a 
          className="block px-3 py-2 bg-black text-white font-bold shadow-lg"
          href="https://www.freecodecamp.org/fcc29caa7c9-320d-4c79-ad10-11b5c651f27b"
          target="_blank"
        >My Profile</a>
      </div>
    </section>
  )
}

export default App