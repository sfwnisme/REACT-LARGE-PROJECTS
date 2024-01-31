import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/API"
import Button from 'react-bootstrap/Button'
import Cookie from "cookie-universal"
import { AXIOS } from "../../Api/AXIOS.JSX"
import TableShow from "../../Components/TableShow.jsx";
import useSignedUser from "../../Hooks/use-signed-user.jsx"

const Users = () => {
    //:::states
    const [users, setUsers] = useState([])
    const [refreshData, setRefreshData] = useState(true)
    //:::

    //:::
    const cookie = Cookie()
    const token = cookie.get('e-commerce')
    //:::

    //:::usnig this hook instead of fetching data inside the component
    const { currentUser } = useSignedUser()
    //:::

    //:::
    useEffect(() => {
        try {
            AXIOS
                .get(`/${USERS}`)
                .then((data) => {
                    setUsers(data.data)
                    console.log(':::get users done:::', data)
                })
        } catch (error) {
            console.log('+++get users error++', error)
        }
    }, [token, refreshData])
    //:::

    //:::
    const header = [
        {
            key: 'id',
            name: 'id',
        },
        {
            key: 'name',
            name: 'name',
        },
        {
            key: 'email',
            name: 'email',
        },
        {
            key: 'role',
            name: 'role',
        },

    ]
    //:::

    return (
        <div>
            <TableShow
                header={header}
                data={users}
                del={USER}
                setRefreshData={setRefreshData}
                currentUser={currentUser}
                title='Users'
                addTitle="Add User"
                addLink='/dashboard/user/add'
            />
        </div>
    )
}

export default Users