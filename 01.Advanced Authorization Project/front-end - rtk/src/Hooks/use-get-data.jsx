import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetData = (DISPATCHER, SELECTOR) => {
  //:::
  const [refreshData, setRefreshData] = useState(false)
  //:::

  //:::
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(DISPATCHER())
  }, [dispatch, DISPATCHER, refreshData])
  const {
    data,
    isLoading,
    error,
    isError,
    isEmpty
  } = useSelector(SELECTOR)
  console.log('::: GET DATA FROM useGetData.jsx:::', data)
  //:::

  return { data, isLoading, error, isError, isEmpty, setRefreshData }
}

export default useGetData