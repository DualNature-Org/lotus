import React, { useState } from 'react';

// Sample reference data
const sampleReferences = [
  {
    authors: ["Smith John", "Wilson Mark", "Brown Sarah"],
    year: 2023,
    title: "Modern Web Development Practices",
    publisher: "IEEE Journal of Software Engineering",
    volume: "45(2)",
    page: "234-245",
    link: "https://doi.org/10.1234/example"
  },
  {
    authors: ["Johnson Robert", "Lee Michelle"],
    year: 2022,
    title: "Understanding React Performance Optimization",
    publisher: "ACM Computing Surveys",
    volume: "54(3)",
    page: "167-189",
    link: "https://doi.org/10.5678/example"
  },
  {
    authors: ["Garcia Carlos"],
    year: 2024,
    title: "The Future of Frontend Development",
    publisher: "Web Technologies Quarterly",
    volume: "12(1)",
    page: "45-58",
    link: "https://doi.org/10.9012/example"
  }
];

const ReferenceList = () => {
  const [style, setStyle] = useState('apa');
  const [showLinks, setShowLinks] = useState(false);

  const formatReference = (refData) => {
    let ref = '';
    
    if (style === 'harvard') {
      // Format authors
      refData.authors.forEach((author, index) => {
        const [firstName, lastName] = author.split(' ');
        if (index === refData.authors.length - 1 && refData.authors.length > 1) {
          ref += `and ${lastName} ${firstName[0]}., `;
        } else {
          ref += `${lastName} ${firstName[0]}., `;
        }
      });

      ref += `${refData.year}. `;
      ref += `${refData.title}. `;
      ref += `${refData.publisher}, `;
      ref += `${refData.volume}, `;
      ref += `pp.${refData.page}. `;
      if (showLinks) {
        ref += `Available: ${refData.link}`;
      }
    } else { // APA style
      // Format authors
      refData.authors.forEach((author, index) => {
        const [firstName, lastName] = author.split(' ');
        if (index === refData.authors.length - 1 && refData.authors.length > 1) {
          ref += `& ${lastName} ${firstName[0]}., `;
        } else {
          ref += `${lastName} ${firstName[0]}., `;
        }
      });

      ref += `(${refData.year}). `;
      ref += `${refData.title}. `;
      ref += `${refData.publisher}, `;
      ref += `${refData.volume}, `;
      ref += refData.page;
      if (showLinks) {
        ref += `. ${refData.link}`;
      }
    }

    return ref;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-teal-900/20 text-teal-50">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-teal-800">
        <div className="flex gap-4">
          <button
            onClick={() => setStyle('apa')}
            className={`px-4 py-2 rounded transition-colors ${
              style === 'apa' 
                ? 'bg-teal-600 text-white' 
                : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
            }`}
          >
            APA
          </button>
          <button
            onClick={() => setStyle('harvard')}
            className={`px-4 py-2 rounded transition-colors ${
              style === 'harvard' 
                ? 'bg-teal-600 text-white' 
                : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
            }`}
          >
            Harvard
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-teal-100">
            <input
              type="checkbox"
              checked={showLinks}
              onChange={(e) => setShowLinks(e.target.checked)}
              className="w-4 h-4 rounded bg-teal-800 border-teal-600 text-teal-600 focus:ring-teal-500"
            />
            Show Links
          </label>
        </div>
      </div>

      {/* Reference List */}
      <div className="space-y-2">
        {sampleReferences.map((ref, index) => (
          <div 
            key={index} 
            className="p-2 bg-teal-900 rounded text-teal-100 transition-colors text-left"
          >
            {formatReference(ref)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferenceList;