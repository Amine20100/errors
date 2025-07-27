import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import { Languages, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'

const LanguageToggle = () => {
  const { i18n, t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 flex gap-2"
    >
      {/* Language Toggle */}
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
      >
        <Languages className="w-4 h-4 mr-2" />
        {i18n.language === 'ar' ? 'EN' : 'عر'}
      </Button>

      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </motion.div>
  )
}

export default LanguageToggle

