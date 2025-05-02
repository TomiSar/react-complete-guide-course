import React from 'react';
import componentsImage from '../assets/components.png';

export default function CoreConcept({ image, title, description }) {
  return (
    <li>
      <img src={image ?? componentsImage} alt='...' />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
