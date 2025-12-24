import React from 'react';
import Shimmer from './Shimmer';

/**
 * Shimmer Dropdown - For dropdown loading states
 */
const ShimmerDropdown: React.FC<{ twoColumns?: boolean }> = ({ twoColumns = false }) => {
  if (twoColumns) {
    return (
      <div className="grid grid-cols-2 gap-0">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="py-3 px-6">
            <Shimmer height="1rem" width="80%" rounded="rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="list-none m-0 p-0">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="p-0">
          <div className="py-3 px-6">
            <Shimmer height="1rem" width={index % 2 === 0 ? '90%' : '70%'} rounded="rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShimmerDropdown;

