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
  } = state;

  const renderShirt = (isBack = false) => {
    const baseWidth = 200;
    const baseHeight = 200;
    const scaledWidth = baseWidth * (scale || 1);
    const scaledHeight = baseHeight * (scale || 1);

    // SVG path for shirt shape
    const shirtPath = `
      M 50 0
      C 20 0, 0 20, 0 50
      L 0 150
      C 0 180, 20 200, 50 200
      L 150 200
      C 180 200, 200 180, 200 150
      L 200 50
      C 200 20, 180 0, 150 0
      L 120 0
      C 120 10, 110 20, 100 20
      C 90 20, 80 10, 80 0
      Z
    `;

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
            <pattern
              id={`previewPattern${isBack ? 'Back' : 'Front'}`}
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              {selectedPattern ? (
                <image
                  href={selectedPattern.image}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <rect
                  width="100%"
                  height="100%"
                  fill={shirtColor || '#ffffff'}
                />
              )}
            </pattern>
          </defs>

          <path
            d={shirtPath}
            fill={`url(#previewPattern${isBack ? 'Back' : 'Front'})`}
            className="preview-shirt-path"
          />

          {design && (
            <image
              href={isBack ? design.back : design.front}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              style={{ mixBlendMode: 'multiply' }}
              className="preview-design-overlay"
            />
          )}
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
        </div>

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
        `}
      </style>
    </div>
  );
}

export default ShirtPreviewPage;
