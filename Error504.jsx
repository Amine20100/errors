import ErrorPage from '../components/ErrorPage'
import { Timer } from 'lucide-react'

const Error504 = () => {
  return (
    <ErrorPage
      errorCode="504"
      icon={Timer}
      gradient="from-violet-500 via-purple-600 to-indigo-700"
    />
  )
}

export default Error504

