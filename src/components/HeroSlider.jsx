import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

export default function HeroSlider({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: 'SmartSchool',
      subtitle: 'Shaping Future Leaders Through Quality Education',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop'
    }
  ])

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/hero-slides`);
      const data = await res.json();
      if (data.length > 0) {
        setSlides(data);
      }
    } catch (err) {
      console.error('Error fetching slides:', err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={slide._id || slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.imageUrl?.startsWith('http') ? slide.imageUrl : `${API_BASE_URL}${slide.imageUrl}`}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide
                ? 'bg-white w-8 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
