'use client';

import { useState } from 'react';

interface PassageDisplayProps {
  onPassageSubmit: (passage: string) => void;
}

// Component for displaying and submitting the reading passage
export default function PassageDisplay({ onPassageSubmit }: PassageDisplayProps) {
  const [passage, setPassage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passage.trim().length < 100) {
      alert('Please enter a passage with at least 100 characters.');
      return;
    }
    onPassageSubmit(passage.trim());
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Enter Reading Passage
      </h2>
      <p className="text-gray-600 mb-4">
        Paste or type the reading passage below. The AI will generate 3 comprehension questions based on this text.
      </p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          placeholder="Enter your reading passage here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {passage.length} characters
          </p>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Start Test
          </button>
        </div>
      </form>
    </div>
  );
}
