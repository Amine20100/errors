import ErrorPage from '../components/ErrorPage'
import { Coffee } from 'lucide-react'

const Error418 = () => {
  return (
    <ErrorPage
      errorCode="418"
      icon={Coffee}
      gradient="from-emerald-400 via-teal-500 to-cyan-600"
    />
  )
}

export default Error418

