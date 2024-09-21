
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { salaryData } from '../data';

const LineGraphComponent = () => (
  <LineChart width={600} height={300} data={salaryData}>
    <XAxis dataKey="year" />
    <YAxis />
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <Tooltip />
    <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
  </LineChart>
);

export default LineGraphComponent;
