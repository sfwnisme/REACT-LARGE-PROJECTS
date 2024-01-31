import TableShow from "../../Components/TableShow.jsx";
import { useEffect, useState } from "react";
import { AXIOS } from "../../Api/AXIOS.JSX";
import { CAT, CATS } from "../../Api/API.jsx";

const Categories = () => {
    //:::
    const [categroies, setCategories] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    //:::

    //:::
    useEffect(() => {
        AXIOS
            .get(`/${CATS}`)
            .then((data) => {
                setCategories(data.data)
                console.log(':::get categories done:::', data)
            })
            .catch((error) => console.log('+++get categories error+++', error))
    }, [refreshData])
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

    return (
        <div>
            <TableShow
                header={header}
                data={categroies}
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