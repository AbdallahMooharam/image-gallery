import React, { useState } from 'react';
import Lightbox from './Lightbox';
import './styles/Gallery.scss';

const images = [
  'https://www.nologygate.com/data/images/2021/06/Red-Dead-Redemption-2_18625.jpg',
  'https://www.cairo24.com/Upload/libfiles/79/4/943.jpg',
  'https://www.cairo24.com/Upload/libfiles/79/4/944.jpg',
  'https://tchnoo-home.com/wp-content/uploads/2020/03/Screenshot_2020-03-12-Call-of-Duty-on-Twitter-What-a-day-24-hours-in-and-over-6-million-of-you-have-dropped-into-Warzone-T....png',
  'https://www.samma3a.com/tech/ar/wp-content/uploads/sites/3/2022/01/1-2.jpg',
  'https://www.cairo24.com/Upload/libfiles/79/4/940.jpg',
  'https://www.cairo24.com/Upload/libfiles/79/4/952.jpg',
  'https://imgsms.com/wp-content/uploads/2019/06/FB_IMG_1561303094040.jpg',
];

const ImageGallery = ({ images, openLightbox }) => {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
          <img src={image} alt={`Image ${index + 1}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
    document.body.style.backgroundImage = `url(${images[index]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.backgroundImage = ''; // Reset background
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery">
      <ImageGallery images={images} openLightbox={openLightbox} />
      {isOpen && (
        <Lightbox
          image={images[currentImageIndex]}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default Gallery;
