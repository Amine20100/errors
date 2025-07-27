import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'

const ErrorPage = ({ 
  errorCode, 
  icon: Icon,
  gradient = "from-blue-400 via-purple-500 to-pink-500"
}) => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  const title = t(`errors.${errorCode}.title`)
  const description = t(`errors.${errorCode}.description`)

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center p-4 relative`}>
      <LanguageToggle />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Error Code */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-white/20 mb-4">
            {errorCode}
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-white/80 mb-8 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Go Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={handleGoBack}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-8 py-3 text-lg font-medium"
            variant="outline"
          >
            {isRTL ? (
              <ArrowRight className="w-5 h-5 mr-2" />
            ) : (
              <ArrowLeft className="w-5 h-5 mr-2" />
            )}
            {t('common.goBack')}
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-16 w-6 h-6 bg-white/15 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-32 left-20 w-3 h-3 bg-white/25 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ErrorPage

