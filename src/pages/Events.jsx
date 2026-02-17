import React, { useState, useEffect } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://rp-school-backend.onrender.com/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Events Calendar
          </h1>
          <p className="text-gray-600 text-lg">Stay updated with upcoming school events and activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center min-w-[80px]">
                    <div className="text-3xl font-bold">{new Date(event.date).getDate()}</div>
                    <div className="text-sm">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                    <div className="text-xs">{new Date(event.date).getFullYear()}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-white/80 text-sm">🕒 {event.time}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-500 text-xl">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  );
}
