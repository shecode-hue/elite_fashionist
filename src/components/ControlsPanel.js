import React from 'react';

const patterns = [
  `${process.env.PUBLIC_URL}/assets/patterns/pattern1.png`,
  `${process.env.PUBLIC_URL}/assets/patterns/pattern2.png`,
  `${process.env.PUBLIC_URL}/assets/patterns/pattern3.png`,
];

function ControlsPanel({
  onColorChange,
  onPatternChange,
  onWidthChange,
  onHeightChange,
  onPositionChange,
}) {
  const handlePositionChange = (e, axis) => {
    const value = Number(e.target.value);
    onPositionChange((prev) => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="controls-panel">
      <h3>Customize Your Shirt</h3>

      <label>Color:</label>
      <input type="color" onChange={(e) => onColorChange(e.target.value)} />

      <label>Pattern:</label>
      <select onChange={(e) => onPatternChange(e.target.value)}>
        <option value="">None</option>
        {patterns.map((pattern, index) => (
          <option key={index} value={pattern}>
            Pattern {index + 1}
          </option>
        ))}
      </select>

      <label>Width:</label>
      <input
        type="range"
        min="50"
        max="200"
        onChange={(e) => onWidthChange(e.target.value)}
      />

      <label>Height:</label>
      <input
        type="range"
        min="50"
        max="200"
        onChange={(e) => onHeightChange(e.target.value)}
      />

      <label>Position (X):</label>
      <input
        type="range"
        min="0"
        max="100"
        onChange={(e) => handlePositionChange(e, 'x')}
      />

      <label>Position (Y):</label>
      <input
        type="range"
        min="0"
        max="100"
        onChange={(e) => handlePositionChange(e, 'y')}
      />
    </div>
  );
}

export default ControlsPanel;
