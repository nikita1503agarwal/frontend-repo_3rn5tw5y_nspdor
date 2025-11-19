import React, { useState } from 'react'

const roles = [
  'Contractor','Architect','Interior Designer','Carpenter','Electrician','Plumber','Manufacturer','Supplier','Buyer','Realtor','Project Manager','Civil Engineer'
]

export default function ProfileForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '', email: '', role: roles[0], company: '', location: '',
    skills: '', services: '', bio: '', phone: '', website: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],
        services: form.services ? form.services.split(',').map(s => s.trim()) : [],
      }
      const res = await fetch(`${backend}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create profile')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ name: '', email: '', role: roles[0], company: '', location: '', skills: '', services: '', bio: '', phone: '', website: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-slate-100">
      <h3 className="text-xl font-semibold mb-4">Create your professional profile</h3>
      {error && <div className="mb-3 text-red-400">{error}</div>}
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <select name="role" value={form.role} onChange={handleChange} className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700">
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website (https://)" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700"/>
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700 md:col-span-2"/>
        <input name="services" value={form.services} onChange={handleChange} placeholder="Services (comma separated)" className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700 md:col-span-2"/>
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio" rows={3} className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700 md:col-span-2" />
      </div>
      <button disabled={loading} className="mt-4 px-4 py-2 rounded bg-sky-500 hover:bg-sky-400 text-white font-semibold">
        {loading ? 'Creating...' : 'Create Profile'}
      </button>
    </form>
  )
}
