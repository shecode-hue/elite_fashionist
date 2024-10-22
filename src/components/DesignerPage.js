import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DesignerPage.css';
import Pattern1 from '../../src/assets/patterns/pattern1.jpg';
import Pattern2 from '../../src/assets/patterns/pattern2.jpg';
import Pattern3 from '../../src/assets/patterns/pattern3.jpg';
import Pattern4 from '../../src/assets/patterns/pattern4.jpg';
import Pattern5 from '../../src/assets/patterns/pattern5.jpg';
import Pattern6 from '../../src/assets/patterns/pattern6.jpg';
import Pattern7 from '../../src/assets/patterns/pattern7.jpg';
import Pattern8 from '../../src/assets/patterns/pattern8.jpg';
import Pattern9 from '../../src/assets/patterns/pattern9.jpg';
import Pattern10 from '../../src/assets/patterns/pattern10.jpg';
import Pattern11 from '../../src/assets/patterns/pattern11.jpg';
import Pattern12 from '../../src/assets/patterns/pattern12.jpg';
import Pattern13 from '../../src/assets/patterns/pattern13.jpg';
import Pattern14 from '../../src/assets/patterns/pattern14.jpg';
import Pattern15 from '../../src/assets/patterns/pattern15.jpg';
import Pattern16 from '../../src/assets/patterns/pattern16.jpg';
import Pattern17 from '../../src/assets/patterns/pattern17.jpg';
import Pattern18 from '../../src/assets/patterns/pattern18.jpg';
import Pattern19 from '../../src/assets/patterns/pattern19.jpg';
import Pattern20 from '../../src/assets/patterns/pattern20.jpg';
import Design1 from '../../src/assets/designs/design1.png';
import Design2 from '../../src/assets/designs/design2.png';
import Design3 from '../../src/assets/designs/design3.png';
import Design4 from '../../src/assets/designs/design4.png';
import Design1b from '../../src/assets/designs/design1back.png';
import Design2b from '../../src/assets/designs/design2back.png';
import Design3b from '../../src/assets/designs/design3back.png';
import Design4b from '../../src/assets/designs/design4back.png';

const designs = [
  {
    id: 'design1',
    front: Design1,
    back: Design1b,
  },
  {
    id: 'design2',
    front: Design2,
    back: Design2b,
  },
  {
    id: 'design3',
    front: Design3,
    back: Design3b,
  },
  {
    id: 'design4',
    front: Design4,
    back: Design4b,
  },
];

const patterns = [
  { id: 'pattern1', image: Pattern1 },
  { id: 'pattern2', image: Pattern2 },
  { id: 'pattern3', image: Pattern3 },
  { id: 'pattern4', image: Pattern4 },
  { id: 'pattern5', image: Pattern5 },
  { id: 'pattern6', image: Pattern6 },
  { id: 'pattern7', image: Pattern7 },
  { id: 'pattern8', image: Pattern8 },
  { id: 'pattern9', image: Pattern9 },
  { id: 'pattern10', image: Pattern10 },
  { id: 'pattern11', image: Pattern11 },
  { id: 'pattern12', image: Pattern12 },
  { id: 'pattern13', image: Pattern13 },
  { id: 'pattern14', image: Pattern14 },
  { id: 'pattern15', image: Pattern15 },
  { id: 'pattern16', image: Pattern16 },
  { id: 'pattern17', image: Pattern17 },
  { id: 'pattern18', image: Pattern18 },
  { id: 'pattern19', image: Pattern19 },
  { id: 'pattern20', image: Pattern20 },
];

function DesignerPage() {
  const { state } = useLocation();
  const { avatar, clothingType } = state || {};
  const navigate = useNavigate();

  const [shirtColor, setShirtColor] = useState('#ffffff'); // Default shirt color
  const [shirtWidth, setShirtWidth] = useState(100); // Default shirt width in pixels
  const [shirtHeight, setShirtHeight] = useState(100); // Default shirt height in pixels
  const [shirtDesign, setShirtDesign] = useState(''); // For shirt design
  const [showBack, setShowBack] = useState(false); // Toggle for showing the back of the shirt
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position state
  const [shirtDesignIndex, setShirtDesignIndex] = useState(0); // Track selected design in the array
  const [selectedPattern, setSelectedPattern] = useState(''); // Track pattern selection

  if (!avatar) {
    return <p>No avatar selected. Please go back to the homepage.</p>;
  }

  const handlePositionChange = (e, axis) => {
    const value = e.target.value;
    setPosition((prev) => ({ ...prev, [axis]: value }));
  };

  const handlePreview = () => {
    navigate('/preview', {
      state: {
        avatar,
        clothingType,
        shirtColor,
        design: designs[shirtDesignIndex],
        selectedPattern,
        showBack,
        position,
      },
    });
  };

  const handleDesignChange = (direction) => {
    setShirtDesignIndex((prevIndex) =>
      direction === 'next'
        ? (prevIndex + 1) % designs.length
        : (prevIndex - 1 + designs.length) % designs.length
    );
  };

  const handlePatternSelect = (pattern) => {
    setSelectedPattern(pattern);
    setShirtColor(''); // Clear color when a pattern is selected
  };

  return (
    <div className="designer-page">
      <h2>Design Your {clothingType}</h2>
      <div className="designer-container">
        <div className="avatar-area">
          <img src={avatar} alt="Selected Avatar" className="avatar-display" />

          <div
            className="shirt-display front"
            style={{
              backgroundColor: selectedPattern ? '' : shirtColor,
              backgroundImage: selectedPattern
                ? `url(${selectedPattern.image})`
                : 'none',
              width: '200px',
              height: '300px',
              transform: `translate(${position.x}%, ${position.y}%)`,
            }}
          >
            <img
              src={designs[shirtDesignIndex].front}
              alt="Shirt Design Front"
            />
          </div>
          {showBack && (
            <div
              className="shirt-display back"
              style={{
                width: '200px',
                height: '300px',
                transform: `translate(${position.x}%, ${position.y}%)`,
              }}
            >
              <img
                src={designs[shirtDesignIndex].back}
                alt="Shirt Design Back"
              />
            </div>
          )}
        </div>

        <div className="control-panel">
          <div className="control-section">
            <h3>Control Panel</h3>
            <div>
              <label>Shirt Color:</label>
              <input
                type="color"
                value={shirtColor}
                onChange={(e) => {
                  setShirtColor(e.target.value);
                  setSelectedPattern('');
                }}
                disabled={!!selectedPattern}
              />
            </div>

            <button onClick={() => handleDesignChange('prev')}>
              Previous Design
            </button>
            <button onClick={() => handleDesignChange('next')}>
              Next Design
            </button>

            <div>
              <label>Width:</label>
              <input
                type="range"
                min="50"
                max="300"
                value={shirtWidth}
                onChange={(e) => setShirtWidth(e.target.value)}
              />
            </div>

            <div>
              <label>Height:</label>
              <input
                type="range"
                min="50"
                max="300"
                value={shirtHeight}
                onChange={(e) => setShirtHeight(e.target.value)}
              />
            </div>

            <div>
              <label>Show Back of Shirt:</label>
              <input
                type="checkbox"
                checked={showBack}
                onChange={(e) => setShowBack(e.target.checked)}
              />
            </div>

            <div>
              <label>Position (X):</label>
              <input
                type="range"
                min="0"
                max="190"
                value={position.x}
                onChange={(e) => handlePositionChange(e, 'x')}
              />
            </div>

            <div>
              <label>Position (Y):</label>
              <input
                type="range"
                min="0"
                max="500"
                value={position.y}
                onChange={(e) => handlePositionChange(e, 'y')}
              />
            </div>

            <div>
              <label>Shirt Design:</label>
              <select onChange={(e) => setShirtDesign(e.target.value)}>
                <option value="">Select Design</option>
                <option value="design1">Design 1</option>
                <option value="design2">Design 2</option>
              </select>
            </div>
          </div>

          <div className="pattern-section">
            <h4>Select Pattern:</h4>
            <div className="pattern-carousel">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => handlePatternSelect(pattern)}
                  style={{
                    backgroundImage: `url(${pattern.image})`,
                    width: '100px',
                    height: '100px',
                    backgroundSize: 'cover',
                  }}
                ></button>
              ))}
            </div>
            <button onClick={handlePreview}>See Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignerPage;
