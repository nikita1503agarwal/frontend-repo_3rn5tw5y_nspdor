import React, { useState } from 'react'
import Hero from './components/Hero'
import ProfileForm from './components/ProfileForm'
import Directory from './components/Directory'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero onCreateProfile={() => setShowForm(true)} />

      <div className="max-w-6xl mx-auto px-6">
        {showForm && (
          <div className="my-12">
            <ProfileForm onCreated={() => {
              setShowForm(false)
              // Optionally show a toast or message
            }} />
          </div>
        )}
      </div>

      <Directory />

      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-slate-400 text-sm">
          Built for the construction and real-estate community
        </div>
      </footer>
    </div>
  )
}

export default App
