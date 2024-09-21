// src/components/AggregatedJobsComponent.tsx
import React from 'react';

// Job data keyed by years
const jobTitlesData: { [key: string]: { title: string; count: number }[] } = {
  2020: [{ title: 'ML Engineer', count: 50 }, { title: 'Data Scientist', count: 50 }],
  2021: [{ title: 'ML Engineer', count: 70 }, { title: 'Data Scientist', count: 80 }],
  2022: [{ title: 'ML Engineer', count: 100 }, { title: 'Data Scientist', count: 100 }],
  2023: [{ title: 'ML Engineer', count: 110 }, { title: 'Data Scientist', count: 110 }],
  2024: [{ title: 'ML Engineer', count: 150 }, { title: 'Data Scientist', count: 150 }],
};

interface AggregatedJobsComponentProps {
  selectedYear: number;
}

const AggregatedJobsComponent: React.FC<AggregatedJobsComponentProps> = ({ selectedYear }) => {
  // Convert selectedYear to a string to index jobTitlesData
  const jobs = jobTitlesData[selectedYear.toString()] || [];

  return (
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Number of Jobs</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job: { title: string; count: number }, index: number) => (
          <tr key={index}>
            <td>{job.title}</td>
            <td>{job.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AggregatedJobsComponent;
