'use client';

import { useEffect, useState } from 'react';
import { images } from '@/utils/constants';
import classes from './image-slideshow.module.css';
import Image from 'next/image';

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          className={index === currentImageIndex ? classes.active : ''}
          src={image.image}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
