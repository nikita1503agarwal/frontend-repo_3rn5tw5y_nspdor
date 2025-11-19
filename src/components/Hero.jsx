import React from 'react'

export default function Hero({ onCreateProfile }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-sky-900/60 via-slate-900 to-slate-950"/>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Connect the entire construction and real-estate ecosystem
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl">
          From contractors and architects to vendors and buyers — showcase your work, find partners, and grow your business.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onCreateProfile} className="px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow">
            Create your profile
          </button>
          <a href="#directory" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold">
            Browse directory
          </a>
        </div>
      </div>
    </section>
  )
}
