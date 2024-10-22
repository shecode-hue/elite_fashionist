import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShirtPreview from './ShirtPreview';

function ShirtPreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No preview data available.</p>;
  }

  const { avatar, shirtColor, pattern, width, height, position } = state;

  return (
    <div className="preview-page">
      <h2>Full Preview</h2>
      <div className="avatar-display">
        <img
          src={`${process.env.PUBLIC_URL}/avatars/${avatar}`}
          alt="Avatar"
          className="avatar"
        />
        <ShirtPreview
          color={shirtColor}
          pattern={pattern}
          width={width}
          height={height}
          position={position}
        />
      </div>
      <button onClick={() => navigate(-1)}>Back to Design</button>
    </div>
  );
}

export default ShirtPreviewPage;
