import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ShirtPreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="preview-error">
        <h2>No Preview Data</h2>
        <p>Please return to the designer page and try again.</p>
        <button onClick={() => navigate('/designer')}>
          Return to Designer
        </button>
      </div>
    );
  }

  const {
    avatar,
    clothingType,
    shirtColor,
    design,
    selectedPattern,
    showBack,
    position,
    scale,
    rotation,
    bodyMeasurements,
  } = state;

  const renderBodyMeasurementDetails = () => {
    if (!bodyMeasurements) return null;

    return (
      <div className="body-measurements-details">
        <h3>Body Measurements</h3>
        <div className="measurements-grid">
          {Object.entries(bodyMeasurements).map(([key, value]) => (
            <div key={key} className="measurement-item">
              <strong>
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (char) => char.toUpperCase())}
                :
              </strong>
              <span>{value} cm</span>
            </div>
          ))}
        </div>
        <div className="size-recommendation">
          {/* Basic size recommendation logic */}
          {calculateSizeRecommendation(bodyMeasurements)}
        </div>
      </div>
    );
  };

  const calculateSizeRecommendation = (measurements) => {
    const { chestCircumference, height } = measurements;

    if (chestCircumference < 85) return 'Small Size Recommended';
    if (chestCircumference < 95) return 'Medium Size Recommended';
    if (chestCircumference < 105) return 'Large Size Recommended';
    return 'Extra Large Size Recommended';
  };

  const renderShirt = (isBack = false) => {
    const baseWidth = 200;
    const baseHeight = 200;
    const scaledWidth = baseWidth * (scale || 1);
    const scaledHeight = baseHeight * (scale || 1);

    return (
      <div
        className={`preview-shirt ${isBack ? 'back' : 'front'}`}
        style={{
          position: 'relative',
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          transform: `translate(${position?.x || 0}%, ${
            position?.y || 0
          }%) rotate(${rotation || 0}deg)`,
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
            <mask id={`previewMask${isBack ? 'Back' : 'Front'}`}>
              <image
                href={isBack ? design.back : design.front}
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
              id={`previewPattern${isBack ? 'Back' : 'Front'}`}
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
                <rect width="200" height="200" fill={shirtColor || '#ffffff'} />
              )}
            </pattern>
          </defs>

          {/* Pattern-filled base */}
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill={`url(#previewPattern${isBack ? 'Back' : 'Front'})`}
            mask={`url(#previewMask${isBack ? 'Back' : 'Front'})`}
          />

          {/* Design overlay */}
          <image
            href={isBack ? design.back : design.front}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="preview-page">
      <h2>{clothingType || 'Shirt'} Preview</h2>

      <div className="preview-container">
        <div className="preview-main">
          {avatar && (
            <img src={avatar} alt="Avatar" className="preview-avatar" />
          )}

          <div className="preview-shirts">
            {renderShirt(false)}
            {showBack && renderShirt(true)}
          </div>
        </div>

        <div className="preview-details">
          <h3>Design Details</h3>
          <ul>
            <li>
              Base Color:{' '}
              <span
                style={{
                  backgroundColor: shirtColor,
                  padding: '0 10px',
                  border: '1px solid #ddd',
                }}
              >
                {shirtColor}
              </span>
            </li>
            {selectedPattern && <li>Pattern: {selectedPattern.id}</li>}
            {design && <li>Design: {design.id}</li>}
            <li>Scale: {scale || 1}x</li>
            <li>
              Position: X: {position?.x || 0}, Y: {position?.y || 0}
            </li>
            <li>Rotation: {rotation || 0}°</li>
          </ul>
          {renderBodyMeasurementDetails()}
        </div>

        {/* Rest of the existing styles and actions */}
        <div className="preview-actions">
          <button onClick={() => navigate(-1)} className="back-button">
            Back to Designer
          </button>
          <button onClick={() => window.print()} className="print-button">
            Print Preview
          </button>
        </div>
      </div>

      <style>
        {`
          .preview-page {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .preview-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
          }

          .preview-main {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            padding: 30px;
            background: #f8f8f8;
            border-radius: 8px;
            min-height: 500px;
          }

          .preview-avatar {
            max-width: 300px;
            height: auto;
          }

          .preview-shirts {
            display: flex;
            gap: 20px;
          }

          .preview-details {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
          }

          .preview-details ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .preview-details li {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .preview-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 20px;
          }

          .back-button, .print-button {
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.1em;
            transition: background-color 0.2s ease;
          }

          .back-button {
            background: #6c757d;
            color: white;
          }

          .print-button {
            background: #28a745;
            color: white;
          }

          .back-button:hover {
            background: #5a6268;
          }

          .print-button:hover {
            background: #218838;
          }

          .preview-error {
            text-align: center;
            padding: 40px;
          }

          @media print {
            .preview-actions {
              display: none;
            }

            .preview-page {
              padding: 0;
            }

            .preview-main {
              background: none;
              padding: 0;
            }
          }
           .measurements-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .measurement-item, .measurement-input {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .input-group {
            display: flex;
            align-items: center;
          }

          .input-group input {
            width: 70px;
            margin-right: 5px;
          }

          .size-recommendation {
            margin-top: 15px;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 5px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export default ShirtPreviewPage;
