import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const avatars = [
  `${process.env.PUBLIC_URL}/avatars/avatar2.png`,
  `${process.env.PUBLIC_URL}/avatars/avatar3.png`,
  `${process.env.PUBLIC_URL}/avatars/avatar4.png`,
  `${process.env.PUBLIC_URL}/avatars/avatar5.png`,
  `${process.env.PUBLIC_URL}/avatars/avatar6.png`,
  
];

const clothingTypes = ['Shirt', 'Blouse', 'Vest'];

function HomePage() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState('Shirt');
  const navigate = useNavigate();

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleStartDesigning = () => {
    if (!selectedAvatar) {
      alert('Please select an avatar!');
      return;
    }
    // Navigate to DesignerPage with avatar and clothing type as state
    navigate('/designer', {
      state: { avatar: selectedAvatar, clothingType: selectedClothing },
    });
  };

  return (
    <div className="home-page">
      <h1>Elite Fashionist</h1>

      <div className="avatar-selection">
        <h2>Select Your Avatar</h2>
        <div className="avatar-list">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`avatar ${
                selectedAvatar === avatar ? 'selected' : ''
              }`}
              onClick={() => handleAvatarSelect(avatar)}
            />
          ))}
        </div>
      </div>

      <div className="clothing-selection">
        <h2>Select Clothing Type</h2>
        <select
          value={selectedClothing}
          onChange={(e) => setSelectedClothing(e.target.value)}
        >
          {clothingTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button className="start-button" onClick={handleStartDesigning}>
        Start Designing
      </button>
    </div>
  );
}

export default HomePage;
