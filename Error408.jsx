import ErrorPage from '../components/ErrorPage'
import { Clock } from 'lucide-react'

const Error408 = () => {
  return (
    <ErrorPage
      errorCode="408"
      icon={Clock}
      gradient="from-amber-400 via-orange-500 to-red-500"
    />
  )
}

export default Error408

