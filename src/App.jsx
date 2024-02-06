// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Article from './Article';
// import UserProfile from './UserProfile';

const NewsApp = () => {
  return (
    <>
    <h1>News</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<Article />} />
        {/* <Route exact path="/users" component={UserProfile} /> */}
      </Routes>
    </>
  );
};

export default NewsApp;
