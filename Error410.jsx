import ErrorPage from '../components/ErrorPage'
import { Trash2 } from 'lucide-react'

const Error410 = () => {
  return (
    <ErrorPage
      errorCode="410"
      icon={Trash2}
      gradient="from-slate-500 via-gray-600 to-zinc-700"
    />
  )
}

export default Error410

