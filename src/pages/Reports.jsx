import React from 'react'

const reports = [
  { id: 1, title: 'Monthly Attendance Report', date: '2024-03-01', status: 'completed', type: 'attendance' },
  { id: 2, title: 'Student Performance Analysis', date: '2024-03-05', status: 'completed', type: 'performance' },
  { id: 3, title: 'Financial Summary Q1', date: '2024-03-10', status: 'pending', type: 'financial' },
  { id: 4, title: 'Faculty Evaluation Report', date: '2024-03-15', status: 'in-progress', type: 'evaluation' },
  { id: 5, title: 'Department Wise Analysis', date: '2024-03-20', status: 'completed', type: 'department' },
  { id: 6, title: 'Enrollment Trends Report', date: '2024-03-25', status: 'completed', type: 'enrollment' }
]

export default function Reports() {
  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>📊 Generated Reports</h2>
        <button className="btn-primary">+ Generate New Report</button>
      </div>

      <div className="reports-grid">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-icon">
              {report.type === 'attendance' && '📅'}
              {report.type === 'performance' && '📈'}
              {report.type === 'financial' && '💰'}
              {report.type === 'evaluation' && '⭐'}
              {report.type === 'department' && '🏫'}
              {report.type === 'enrollment' && '👥'}
            </div>
            <div className="report-content">
              <h3>{report.title}</h3>
              <p className="report-date">Generated: {report.date}</p>
              <span className={`report-status ${report.status}`}>
                {report.status === 'completed' && '✅ Completed'}
                {report.status === 'pending' && '⏳ Pending'}
                {report.status === 'in-progress' && '🔄 In Progress'}
              </span>
            </div>
            <div className="report-actions">
              <button className="btn-view">👁️ View</button>
              <button className="btn-download">⬇️ Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
