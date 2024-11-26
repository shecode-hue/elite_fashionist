import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Design from '../../src/assets/designs/Top.png';
import Design1 from '../../src/assets/designs/hoodie.png';
import Design2 from '../../src/assets/designs/design2.png';
import Design3 from '../../src/assets/designs/design3.png';
import Design4 from '../../src/assets/designs/design4.png';
import Design5 from '../../src/assets/designs/design1.png';
import Designb from '../../src/assets/designs/Top_b.png';
import Design1b from '../../src/assets/designs/hoodie_b.png';
import Design2b from '../../src/assets/designs/design2back.png';
import Design3b from '../../src/assets/designs/design3back.png';
import Design4b from '../../src/assets/designs/design4back.png';
import Design5b from '../../src/assets/designs/design1back.png';

const designs = [
  {
    id: 'design',
    front: Design,
    back: Designb,
  },
  {
    id: 'design1',
    front: Design1,
    back: Design1b,
  },
  {
    id: 'design5',
    front: Design5,
    back: Design5b,
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

const ShirtDesigner = () => {
  // State management
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBack, setShowBack] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [shirtDesignIndex, setShirtDesignIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { avatar, clothingType } = location.state || {};
  const [bodyMeasurements, setBodyMeasurements] = useState({
    height: 170, // in cm
    waistCircumference: 85, // in cm
    armLength: 60, // in cm
    neckCircumference: 40, // in cm
  });
  if (!avatar) {
    return <p>No avatar selected. Please go back to the homepage.</p>;
  }

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
        scale,
        rotation,
        bodyMeasurements,
      },
    });
  };

  const renderShirt = (isBack = false) => {
    const baseWidth = 200;
    const baseHeight = 200;
    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;

    const currentDesign = isBack
      ? designs[shirtDesignIndex].back
      : designs[shirtDesignIndex].front;

    return (
      <div
        className={`shirt-container ${isBack ? 'back' : 'front'}`}
        style={{
          position: 'relative',
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          transform: `translate(${position.x}%, ${position.y}%) rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease',
        }}
      >
        <svg
          width={scaledWidth}
          height={scaledHeight}
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <defs>
            {/* Mask based on the design SVG */}
            <mask id={`shirtMask${isBack ? 'Back' : 'Front'}`}>
              <image
                href={currentDesign}
                width="200"
                height="200"
                preserveAspectRatio="xMidYMid slice"
                x="0"
                y="0"
                style={{ filter: 'invert(1)' }}
              />
            </mask>

            {/* Pattern definition */}
            <pattern
              id={`shirtPattern${isBack ? 'Back' : 'Front'}`}
              patternUnits="userSpaceOnUse"
              width="200"
              height="200"
              x="0"
              y="0"
            >
              {selectedPattern ? (
                <image
                  href={selectedPattern.image}
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <rect width="200" height="200" fill={shirtColor} />
              )}
            </pattern>
          </defs>

          {/* Pattern-filled base */}
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill={`url(#shirtPattern${isBack ? 'Back' : 'Front'})`}
            mask={`url(#shirtMask${isBack ? 'Back' : 'Front'})`}
          />

          {/* Design overlay */}
          <image
            href={currentDesign}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      </div>
    );
  };
  const handleNextDesign = () => {
    setShirtDesignIndex((prev) => (prev + 1) % designs.length);
  };

  const handlePreviousDesign = () => {
    setShirtDesignIndex((prev) => (prev - 1 + designs.length) % designs.length);
  };

  return (
    <div className="designer-page">
      <h2>Design Your {clothingType || 'Shirt'}</h2>

      <div className="designer-container">
        <div className="preview-area">
          {avatar && (
            <img src={avatar} alt="Avatar" className="avatar-preview" />
          )}
          {renderShirt(false)}
          {showBack && renderShirt(true)}
        </div>

        <div className="controls-container">
          <div className="controls">
            <div className="control-group">
              <label>Size:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Position X:</label>
              <input
                type="range"
                min="-150"
                max="0"
                value={position.x}
                onChange={(e) =>
                  setPosition((prev) => ({
                    ...prev,
                    x: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="control-group">
              <label>Position Y:</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={position.y}
                onChange={(e) =>
                  setPosition((prev) => ({
                    ...prev,
                    y: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="control-group">
              <label>Rotation:</label>
              <input
                type="range"
                min="-180"
                max="180"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Color:</label>
              <input
                type="color"
                value={shirtColor}
                onChange={(e) => {
                  setShirtColor(e.target.value);
                  setSelectedPattern(null);
                }}
                disabled={!!selectedPattern}
              />
            </div>

            <div className="control-group">
              <label>Show Back:</label>
              <input
                type="checkbox"
                checked={showBack}
                onChange={(e) => setShowBack(e.target.checked)}
              />
            </div>

            <div className="design-navigation">
              <button onClick={handlePreviousDesign}>Previous Design</button>
              <button onClick={handleNextDesign}>Next Design</button>
            </div>
          </div>

          <div className="pattern-section">
            <h3>Select Pattern</h3>
            <div className="pattern-grid">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  className={`pattern-button ${
                    selectedPattern?.id === pattern.id ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedPattern(pattern);
                    setShirtColor('#ffffff');
                  }}
                  style={{
                    backgroundImage: `url(${pattern.image})`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="body-measurements-section">
            <h3>Body Measurements</h3>
            <div className="measurements-grid">
              {Object.entries(bodyMeasurements).map(([key, value]) => (
                <div key={key} className="measurement-input">
                  <label>
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (char) => char.toUpperCase())}
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        setBodyMeasurements((prev) => ({
                          ...prev,
                          [key]: parseFloat(e.target.value),
                        }))
                      }
                    />
                    <span>
                      {key.includes('Circumference') || key === 'height'
                        ? 'cm'
                        : 'cm'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="preview-button" onClick={handlePreview}>
            See Preview
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShirtDesigner;
