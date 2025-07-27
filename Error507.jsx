import ErrorPage from '../components/ErrorPage'
import { HardDrive } from 'lucide-react'

const Error507 = () => {
  return (
    <ErrorPage
      errorCode="507"
      icon={HardDrive}
      gradient="from-stone-500 via-neutral-600 to-gray-700"
    />
  )
}

export default Error507

