import React, { Suspense } from 'react';
import YoutubeAnalyzer from './components/YoutubeAnalyzer';
import { BrowserRouter, Routes, Route } from 'react-router';
import Details from './components/Details';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<YoutubeAnalyzer />} />
          <Route path="/details/:url" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
