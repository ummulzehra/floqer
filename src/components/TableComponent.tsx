// src/components/TableComponent.tsx
import React, { useState } from 'react';
import { salaryData } from '../data';

interface TableComponentProps {
  onRowClick: (year: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ onRowClick }) => {
  const [data, setData] = useState(salaryData);
  const [sortKey, setSortKey] = useState<keyof typeof salaryData[0] | null>(null); // Track which column is sorted
  const [isAsc, setIsAsc] = useState(true); // Track the sort direction

  // Sorting function
  const sortData = (key: keyof typeof salaryData[0]) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    });

    setData(sortedData); // Update the sorted data in state
    setSortKey(key); // Set the current sorting column
    setIsAsc(!isAsc); // Toggle sorting direction for the next click
  };

  return (
    <table>
      <thead>
        <tr>
          {/* Sortable headers */}
          <th onClick={() => sortData('year')}>
            Year {sortKey === 'year' ? (isAsc ? '▲' : '▼') : ''}
          </th>
          <th onClick={() => sortData('totalJobs')}>
            Total Jobs {sortKey === 'totalJobs' ? (isAsc ? '▲' : '▼') : ''}
          </th>
          <th onClick={() => sortData('avgSalary')}>
            Avg Salary (USD) {sortKey === 'avgSalary' ? (isAsc ? '▲' : '▼') : ''}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.year} onClick={() => onRowClick(row.year)}>
            <td>{row.year}</td>
            <td>{row.totalJobs}</td>
            <td>{row.avgSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
