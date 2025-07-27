import ErrorPage from '../components/ErrorPage'
import { Settings } from 'lucide-react'

const Error503 = () => {
  return (
    <ErrorPage
      errorCode="503"
      icon={Settings}
      gradient="from-orange-400 via-red-500 to-pink-600"
    />
  )
}

export default Error503

