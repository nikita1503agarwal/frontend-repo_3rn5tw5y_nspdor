import React, { useEffect, useState } from 'react'

const roles = ['All','Contractor','Architect','Interior Designer','Carpenter','Electrician','Plumber','Manufacturer','Supplier','Buyer','Realtor','Project Manager','Civil Engineer']

export default function Directory() {
  const [items, setItems] = useState([])
  const [role, setRole] = useState('All')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (role !== 'All') params.set('role', role)
      if (q) params.set('q', q)
      const res = await fetch(`${backend}/directory?${params.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section id="directory" className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="px-3 py-2 bg-slate-900/60 rounded border border-slate-700 text-slate-100">
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name, skill, service, company" className="flex-1 px-3 py-2 bg-slate-900/60 rounded border border-slate-700 text-slate-100"/>
        <button onClick={load} className="px-4 py-2 rounded bg-sky-500 hover:bg-sky-400 text-white font-semibold">Search</button>
      </div>

      {loading ? (
        <div className="text-slate-300">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 text-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 font-bold">
                  {p.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-slate-300 text-sm">{p.role} • {p.location || '—'}</div>
                </div>
              </div>
              {p.company && <div className="mt-3 text-slate-300 text-sm">{p.company}</div>}
              {p.skills?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.skills.slice(0,6).map((s, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded bg-slate-900/60 border border-slate-700 text-slate-300">{s}</span>
                  ))}
                </div>
              )}
              {p.services?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.services.slice(0,6).map((s, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded bg-sky-900/40 border border-sky-700/50 text-sky-200">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
