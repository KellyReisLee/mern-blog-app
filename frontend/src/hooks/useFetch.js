
import { useState, useEffect } from "react";


export const useFetch = (fetchFn, message) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await fetchFn;
        setData(response.data)

      } catch (error) {
        setError(error.response?.data?.error || message)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    setError
  }

}

