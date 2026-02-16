import React from 'react'

const recentActivities = [
  { id: 1, action: 'New student enrolled', dept: 'Computer Science', time: '2 mins ago', icon: '👤' },
  { id: 2, action: 'Exam scheduled', dept: 'Mathematics', time: '15 mins ago', icon: '📝' },
  { id: 3, action: 'Faculty meeting', dept: 'All Departments', time: '1 hour ago', icon: '👥' },
  { id: 4, action: 'Grade submitted', dept: 'Engineering', time: '2 hours ago', icon: '✅' }
]

const upcomingEvents = [
  { id: 1, title: 'Mid-term Exams', date: 'Mar 15-20', type: 'exam' },
  { id: 2, title: 'Sports Day', date: 'Mar 25', type: 'event' },
  { id: 3, title: 'Parent Meeting', date: 'Apr 5', type: 'meeting' }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h3>📢 Recent Activity</h3>
        <div className="activity-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <span className="activity-icon">{activity.icon}</span>
              <div className="activity-content">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-dept">{activity.dept}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-card">
        <h3>📆 Upcoming Events</h3>
        <div className="events-list">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-item">
              <div className={`event-badge ${event.type}`}>
                {event.type === 'exam' ? '📝' : event.type === 'event' ? '🎉' : '👥'}
              </div>
              <div className="event-content">
                <p className="event-title">{event.title}</p>
                <span className="event-date">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-card quick-actions">
        <h3>⚡ Quick Actions</h3>
        <button className="action-btn">➕ Add Student</button>
        <button className="action-btn">📋 Create Report</button>
        <button className="action-btn">📧 Send Notice</button>
      </div>
    </aside>
  )
}
