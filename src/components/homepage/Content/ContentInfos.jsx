import React from 'react';
import PropTypes from 'prop-types';

const ContentInfos = ({
  title, text, imgUrl, side,
}) => (
  <div
    className={`content_container_infos ${side}`}
  >
    <div className="content_text">
      <h1>{title}</h1>
      <h2>{text}</h2>
    </div>
    <div className="content_image_container">
      <img src={imgUrl} alt={title} />
    </div>
  </div>
);

ContentInfos.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
};

export default ContentInfos;
