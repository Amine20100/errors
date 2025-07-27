import ErrorPage from '../components/ErrorPage'
import { Lock } from 'lucide-react'

const Error403 = () => {
  return (
    <ErrorPage
      errorCode="403"
      icon={Lock}
      gradient="from-red-400 via-orange-500 to-yellow-500"
    />
  )
}

export default Error403

