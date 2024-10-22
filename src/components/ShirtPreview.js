import React from 'react';

function ShirtPreview({ color, pattern, width, height, position }) {
  const shirtStyle = {
    backgroundColor: color,
    backgroundImage: pattern ? `url(${pattern})` : 'none',
    backgroundSize: 'cover',
    width: `${width}px`,
    height: `${height}px`,
    position: 'absolute',
    top: `${position.y}%`,
    left: `${position.x}%`,
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  };

  return <div style={shirtStyle} className="shirt-preview" />;
}

export default ShirtPreview;
