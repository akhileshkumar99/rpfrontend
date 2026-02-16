import React from 'react'

export default function LogoSlider() {
  const logos = [
    { name: 'Cambridge', emoji: '🎓', color: 'blue', image: '/0.jpg' },
    { name: 'Oxford', emoji: '📚', color: 'purple', image: '/2.jpg' },
    { name: 'MIT', emoji: '🔬', color: 'red', image: '/3.jpg' },
    { name: 'Harvard', emoji: '🏛️', color: 'green', image: '/4.jpg' },
    { name: 'Stanford', emoji: '🌟', color: 'yellow', image: '/6.jpg' },
    { name: 'Yale', emoji: '📖', color: 'indigo', image: '/7.jpg' },
    { name: 'Princeton', emoji: '🎯', color: 'pink', image: '/8.jpg' },
    { name: 'Berkeley', emoji: '💡', color: 'teal', image: '/9.jpg' }
  ]

  return (
    <div className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Students Get Admitted To</h2>
        
        <div className="relative">
          <div className="flex animate-scroll space-x-12">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-40 h-32 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <img src={logo.image} alt={logo.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
