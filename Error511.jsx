import ErrorPage from '../components/ErrorPage'
import { Shield } from 'lucide-react'

const Error511 = () => {
  return (
    <ErrorPage
      errorCode="511"
      icon={Shield}
      gradient="from-blue-600 via-indigo-700 to-purple-800"
    />
  )
}

export default Error511

