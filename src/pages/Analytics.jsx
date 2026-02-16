import React from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 90 },
  { subject: 'English', score: 78 },
  { subject: 'History', score: 82 },
  { subject: 'Arts', score: 88 }
]

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 48000, expenses: 34000 },
  { month: 'Mar', revenue: 52000, expenses: 36000 },
  { month: 'Apr', revenue: 55000, expenses: 38000 },
  { month: 'May', revenue: 58000, expenses: 40000 },
  { month: 'Jun', revenue: 62000, expenses: 42000 }
]

const courseData = [
  { course: 'Web Dev', enrolled: 120, completed: 95 },
  { course: 'Data Science', enrolled: 100, completed: 78 },
  { course: 'AI/ML', enrolled: 85, completed: 70 },
  { course: 'Mobile Dev', enrolled: 90, completed: 82 }
]

export default function Analytics() {
  return (
    <div className="charts">
      <div className="chart-card">
        <div className="chart-header">
          <h2>🎯 Performance Radar</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={performanceData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
            <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card large">
        <div className="chart-header">
          <h2>💰 Revenue vs Expenses</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h2>📚 Course Completion</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={courseData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis dataKey="course" type="category" stroke="#6b7280" />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="enrolled" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            <Bar dataKey="completed" fill="#10b981" radius={[0, 8, 8, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
