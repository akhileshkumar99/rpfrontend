import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function AdminDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('gallery');
  const [gallery, setGallery] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [facultyForm, setFacultyForm] = useState({ name: '', department: '', position: '', email: '', phone: '', image: null });
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', priority: 'Normal', image: null });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ className: '', teacherName: '', studentCount: '' });
  const [viewImage, setViewImage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    fetchAllCounts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchAllCounts = async () => {
    try {
      const [galleryRes, heroRes, facultyRes, coursesRes, admissionsRes, contactsRes, noticesRes, eventsRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/api/gallery`),
        fetch(`${API_URL}/api/hero-slides`),
        fetch(`${API_URL}/api/faculty`),
        fetch(`${API_URL}/api/courses`),
        fetch(`${API_URL}/api/admissions`),
        fetch(`${API_URL}/api/contacts`),
        fetch(`${API_URL}/api/notices`),
        fetch(`${API_URL}/api/events`),
        fetch(`${API_URL}/api/reviews/all`)
      ]);
      
      setGallery(await galleryRes.json());
      setHeroSlides(await heroRes.json());
      setFaculty(await facultyRes.json());
      setCourses(await coursesRes.json());
      setAdmissions(await admissionsRes.json());
      setContacts(await contactsRes.json());
      setNotices(await noticesRes.json());
      setEvents(await eventsRes.json());
      setReviews(await reviewsRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      if (activeTab === 'gallery') {
        const res = await fetch(`${API_URL}/api/gallery`);
        setGallery(await res.json());
      } else if (activeTab === 'hero') {
        const res = await fetch(`${API_URL}/api/hero-slides`);
        setHeroSlides(await res.json());
      } else if (activeTab === 'faculty') {
        const res = await fetch(`${API_URL}/api/faculty`);
        setFaculty(await res.json());
      } else if (activeTab === 'courses') {
        const res = await fetch(`${API_URL}/api/courses`);
        setCourses(await res.json());
      } else if (activeTab === 'admissions') {
        const res = await fetch(`${API_URL}/api/admissions`);
        setAdmissions(await res.json());
      } else if (activeTab === 'contacts') {
        const res = await fetch(`${API_URL}/api/contacts`);
        setContacts(await res.json());
      } else if (activeTab === 'notices') {
        const res = await fetch(`${API_URL}/api/notices`);
        setNotices(await res.json());
      } else if (activeTab === 'events') {
        const res = await fetch(`${API_URL}/api/events`);
        setEvents(await res.json());
      } else if (activeTab === 'reviews') {
        const res = await fetch(`${API_URL}/api/reviews/all`);
        setReviews(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach(file => formData.append('images', file));
    formData.append('category', 'All');
    formData.append('adminId', admin._id);

    try {
      const res = await fetch(`${API_URL}/api/gallery`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert('✅ Images uploaded successfully!');
        fetchData();
      }
    } catch (err) {
      alert('❌ Upload failed!');
    }
    e.target.value = '';
  };

  const handleHeroUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('title', 'SmartSchool');
    formData.append('subtitle', 'Quality Education');

    try {
      const res = await fetch(`${API_URL}/api/hero-slides`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert('✅ Hero slide added!');
        fetchData();
      }
    } catch (err) {
      alert('❌ Upload failed!');
    }
    e.target.value = '';
  };

  const deleteItem = async (type, id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/api/${type}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', facultyForm.name);
    formData.append('department', facultyForm.department);
    formData.append('position', facultyForm.position);
    formData.append('email', facultyForm.email);
    formData.append('phone', facultyForm.phone);
    if (facultyForm.image) formData.append('image', facultyForm.image);

    const url = editingFaculty 
      ? `${API_URL}/api/faculty/${editingFaculty}` 
      : `${API_URL}/api/faculty`;
    
    try {
      const res = await fetch(url, {
        method: editingFaculty ? 'PUT' : 'POST',
        body: formData
      });
      
      if (res.ok) {
        alert(editingFaculty ? '✅ Faculty updated!' : '✅ Faculty added!');
        setShowFacultyForm(false);
        setEditingFaculty(null);
        setFacultyForm({ name: '', department: '', position: '', email: '', phone: '', image: null });
        fetchData();
      }
    } catch (err) {
      alert('❌ Operation failed!');
    }
  };

  const handleEditFaculty = (member) => {
    setEditingFaculty(member._id);
    setFacultyForm({
      name: member.name,
      department: member.department,
      position: member.position,
      email: member.email,
      phone: member.phone,
      image: null
    });
    setShowFacultyForm(true);
  };

  const updateStatus = async (type, id, status) => {
    try {
      await fetch(`${API_URL}/api/${type}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      alert(`✅ Status updated to ${status}!`);
      fetchData();
    } catch (err) {
      alert('❌ Update failed!');
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', noticeForm.title);
    formData.append('content', noticeForm.content);
    formData.append('priority', noticeForm.priority);
    if (noticeForm.image) formData.append('image', noticeForm.image);
    
    const url = editingNotice 
      ? `${API_URL}/api/notices/${editingNotice}` 
      : `${API_URL}/api/notices`;
    
    try {
      const res = await fetch(url, {
        method: editingNotice ? 'PUT' : 'POST',
        body: formData
      });
      
      if (res.ok) {
        alert(editingNotice ? '✅ Notice updated!' : '✅ Notice created!');
        setShowNoticeForm(false);
        setEditingNotice(null);
        setNoticeForm({ title: '', content: '', priority: 'Normal', image: null });
        fetchData();
      }
    } catch (err) {
      alert('❌ Operation failed!');
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice._id);
    setNoticeForm({ title: notice.title, content: notice.content, priority: notice.priority, image: null });
    setShowNoticeForm(true);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const url = editingCourse ? `${API_URL}/api/courses/${editingCourse}` : `${API_URL}/api/courses`;
    try {
      const res = await fetch(url, {
        method: editingCourse ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      });
      if (res.ok) {
        alert(editingCourse ? '✅ Course updated!' : '✅ Course added!');
        setShowCourseForm(false);
        setEditingCourse(null);
        setCourseForm({ className: '', teacherName: '', studentCount: '' });
        fetchData();
      }
    } catch (err) {
      alert('❌ Operation failed!');
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course._id);
    setCourseForm({ className: course.className, teacherName: course.teacherName, studentCount: course.studentCount });
    setShowCourseForm(true);
  };

  const tabs = [
    { id: 'gallery', icon: '🖼️', label: 'Gallery', count: gallery.length },
    { id: 'hero', icon: '🎬', label: 'Hero Slides', count: heroSlides.length },
    { id: 'faculty', icon: '👨‍🏫', label: 'Faculty', count: faculty.length },
    { id: 'courses', icon: '📚', label: 'Courses', count: courses.length },
    { id: 'notices', icon: '📢', label: 'Notices', count: notices.length },
    { id: 'admissions', icon: '📝', label: 'Admissions', count: admissions.length },
    { id: 'contacts', icon: '📧', label: 'Contacts', count: contacts.length },
    { id: 'reviews', icon: '⭐', label: 'Reviews', count: reviews.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-2xl lg:fixed lg:h-full overflow-y-auto border-r border-gray-200 flex flex-col z-50">
        <div className="py-3 px-4 border-b border-gray-200 bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-lg">
              <img src="/rp logo (2).png" alt="RP School" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h1 className="text-sm font-extrabold text-white">Admin Panel</h1>
              <p className="text-[9px] text-white/80 font-semibold">RP School</p>
            </div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg py-1.5 px-2">
            <div className="text-[9px] font-bold text-white">{currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div className="text-sm font-extrabold text-white">{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
        </div>

        <nav className="p-3 flex-1 overflow-y-auto pb-24">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm">{tab.label}</div>
                <div className={`text-xs ${activeTab === tab.id ? 'text-white/70' : 'text-gray-400'}`}>{tab.count} items</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-gray-200 lg:fixed lg:bottom-0 lg:w-64 bg-white">
          <div className="mb-2 px-2">
            <p className="text-xs font-bold text-gray-800">{admin.username}</p>
            <p className="text-[10px] text-gray-500">Administrator</p>
          </div>
          <button onClick={onLogout} className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:ml-64 flex-1">
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 lg:px-6 py-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
        </nav>

        <div className="p-4 lg:p-6">

        {activeTab === 'gallery' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Gallery</h2>
                <p className="text-sm text-gray-500 font-semibold mt-1">Manage your image gallery</p>
              </div>
              <label className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 font-bold flex items-center gap-2">
                <span className="text-xl">📤</span>
                Upload Images
                <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map(img => (
                <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img 
                    src={img.imageUrl} 
                    className="w-full h-48 object-cover cursor-pointer" 
                    onClick={() => {
                      console.log('Image clicked:', img.imageUrl);
                      setViewImage(img.imageUrl);
                    }}
                    alt="Gallery"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem('gallery', img._id);
                      }}
                      className="absolute bottom-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition pointer-events-auto"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4" 
            onClick={() => setViewImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 z-[10000]" 
              onClick={() => setViewImage(null)}
            >
              ×
            </button>
            <img 
              src={viewImage} 
              className="max-w-full max-h-full object-contain" 
              onClick={(e) => e.stopPropagation()}
              alt="View"
            />
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hero Slides</h2>
                <p className="text-sm text-gray-500 font-semibold mt-1">Manage homepage hero slider</p>
              </div>
              <label className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 font-bold flex items-center gap-2">
                <span className="text-xl">➕</span>
                Add Slide
                <input type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroSlides.map(slide => (
                <div key={slide._id} className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <img src={slide.imageUrl} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => deleteItem('hero-slides', slide._id)}
                      className="absolute top-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-800">Faculty</h2>
              <button 
                onClick={() => { setShowFacultyForm(true); setEditingFaculty(null); setFacultyForm({ name: '', department: '', position: '', email: '', phone: '', image: null }); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
              >
                Add Faculty
              </button>
            </div>

            {showFacultyForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border">
                <h3 className="text-xl font-extrabold mb-4 text-gray-800">{editingFaculty ? 'Edit Faculty' : 'Add Faculty'}</h3>
                <form onSubmit={handleFacultySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" placeholder="Name" value={facultyForm.name} onChange={(e) => setFacultyForm({...facultyForm, name: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" required />
                    <input type="text" placeholder="Department" value={facultyForm.department} onChange={(e) => setFacultyForm({...facultyForm, department: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" required />
                    <input type="text" placeholder="Position" value={facultyForm.position} onChange={(e) => setFacultyForm({...facultyForm, position: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
                    <input type="email" placeholder="Email" value={facultyForm.email} onChange={(e) => setFacultyForm({...facultyForm, email: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
                    <input type="tel" placeholder="Phone" value={facultyForm.phone} onChange={(e) => setFacultyForm({...facultyForm, phone: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
                    <input type="file" accept="image/*" onChange={(e) => setFacultyForm({...facultyForm, image: e.target.files[0]})} className="px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">Save</button>
                    <button type="button" onClick={() => { setShowFacultyForm(false); setEditingFaculty(null); }} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faculty.map(member => (
                <div key={member._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border">
                  {member.imageUrl && (
                    <img src={member.imageUrl} className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-1">{member.department}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.position}</p>
                  {member.email && <p className="text-gray-500 text-xs">{member.email}</p>}
                  {member.phone && <p className="text-gray-500 text-xs">{member.phone}</p>}
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleEditFaculty(member)} className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
                    <button onClick={() => deleteItem('faculty', member._id)} className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Courses</h2>
                <p className="text-sm text-gray-500 font-semibold mt-1">Manage school courses</p>
              </div>
              <button onClick={() => { setShowCourseForm(true); setEditingCourse(null); setCourseForm({ className: '', teacherName: '', studentCount: '' }); }} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold flex items-center gap-2">
                <span className="text-xl">➕</span> Add Course
              </button>
            </div>
            {showCourseForm && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl mb-6 border-2 border-green-200">
                <h3 className="text-xl font-extrabold mb-4 text-gray-800">{editingCourse ? '✏️ Edit Course' : '➕ Add Course'}</h3>
                <form onSubmit={handleCourseSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder="Class Name" value={courseForm.className} onChange={(e) => setCourseForm({...courseForm, className: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100" required />
                    <input type="text" placeholder="Teacher Name" value={courseForm.teacherName} onChange={(e) => setCourseForm({...courseForm, teacherName: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100" required />
                    <input type="number" placeholder="Student Count" value={courseForm.studentCount} onChange={(e) => setCourseForm({...courseForm, studentCount: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100" required />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">✓ Save</button>
                    <button type="button" onClick={() => { setShowCourseForm(false); setEditingCourse(null); }} className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">✕ Cancel</button>
                  </div>
                </form>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <div key={course._id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{course.className}</h3>
                  <p className="text-gray-600 mb-1 font-semibold">👨🏫 {course.teacherName}</p>
                  <p className="text-gray-600 mb-4 font-semibold">👥 {course.studentCount} Students</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCourse(course)} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600">✏️ Edit</button>
                    <button onClick={() => deleteItem('courses', course._id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Admissions</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Parent</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map(admission => (
                    <tr key={admission._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-sm">{admission.studentName}</td>
                      <td className="px-4 py-3 text-sm">{admission.parentName}</td>
                      <td className="px-4 py-3 text-xs">
                        <div>{admission.email}</div>
                        <div className="text-gray-500">{admission.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{admission.class}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          admission.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          admission.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {admission.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {admission.status === 'Pending' && (
                            <>
                              <button onClick={() => updateStatus('admissions', admission._id, 'Approved')} className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Approve</button>
                              <button onClick={() => updateStatus('admissions', admission._id, 'Rejected')} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Reject</button>
                            </>
                          )}
                          <button onClick={() => deleteItem('admissions', admission._id)} className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Contacts</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Message</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-sm">{contact.name}</td>
                      <td className="px-4 py-3 text-xs">
                        <div>{contact.email}</div>
                        <div className="text-gray-500">{contact.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{contact.message?.substring(0, 50)}...</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          contact.status === 'Replied' ? 'bg-green-100 text-green-800' :
                          contact.status === 'Read' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {contact.status === 'New' && (
                            <button onClick={() => updateStatus('contacts', contact._id, 'Read')} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Read</button>
                          )}
                          {contact.status === 'Read' && (
                            <button onClick={() => updateStatus('contacts', contact._id, 'Replied')} className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Replied</button>
                          )}
                          <button onClick={() => deleteItem('contacts', contact._id)} className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">⭐ Reviews</h2>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review._id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
                      <div className="flex gap-1 mt-1">
                        {[1,2,3,4,5].map(star => (
                          <span key={star} className="text-xl">{star <= review.rating ? '⭐' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {review.isApproved ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.review}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">📅 {new Date(review.createdAt).toLocaleDateString('en-IN')}</span>
                    <div className="flex gap-2">
                      {!review.isApproved && (
                        <button onClick={async () => {
                          await fetch(`${API_URL}/api/reviews/${review._id}/approve`, { method: 'PUT' });
                          fetchData();
                        }} className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600">✓ Approve</button>
                      )}
                      <button onClick={() => deleteItem('reviews', review._id)} className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">🗑️ Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800">Notice Board Management</h2>
                <p className="text-gray-500 mt-1 font-semibold">Create and manage school notices</p>
              </div>
              <button 
                onClick={() => { setShowNoticeForm(true); setEditingNotice(null); setNoticeForm({ title: '', content: '', priority: 'Normal', image: null }); }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold flex items-center gap-2"
              >
                <span className="text-2xl">➕</span>
                Create Notice
              </button>
            </div>

            {showNoticeForm && (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl mb-8 border-2 border-orange-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">{editingNotice ? '✏️ Edit Notice' : '➕ Create New Notice'}</h3>
                <form onSubmit={handleNoticeSubmit} className="space-y-4">
                  <input type="text" placeholder="Notice Title" value={noticeForm.title} onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})} className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" required />
                  <textarea placeholder="Notice Content" value={noticeForm.content} onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})} className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" rows="5" required></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select value={noticeForm.priority} onChange={(e) => setNoticeForm({...noticeForm, priority: e.target.value})} className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all">
                      <option value="Normal">Normal Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                    <input type="file" accept="image/*" onChange={(e) => setNoticeForm({...noticeForm, image: e.target.files[0]})} className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105">✓ Save</button>
                    <button type="button" onClick={() => { setShowNoticeForm(false); setEditingNotice(null); }} className="flex-1 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105">✕ Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice._id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">{notice.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                      notice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {notice.priority}
                    </span>
                  </div>
                  {notice.imageUrl && (
                    <div className="mb-4">
                      <img src={notice.imageUrl} alt={notice.title} className="w-full max-w-md h-48 object-cover rounded-xl shadow-md" />
                    </div>
                  )}
                  <p className="text-gray-700 mb-4">{notice.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">📅 {new Date(notice.createdAt).toLocaleDateString('en-IN')}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditNotice(notice)} className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition">✏️ Edit</button>
                      <button onClick={() => deleteItem('notices', notice._id)} className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition">🗑️ Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
