import React from 'react';

import Trial from './Trial';
import Content from './Content/Content';
import Questions from './Questions/Questions';
import Footer from './Footer/Footer';

const Home = () => (
  <div className="app_container">
    <Trial />
    <Content />
    <Questions />
    <Footer />
  </div>
);

export default Home;
