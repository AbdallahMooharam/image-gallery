import React, { useEffect, useState, useRef } from 'react';
import { ThreeDots } from 'react-loader-spinner'; 
import './styles/Lightbox.scss';

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // Track visibility of Lightbox
  const imgRef = useRef(null);

  const nextRef = useRef(onNext);
  const prevRef = useRef(onPrev);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    setCurrentImage(image);
    setIsAnimating(true);
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [image]);

  useEffect(() => {
    nextRef.current = onNext;
    prevRef.current = onPrev;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAnimating(true);
        setIsVisible(false); // Hide Lightbox
        document.body.classList.add('fade-out'); // Add fade-out class

        const timeout = setTimeout(() => {
          onClose(); // Call onClose after the animation
          document.body.classList.remove('fade-out'); // Clean up
        }, 300); // Match the duration of your animation

        return () => clearTimeout(timeout);
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleNext = () => {
    nextRef.current();
  };

  const handlePrev = () => {
    prevRef.current();
  };

  return (
    <div className={`lightbox ${isVisible ? '' : 'hidden'}`} onClick={onClose}>
      <div className="lightbox-content">
        {isLoading ? (
          <ThreeDots 
            color="#fff" 
            height={100} 
            width={100} 
          />
        ) : (
          <img 
            ref={imgRef} 
            src={currentImage} 
            alt="Lightbox" 
            className={isAnimating ? 'zoomed' : 'show'}
            onLoad={() => setIsLoading(false)}
          />
        )}
        <button className="prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>❮</button>
        <button className="next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>❯</button>
      </div>
    </div>
  );
};

export default Lightbox;
