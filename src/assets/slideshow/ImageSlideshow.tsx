// src/assets/slideshow/ImageSlideshow.tsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

// Assuming ImageSlideshow.css is also in src/assets/slideshow/
import './ImageSlideshow.css';

// CORRECTED: Images are in the same directory as ImageSlideshow.tsx
import slide1 from './image1.jpg';
import slide2 from './image2.jpg';
import slide3 from './image3.jpg';
import slide4 from './image4.jpg';
import slide5 from './image5.jpg';

// You can define an array of slide objects if you want more data per slide
const slides = [
  {
    image: slide1,
    alt: 'Aromatic oils and botanicals 1',
  },
  {
    image: slide2,
    alt: 'Aromatic oils and botanicals 2',
  },
  {
    image: slide3,
    alt: 'Aromatic oils and botanicals 3',
  },
  {
    image: slide4,
    alt: 'Aromatic oils and botanicals 4',
  },
  {
    image: slide5,
    alt: 'Aromatic oils and botanicals 5',
  }
];

const ImageSlideshow: React.FC = () => {
  return (
    <div className="slideshow-container"> {/* Add a container for styling */}
      <Carousel
        showArrows={true}        // Show navigation arrows
        showStatus={false}       // Hide current slide status (e.g., "1 of 3")
        showIndicators={true}    // Show dots at the bottom
        infiniteLoop={true}      // Loop back to the first slide after the last
        autoPlay={true}          // Auto-play the slideshow
        interval={3000}          // Change slide every 5 seconds (5000 ms)
        transitionTime={800}     // Time for the slide transition (800 ms)
        stopOnHover={true}       // Pause slideshow on mouse hover
        swipeable={true}         // Enable swipe gestures on touch devices
        emulateTouch={true}      // Emulate touch for desktop for smoother drag
        // renderIndicator={(onClickHandler, isSelected, index, label) => {
        //   // Optional: Customize indicators (dots)
        //   const defStyle = { marginLeft: 10, color: 'white', cursor: 'pointer' };
        //   const selectedStyle = { ...defStyle, color: 'green' };
        //   return (
        //     <li
        //       style={isSelected ? selectedStyle : defStyle}
        //       onClick={onClickHandler}
        //       value={index}
        //       key={index}
        //       role="button"
        //       tabIndex={0}
        //       aria-label={`${label} ${index + 1}`}
        //     >
        //       {/* You can put a dot or number here */}
        //     </li>
        //   );
        // }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide-content">
            <img src={slide.image} alt={slide.alt} />
            {slide.caption && <p className="legend">{slide.caption}</p>}
            {/* The 'legend' class is specific to react-responsive-carousel for captions */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlideshow;