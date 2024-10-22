import React from 'react';

function AvatarCard({ avatar, isSelected, onSelect }) {
  return (
    <div
      className={`avatar-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <img
        src={`${process.env.PUBLIC_URL}/avatars/${avatar}`}
        alt="Avatar"
        className="avatar-image"
      />
    </div>
  );
}

export default AvatarCard;
