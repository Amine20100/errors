import ErrorPage from '../components/ErrorPage'
import { Search } from 'lucide-react'

const Error404 = () => {
  return (
    <ErrorPage
      errorCode="404"
      icon={Search}
      gradient="from-purple-400 via-pink-500 to-red-500"
    />
  )
}

export default Error404

