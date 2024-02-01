import { PRO, PROS } from '../../Api/API'
import TableShow from '../../Components/TableShow'
import useGetData from '../../Hooks/use-get-data'

const Products = () => {
  //:::
  const { data: products, setRefreshData } = useGetData(PROS)
  //:::

  //:::
  const header = [
    {
      key: 'title',
      name: 'Title',
    },
    {
      key: 'category',
      name: 'category',
    },
    {
      key: 'description',
      name: 'description',
    },
    {
      key: 'price',
      name: 'price',
    },
  ]
  //:::

  return (
    <div>
      <TableShow
        header={header}
        data={products}
        del={PRO}
        setRefreshData={setRefreshData}
        title='Products'
        addLink="/dashboard/product/add"
        addTitle="Add product"
      />
    </div>
  )
}

export default Products