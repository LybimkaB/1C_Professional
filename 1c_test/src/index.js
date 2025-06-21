import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import Quiz from './components/questions/question';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/> } />
          <Route path="/mistakes"></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
          <Route path="quiz/:testId" element={<Quiz/>}></Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
