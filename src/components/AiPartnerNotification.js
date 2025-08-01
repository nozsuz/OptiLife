import React from 'react';

const AiPartnerNotification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className="card notification">
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
      <small>{notification.timestamp}</small>
    </div>
  );
};

export default AiPartnerNotification;
