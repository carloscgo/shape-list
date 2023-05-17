// infrastructure/ui/hooks/useStatus.tsx

import { useState } from 'react'

const useStatus = () => {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | undefined>()

  return {
    status,
    setStatus,
    error,
    setError,
  }
}

export default useStatus
