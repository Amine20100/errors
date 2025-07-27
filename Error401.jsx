import ErrorPage from '../components/ErrorPage'
import { User } from 'lucide-react'

const Error401 = () => {
  return (
    <ErrorPage
      errorCode="401"
      icon={User}
      gradient="from-blue-400 via-indigo-500 to-purple-600"
    />
  )
}

export default Error401

