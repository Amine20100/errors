import ErrorPage from '../components/ErrorPage'
import { Wifi } from 'lucide-react'

const Error502 = () => {
  return (
    <ErrorPage
      errorCode="502"
      icon={Wifi}
      gradient="from-indigo-500 via-purple-600 to-pink-700"
    />
  )
}

export default Error502

