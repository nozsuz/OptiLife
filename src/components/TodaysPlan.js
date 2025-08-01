import React from 'react';

const TodaysPlan = ({ plan }) => {
  if (!plan) return null;

  const renderListItem = (item, index) => (
    <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
      <strong>{item.time || item.name}:</strong> {item.menu || `${item.duration} / ${item.reps || ''}`}
    </li>
  );

  return (
    <div className="card">
      <h2>{plan.title}</h2>
      <h3>食事プラン</h3>
      <ul>{plan.meals.map(renderListItem)}</ul>
      <h3>運動プラン</h3>
      <ul>{plan.exercises.map(renderListItem)}</ul>
    </div>
  );
};

export default TodaysPlan;
