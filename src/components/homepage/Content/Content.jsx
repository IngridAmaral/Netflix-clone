import React from 'react';
import './Content.css';

const Content = () => {
  const content = [
    {
      title: 'Enjoy on your TV.',
      text:
          'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
      imgUrl:
          'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png',
    },
    {
      title: 'Download your shows to watch on the go.',
      text: 'Save your data and watch all your favorites offline.',
      imgUrl:
          'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg',
    },
    {
      title: 'Watch everywhere.',
      text:
          'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.',
      imgUrl:
          'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png',
    },
  ];
  return (
    <div className="content_container">
      {content.map((cont, idx) => {
        if (idx % 2 === 0) {
          return (
            <div className="content_container_rigth">
              <div className="content_text">
                <h1>{cont.title}</h1>
                <h2>{cont.text}</h2>
              </div>
              <div className="content_image_container">
                <img src={cont.imgUrl} alt={cont.title} />
              </div>
            </div>
          );
        }
        return (
          <div className="content_container_left">
            <div className="content_image_container">
              <img src={cont.imgUrl} alt={cont.title} />
            </div>
            {' '}
            <div className="content_text">
              <h1>{cont.title}</h1>
              <h2>{cont.text}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
