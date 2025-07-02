// src/components/HeroSection.tsx
import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import ImageSlideshow from '../assets/slideshow/ImageSlideshow'; // Path confirmed

const HeroSection: React.FC = () => {
  return (
    // Removed 'relative' from the section, as the text won't be absolutely positioned over the slideshow anymore
    // Adjusted padding for overall section if needed
    <section className="bg-arova-beige-light text-arova-green-dark py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col items-center">
      {/* This div will contain the text content - positioned ABOVE the slideshow */}
      {/* Add mx-auto for horizontal centering, and adjust padding/margins as needed */}
      <div className="text-center z-10 p-4 max-w-4xl mx-auto mb-12 animate-fadeIn"> {/* Removed absolute positioning */}
        {/* Original text color restored (text-arova-green-dark) since it's on a beige background */}
        <p className="text-lg md:text-xl mb-3 font-semibold text-arova-green-dark">
          🌿 PREMIUM FRAGRANCE OILS
        </p>
        <h1 className="font-libre-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          <span className="font-bold">Arova</span> - <em className="italic font-normal">From Earth to Essence</em>
        </h1>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Crafted from the finest botanical ingredients and inspired by nature's purest rhythms, our fragrance oils are born from sustainable farms, refined through artisanal blending, and perfected through intentional curation. Each drop captures the luxurious essence of fine perfumery, designed to elevate your daily rituals and express your unique personality through scent.
        </p>
        <Button as={Link} to="/shop" variant="primary" size="md">
          Discover Our Blends
        </Button>
      </div>

      {/* This div will contain the slideshow - positioned BELOW the text */}
      {/* It also needs to be centered. Using max-w-screen-xl and mx-auto */}
      <div className="relative z-0 w-full overflow-hidden max-w-screen-4xl mx-auto" style={{ height: '900px' }}>
    <ImageSlideshow />
</div>
    </section>
  );
};

export default HeroSection;