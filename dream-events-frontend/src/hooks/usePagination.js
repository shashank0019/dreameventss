import { useState } from 'react'

export const usePagination = (initialPage = 0, initialSize = 9) => {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(0, p - 1))
  const goToPage = (pageNumber) => setPage(pageNumber)

  return {
    page,
    size,
    setPage,
    setSize,
    nextPage,
    prevPage,
    goToPage
  }
}
export default usePagination
