import React from 'react'

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RP School</h3>
            <iframe 
              src="https://maps.google.com/maps?q=RP+School+Newada+Basti&hl=en&z=15&output=embed&t=h"
              className="w-full h-40 rounded-lg border-2 border-gray-700"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RP School - Newada, Basti, Uttar Pradesh"
            ></iframe>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition">About Us</button></li>
              <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white transition">Courses</button></li>
              <li><button onClick={() => setCurrentPage('admissions')} className="hover:text-white transition">Admissions</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 R P Public School Newada</li>
              <li>Parshurampur, Basti</li>
              <li>Uttar Pradesh - 272130</li>
              <li>📞 +91 (123) 456-7890</li>
              <li>✉️ info@rpschool.edu</li>
              <li>🕒 Mon-Fri: 8AM - 5PM</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">f</button>
              <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">t</button>
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">i</button>
              <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">y</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 RP School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
