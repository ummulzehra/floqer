// src/components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from '../utils/dataFetcher';
import { SalaryData } from '../utils/types'; // Import the SalaryData interface

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [dataset, setDataset] = useState<SalaryData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setDataset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { user: input, bot: 'Loading...' }];
    setMessages(newMessages);

    try {
      const relevantInfo = findRelevantInfo(input);
      const response = await axios.post(
        'https://api.groq.com/v1/query',
        { prompt: `${input} ${relevantInfo}` },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botResponse = response.data.result;
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { user: input, bot: botResponse },
      ]);
    } catch (error) {
      console.error('Error fetching data from Groq:', error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { user: input, bot: 'Error: Unable to fetch data from Groq.' },
      ]);
    }

    setInput('');
  };

  const findRelevantInfo = (userInput: string): string => {
    return dataset
      .filter(data => userInput.includes(data.jobTitle))
      .map(data => `${data.jobTitle}: ${data.numberOfJobs} jobs`)
      .join(', ') || 'No relevant information found.';
  };

  return (
    <div>
      <div className="chat-window" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>User:</strong> {msg.user}
            <br />
            <strong>Bot:</strong> {msg.bot}
            <br />
            <hr />
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something about ML Engineer salaries..."
        style={{ width: '80%', padding: '10px', marginRight: '10px' }}
      />

      <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatComponent;
