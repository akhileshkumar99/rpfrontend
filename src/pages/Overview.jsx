import React from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const enrollmentData = [
  { month: 'Jan', students: 450, faculty: 45 },
  { month: 'Feb', students: 480, faculty: 46 },
  { month: 'Mar', students: 520, faculty: 48 },
  { month: 'Apr', students: 550, faculty: 50 },
  { month: 'May', students: 580, faculty: 52 },
  { month: 'Jun', students: 600, faculty: 54 }
]

const departmentData = [
  { dept: 'Computer Science', students: 320, color: '#3b82f6' },
  { dept: 'Engineering', students: 280, color: '#10b981' },
  { dept: 'Mathematics', students: 180, color: '#f59e0b' },
  { dept: 'Biology', students: 220, color: '#ef4444' },
  { dept: 'Business', students: 250, color: '#8b5cf6' }
]

const gradeData = [
  { name: 'A (90-100)', value: 30, color: '#10b981' },
  { name: 'B (80-89)', value: 35, color: '#3b82f6' },
  { name: 'C (70-79)', value: 20, color: '#f59e0b' },
  { name: 'D (60-69)', value: 10, color: '#f97316' },
  { name: 'F (0-59)', value: 5, color: '#ef4444' }
]

const attendanceData = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 85 },
  { day: 'Thu', rate: 90 },
  { day: 'Fri', rate: 78 }
]

export default function Overview({ searchQuery }) {
  const filteredDepts = departmentData.filter(d => 
    d.dept.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="charts">
      <div className="chart-card large">
        <div className="chart-header">
          <h2>📊 Enrollment & Faculty Growth</h2>
          <select className="chart-filter">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={enrollmentData}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFaculty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="students" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStudents)" />
            <Area type="monotone" dataKey="faculty" stroke="#10b981" fillOpacity={1} fill="url(#colorFaculty)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h2>🏫 Department Distribution</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={searchQuery ? filteredDepts : departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dept" stroke="#6b7280" angle={-15} textAnchor="end" height={80} />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Bar dataKey="students" radius={[8, 8, 0, 0]}>
              {(searchQuery ? filteredDepts : departmentData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h2>📝 Grade Distribution</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie 
              data={gradeData} 
              cx="50%" 
              cy="50%" 
              labelLine={false} 
              label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100} 
              dataKey="value"
            >
              {gradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h2>📅 Weekly Attendance Rate</h2>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
