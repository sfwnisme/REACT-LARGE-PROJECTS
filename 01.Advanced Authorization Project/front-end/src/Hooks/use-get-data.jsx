import { useEffect, useState } from "react"
import { AXIOS } from "../Api/AXIOS.JSX"

const useGetData = (ENDPOINT) => {
  const [data, setData] = useState([])
  const [refreshData, setRefreshData] = useState(true)

  //:::
  useEffect(() => {
    AXIOS.get(`/${ENDPOINT}`)
      .then((data) => {
        setData(data.data)
        console.log(`:::get ${ENDPOINT} done:::`, data)
      })
      .catch((error) => {
        console.log(`+++get ${ENDPOINT} error+++`, error)
      })
  }, [ENDPOINT, refreshData])
  //:::

  return { data, refreshData, setRefreshData, ENDPOINT }
}

export default useGetData

/**
 * @params ENDPOINT - the API end point for the read request
 * @returns {data} - the data returned from the API
 * @returns {refreshData, setRefreshData} - this state handle recall or refresh the data if you delete or edit data
 * @returns {ENDPOINT} - the endpoint name
 */