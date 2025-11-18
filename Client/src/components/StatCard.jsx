import React from 'react';

const StatCard = ({ title, amount, icon, color, currency, isText = false }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
          {!isText && currency}
          {amount}
          {isText && currency}
        </p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full text-gray-600">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;