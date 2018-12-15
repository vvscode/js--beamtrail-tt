import React from 'react';

const BookReturnPhone = ({ userName, phone, bookPhone, returnPhone }) => {
  if (phone.isAvailable) {
    return <button onClick={() => bookPhone(phone)}>Book</button>;
  }
  if (phone.wasBookedBy === userName) {
    return <button onClick={() => returnPhone(phone)}>Return</button>;
  }
  return (
    <span>
      Booked by <strong>{phone.wasBookedBy}</strong> at{' '}
      <i>{phone.wasBookedAt}</i>
    </span>
  );
};

export default BookReturnPhone;
