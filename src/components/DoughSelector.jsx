import React from 'react';

const DoughSelector = ({ selected, onChange }) => {
    return (
        <div className="form-group">
      <label>Hamur Seç *</label>
      <select value={selected} onChange={e => onChange(e.target.value)}>
        <option value="kalın">Hamur Kalınlığı</option>
        <option value="ince">İnce Hamur</option>
        <option value="normal">Normal</option>
      </select>
    </div>
    );
}

export default DoughSelector;