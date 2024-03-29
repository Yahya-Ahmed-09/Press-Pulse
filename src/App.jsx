
import './App.css';
import Navigation from './Components/Navigation';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'

export default function App() {

  const [progress, setProgress] = useState(0)


    return (
      <>
      <Router>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        loaderSpeed={1000}
      />
      <Navigation />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={12} country="us" category="general" />} />
        <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={12} country="us" category="business" />} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={12} country="us" category="entertainment" />} />
        <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={12} country="us" category="health" />} />
        <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={12} country="us" category="science" />} />
        <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={12} country="us" category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={12} country="us" category="technology" />} />
      </Routes>
      </Router>
      </>
    )
  }

