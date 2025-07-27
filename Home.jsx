import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Search, 
  Lock, 
  User, 
  AlertTriangle, 
  ArrowRight, 
  Settings,
  Globe,
  AlertCircle,
  Clock,
  Trash2,
  Coffee,
  Zap,
  Wifi,
  Timer,
  HardDrive,
  Shield
} from 'lucide-react'
import LanguageToggle from '../components/LanguageToggle'

const Home = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const errorPages = [
    {
      code: '400',
      icon: AlertCircle,
      color: 'from-red-500 to-rose-500',
      path: '/400'
    },
    {
      code: '401',
      icon: User,
      color: 'from-blue-400 to-indigo-500',
      path: '/401'
    },
    {
      code: '403',
      icon: Lock,
      color: 'from-red-400 to-orange-500',
      path: '/403'
    },
    {
      code: '404',
      icon: Search,
      color: 'from-purple-400 to-pink-500',
      path: '/404'
    },
    {
      code: '408',
      icon: Clock,
      color: 'from-amber-400 to-red-500',
      path: '/408'
    },
    {
      code: '410',
      icon: Trash2,
      color: 'from-slate-500 to-zinc-700',
      path: '/410'
    },
    {
      code: '418',
      icon: Coffee,
      color: 'from-emerald-400 to-cyan-600',
      path: '/418'
    },
    {
      code: '429',
      icon: Zap,
      color: 'from-yellow-400 to-red-600',
      path: '/429'
    },
    {
      code: '500',
      icon: AlertTriangle,
      color: 'from-gray-400 to-gray-600',
      path: '/500'
    },
    {
      code: '502',
      icon: Wifi,
      color: 'from-indigo-500 to-pink-700',
      path: '/502'
    },
    {
      code: '503',
      icon: Settings,
      color: 'from-orange-400 to-red-500',
      path: '/503'
    },
    {
      code: '504',
      icon: Timer,
      color: 'from-violet-500 to-indigo-700',
      path: '/504'
    },
    {
      code: '507',
      icon: HardDrive,
      color: 'from-stone-500 to-gray-700',
      path: '/507'
    },
    {
      code: '511',
      icon: Shield,
      color: 'from-blue-600 to-purple-800',
      path: '/511'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative">
      <LanguageToggle />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-white mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {t('home.title')}
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
        </motion.div>

        {/* Error Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {errorPages.map((page, index) => (
            <motion.div
              key={page.code}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link to={page.path}>
                <div className={`bg-gradient-to-br ${page.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-white/30">
                      {page.code}
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <page.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {t(`errors.${page.code}.title`)}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t('home.clickToView', { code: page.code })}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12 pb-8"
        >
          <p className="text-white/60">
            {t('home.footer')}
          </p>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.2
              }}
              className={`absolute bg-white/20 rounded-full`}
              style={{
                width: `${8 + (i % 4) * 4}px`,
                height: `${8 + (i % 4) * 4}px`,
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 4) * 20}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

