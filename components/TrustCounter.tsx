import { BookOpen, Globe, Users, CheckCircle } from 'lucide-react'

export function TrustCounter() {
  const stats = [
    {
      icon: BookOpen,
      value: '1,500+',
      label: 'Titles Available',
    },
    {
      icon: Globe,
      value: '45+',
      label: 'Countries Served',
    },
    {
      icon: Users,
      value: '25,000+',
      label: 'Satisfied Readers',
    },
    {
      icon: CheckCircle,
      value: '100%',
      label: 'Authentic Sources',
    },
  ]

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-parchment rounded-full">
                    <Icon className="w-8 h-8 text-wood-dark" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-wood-dark mb-2">
                  {stat.value}
                </h3>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
