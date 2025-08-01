import React from 'react';

const DiagnosisSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="card">
      <h2>{summary.title}</h2>
      <p>{summary.text}</p>
      <small>最終更新日: {summary.lastUpdated}</small>
    </div>
  );
};

export default DiagnosisSummary;
