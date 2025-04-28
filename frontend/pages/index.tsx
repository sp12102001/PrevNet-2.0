import React from 'react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 p-12 text-center transform transition-all hover:scale-[1.01] duration-300 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">PrevNet.</h1>
        <p className="text-xl sm:text-2xl text-white font-light opacity-90">A new network of preverbs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">What is PrevNet?</h2>
          <p className="text-gray-700 leading-relaxed">
            PrevNet is a comprehensive online resource dedicated to the study and exploration of preverbs in the Greek and Latin languages.
            The platform offers a vast collection of annotated occurrences, including 2,829 instances, meticulously curated with various linguistic parameters.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Unlocking Linguistic Insights</h2>
          <p className="text-gray-700 leading-relaxed">
            Delve into the intricate world of preverbs and verbs with PrevNet&apos;s extensive database, meticulously annotated with essential linguistic details.
            Whether you&apos;re a linguist, classicist, or language enthusiast, PrevNet provides a rich repository of linguistic data for in-depth analysis and exploration.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Connecting Languages and Cultures</h2>
          <p className="text-gray-700 leading-relaxed">
            PrevNet bridges the gap between the Greek and Latin languages, facilitating cross-linguistic comparisons and insights.
            Explore the nuanced meanings and usages of preverbs across different contexts, uncovering connections that transcend linguistic boundaries.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Empowering Research and Exploration</h2>
          <p className="text-gray-700 leading-relaxed">
            Our platform empowers researchers, students, and language enthusiasts to unravel the complexities of preverbs and verbs,
            offering a wealth of resources for linguistic analysis, research projects, and educational endeavors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
