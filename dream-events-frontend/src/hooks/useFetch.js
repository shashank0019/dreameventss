import { useState, useEffect, useCallback, useRef } from 'react'

export const useFetch = (fetchFn, immediate = true) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const fetchFnRef = useRef(fetchFn)

  useEffect(() => {
    fetchFnRef.current = fetchFn
  }, [fetchFn])

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFnRef.current(...args)
      setData(response)
      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  return { data, loading, error, execute, setData }
}
export default useFetch
