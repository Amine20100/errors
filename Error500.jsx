import ErrorPage from '../components/ErrorPage'
import { AlertTriangle } from 'lucide-react'

const Error500 = () => {
  return (
    <ErrorPage
      errorCode="500"
      icon={AlertTriangle}
      gradient="from-gray-400 via-gray-600 to-gray-800"
    />
  )
}

export default Error500

