import ErrorPage from '../components/ErrorPage'
import { ArrowRight } from 'lucide-react'

const Error302 = () => {
  return (
    <ErrorPage
      errorCode="302"
      icon={ArrowRight}
      gradient="from-green-400 via-blue-500 to-purple-600"
    />
  )
}

export default Error302

