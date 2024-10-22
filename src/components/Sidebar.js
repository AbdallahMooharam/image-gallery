// Sidebar.js
import React from 'react';
import './styles/Sidebar.scss';

const Sidebar = ({ images, openLightbox }) => {
  return (
    <div className="sidebar">
      {images.map((image, index) => (
        <div key={index} className="sidebar-item" onClick={() => openLightbox(index)}>
          <img src={image} alt={`Image ${index + 1}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
