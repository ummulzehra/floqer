// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import TableComponent from './components/TableComponent';
import LineGraphComponent from './components/LineGraphComponent';
import AggregatedJobsComponent from './components/AggregatedJobsComponent';
import ChatComponent from './components/ChatComponent';

function App() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // State to track clicked year

  const handleRowClick = (year: number) => {
    setSelectedYear(year); // Update the selected year when a row is clicked
  };

  return (
    <div className="App">
      <h1>ML Engineer Salaries Dashboard</h1>

      {/* Task 1: Basic Table */}
      <h2>Main Table (Sortable)</h2>
      <TableComponent onRowClick={handleRowClick} /> {/* Pass the handler function */}

      {/* Task 2: Analytics - Line Graph */}
      <h2>Job Trends (2020-2024)</h2>
      <LineGraphComponent />

      {/* Task 2: Aggregated Job Titles Table */}
      {selectedYear && (
        <>
          <h2>Job Titles for {selectedYear}</h2>
          <AggregatedJobsComponent selectedYear={selectedYear} /> {/* Pass selected year */}
        </>
      )}

      {/* Bonus Task: Chat with LLM */}
      <h2>Ask Insights about ML Salaries</h2>
      <ChatComponent />
    </div>
  );
}

export default App;
