import React from 'react';

const Notification = ({ message }) => {
  return (
    message && (
      <div className="alert alert-warning">
        {message}
      </div>
    )
  );
};

export default Notification;
