import ErrorPage from '../components/ErrorPage'
import { AlertCircle } from 'lucide-react'

const Error400 = () => {
  return (
    <ErrorPage
      errorCode="400"
      icon={AlertCircle}
      gradient="from-red-500 via-pink-500 to-rose-500"
    />
  )
}

export default Error400

