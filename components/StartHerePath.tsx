'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function StartHerePath() {
  const [step, setStep] = useState<'initial' | 'quiz' | 'results'>('initial')
  const [level, setLevel] = useState<string>('')

  const recommendations = {
    beginner: [
      { title: 'Al-Arbaa\'in an-Nawawi', author: 'Imam Yahya al-Nawawi', category: 'hadith' },
      { title: 'Arabic Grammar for Beginners', author: 'Dr. V. Abdur Rahim', category: 'arabic' },
      { title: 'The Creed of the Four Imams', author: 'Abu Zahra', category: 'aqeedah' },
    ],
    intermediate: [
      { title: 'Fiqh of Islamic Banking & Finance', author: 'Dr. Muhammad Imran Ashraf Usmani', category: 'fiqh' },
      { title: 'Islamic Jurisprudence and its Methodology', author: 'Dr. Mustafa al-Zarqa', category: 'fiqh' },
      { title: 'The Sealed Nectar: Biography of the Prophet', author: 'Safiur Rahman al-Mubarakpuri', category: 'history' },
    ],
    advanced: [
      { title: 'Tafsir Ibn Kathir (10 Vol. Set)', author: 'Imam Ismail Ibn Kathir', category: 'quran-tafsir' },
      { title: 'Sahih al-Bukhari (6 Vol. Set)', author: 'Imam Muhammad al-Bukhari', category: 'hadith' },
      { title: 'The Qur\'an: A Contemporary Understanding', author: 'Dr. Muhammad Asad', category: 'quran-tafsir' },
    ],
  }

  const levels = [
    { value: 'beginner', label: 'Just Starting My Journey', emoji: '🌱' },
    { value: 'intermediate', label: 'Building My Knowledge', emoji: '📖' },
    { value: 'advanced', label: 'Deep Islamic Studies', emoji: '🎓' },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 'initial' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Start Here</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Not sure where to begin? Take our quick recommendation quiz to discover books perfectly matched to your learning level and interests.
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="btn-primary text-lg px-8 py-3"
            >
              Take the Quiz
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-8">What's Your Learning Level?</h2>
            <div className="grid gap-4 mb-8">
              {levels.map((lvl) => (
                <button
                  key={lvl.value}
                  onClick={() => {
                    setLevel(lvl.value)
                    setStep('results')
                  }}
                  className="p-6 border-2 border-border-warm rounded-lg hover:border-wood-dark hover:bg-parchment transition-all text-left"
                >
                  <div className="text-3xl mb-2">{lvl.emoji}</div>
                  <h3 className="text-lg font-semibold text-text-primary">{lvl.label}</h3>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('initial')}
              className="text-text-muted hover:text-text-primary"
            >
              ← Back
            </button>
          </div>
        )}

        {step === 'results' && level && (
          <div>
            <button
              onClick={() => setStep('quiz')}
              className="text-text-muted hover:text-text-primary mb-8 flex items-center gap-2"
            >
              ← Change Answer
            </button>
            <h2 className="text-3xl font-bold text-text-primary mb-2">Recommended For You</h2>
            <p className="text-text-muted mb-8">Based on your learning level, we suggest these books:</p>
            
            <div className="grid gap-4">
              {recommendations[level as keyof typeof recommendations].map((book, index) => (
                <div key={index} className="border border-border-warm rounded-lg p-4 hover:shadow-book transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{book.title}</h3>
                      <p className="text-text-muted text-sm mb-2">{book.author}</p>
                      <span className="inline-block badge-gold">{book.category}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-wood-dark flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/books">
                <button className="btn-primary text-lg px-8 py-3 w-full">
                  Explore All Books
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
