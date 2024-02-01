import TableShow from "../../Components/TableShow.jsx";
import { CAT, CATS } from "../../Api/API.jsx";
import useGetData from "../../Hooks/use-get-data.jsx";

const Categories = () => {
    //::: 
    // get the read api request using dynamic custom hook
    // it saves time and dupplicated code lines
    const {
        data: categories,
        setRefreshData
    } = useGetData(CATS)
    //:::

    //:::
    let header = [
        {
            key: 'id',
            name: 'id'
        },
        {
            key: 'title',
            name: 'title'
        },
        {
            key: 'image',
            name: 'image'
        }
    ]
    //:::

    return (
        <div>
            <TableShow
                header={header}
                data={categories}
                del={CAT}
                setRefreshData={setRefreshData}
                title='Categories'
                addTitle='Add Category'
                addLink='/dashboard/category/add'
            />
        </div>
    )
}

export default Categories