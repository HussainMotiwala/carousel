import React, { useState } from 'react';
import './Carousel.css';

function Carousel() {
  // Function to generate image array
  const generateImages = () => {
    const imageArray = [];
    // Try to import all images from 1 to 7
    for (let i = 1; i <= 6; i++) {
      imageArray.push(`/images/product${i}.png`);
    }
    return imageArray;
  };

  const images = generateImages();
  const [activeIndex, setActiveIndex] = useState(2);

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? images.length - 1 : newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= images.length ? 0 : newIndex;
    });
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    const totalImages = images.length;
    
    const positions = [-2, -1, 0, 1, 2];
    
    positions.forEach(position => {
      let index = activeIndex + position;
      
      if (index < 0) index = totalImages + index;
      if (index >= totalImages) index = index - totalImages;
      
      visibleImages.push({
        image: images[index],
        index: index,
        position: position
      });
    });
    
    return visibleImages;
  };

  const getCardStyle = (position) => {
    // Exact scaling ratios remain the same
    const scales = {
      '-2': 0.64,
      '-1': 0.8,
      '0': 1.0,
      '1': 0.8,
      '2': 0.64
    };

    // Make X positions responsive
    const getBaseOffset = () => {
      const vw = window.innerWidth;
      if (vw < 500) {
        return vw * 0.225; // 12% of viewport width for very small screens
      } else if (vw >= 1800) {
        return vw * 0.3;      // Extra large screens
      } else if (vw >= 768) {
        return vw * 0.25; // Medium screens: 18% of viewport
      }
      return vw * 0.225;  // Small screens: 15% of viewport
    };

    const baseOffset = getBaseOffset();
    
    const xPositions = {
      '-2': -baseOffset/1,
      '-1': -baseOffset/1.75,
      '0': 0,
      '1': baseOffset/1.75,
      '2': baseOffset/1
    };

    // Rest remains the same
    const zIndexes = {
      '-2': 1,
      '-1': 3,
      '0': 5,
      '1': 3,
      '2': 1
    };

    const opacities = {
      '-2': 0.25,
      '-1': 0.5,
      '0': 1,
      '1': 0.5,
      '2': 0.25
    };

    return {
      transform: `
        translateX(${xPositions[position]}px)
        scale(${scales[position]})
        translateZ(${position === 0 ? 50 : position === -1 || position === 1 ? 25 : 0}px)
      `,
      zIndex: zIndexes[position],
      opacity: opacities[position]
    };
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-button prev" onClick={handlePrev}>‹</button>
      <div className="carousel-container">
        <div className="carousel">
          {getVisibleImages().map(({ image, index, position }) => (
            <div
              key={index}
              className={`carousel-card ${position === 0 ? 'active' : ''}`}
              style={getCardStyle(position)}
            >
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>›</button>
    </div>
  );
}

export default Carousel; 