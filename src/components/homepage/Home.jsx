import React from 'react';
import { Redirect } from 'react-router-dom';
import Trial from './Trial';
import Content from './Content/Content';
import Questions from './Questions/Questions';
import Footer from './Footer/Footer';

const Home = () => {
  const isActive = window.localStorage.getItem('activeUser');
  if (isActive !== null) {
    return <Redirect to="/browse" />;
  }

  return (
    <div className="app_container">
      <Trial />
      <Content />
      <Questions />
      <Footer />
    </div>
  );
};

export default Home;
