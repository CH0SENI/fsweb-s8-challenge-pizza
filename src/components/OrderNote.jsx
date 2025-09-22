import React from 'react';

const OrderNote = ({ note, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="order-note">Sipariş Notu</label>
      <textarea
        id="order-note"
        className="note-input"
        placeholder="Siparişine eklemek istediğin bir not var mı?"
        value={note}
        onChange={e => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default OrderNote;