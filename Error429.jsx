import ErrorPage from '../components/ErrorPage'
import { Zap } from 'lucide-react'

const Error429 = () => {
  return (
    <ErrorPage
      errorCode="429"
      icon={Zap}
      gradient="from-yellow-400 via-orange-500 to-red-600"
    />
  )
}

export default Error429

