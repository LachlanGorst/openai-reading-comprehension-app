"use client";

import { useState, useMemo } from "react";

interface PassageReaderProps {
  title: string;
  content: string;
}

// Component for displaying the passage with left/right navigation
export default function PassageReader({ title, content }: PassageReaderProps) {
  // Split passage into sections by grouping 2-3 sentences together
  const sections = useMemo(() => {
    // Split by sentences (period, question mark, exclamation mark)
    const sentences = content
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.trim().length > 0);

    // Group sentences into logical sections (2-3 sentences per section)
    const groupedSections = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const sectionSentences = sentences.slice(i, i + 2);
      groupedSections.push({
        id: groupedSections.length,
        text: sectionSentences.join(" ").trim(),
      });
    }

    return groupedSections;
  }, [content]);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = sections[currentSectionIndex];

  const goToPrevious = () => {
    setCurrentSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentSectionIndex((prev) =>
      prev < sections.length - 1 ? prev + 1 : prev
    );
  };

  const canGoPrevious = currentSectionIndex > 0;
  const canGoNext = currentSectionIndex < sections.length - 1;

  return (
    <div
      className="bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27] rounded-2xl p-8 mb-8 border border-purple-500/20 shadow-2xl"
      style={{
        boxShadow: "0 0 30px rgba(210, 0, 255, 0.15)",
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-3">{title}</h2>
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full"></div>
      </div>

      {/* Main content area with navigation */}
      <div className="flex items-center gap-6">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            canGoPrevious
              ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:scale-110 cursor-pointer active:scale-95"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
          style={
            canGoPrevious
              ? { boxShadow: "0 0 20px rgba(210, 0, 255, 0.4)" }
              : {}
          }
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Content area */}
        <div
          className="flex-1 min-h-48 bg-[#0f1629] rounded-xl p-8 border border-purple-500/30 shadow-lg"
          style={{
            boxShadow: "inset 0 0 20px rgba(210, 0, 255, 0.08)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-sm">
                {currentSectionIndex + 1}
              </div>
              <span className="text-sm font-semibold text-purple-300">
                Section {currentSectionIndex + 1} of {sections.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-purple-900/30 rounded-full h-1.5 mb-6">
            <div
              className="bg-gradient-to-r from-purple-500 to-orange-400 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentSectionIndex + 1) / sections.length) * 100
                }%`,
                boxShadow: "0 0 10px rgba(255, 149, 0, 0.5)",
              }}
            ></div>
          </div>

          {/* Section text */}
          <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">
            {currentSection.text}
          </p>
        </div>

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={!canGoNext}
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            canGoNext
              ? "bg-gradient-to-br from-orange-500 to-amber-400 text-black hover:scale-110 cursor-pointer active:scale-95"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
          style={
            canGoNext ? { boxShadow: "0 0 20px rgba(255, 149, 0, 0.4)" } : {}
          }
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Footer info */}
      <div className="mt-8 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
        <p className="text-sm text-purple-200">
          <span className="font-semibold text-purple-300">Tip:</span> Use the
          arrow buttons to navigate through the passage one section at a time.
          The progress bar shows your reading progress.
        </p>
      </div>
    </div>
  );
}
