import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/API"
import Button from 'react-bootstrap/Button'
import Cookie from "cookie-universal"
import { AXIOS } from "../../Api/AXIOS.JSX"
import { NavLink } from "react-router-dom"
import TableShow from "../../Components/TableShow.jsx";

const Users = () => {
    //:::states
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [refreshData, setRefreshData] = useState(true)
    //:::

    //:::
    const cookie = Cookie()
    const token = cookie.get('e-commerce')
    //:::

    //:::
    const id = window.location.pathname.replace('/dashboard/users/', '')
    console.log(id)
    //:::

    //:::
    useEffect(() => {
        AXIOS
            .get(`/${USER}`)
            .then((data) => {
                setCurrentUser(data.data)
                console.log(':::get authuser done:::', data)
            })
    }, [])
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
    const refreshBtn = () => setRefreshData((prev) => !prev)
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
            <div className="d-flex gap-2 justify-space-between">
                <NavLink to='/dashboard/user/add'>
                    <Button variant="outline-primary" size="sm" className="w-full" onClick={refreshBtn}>
                        Add user
                    </Button>
                </NavLink>
            </div>
            <br />
            <TableShow
                header={header}
                data={users}
                del={USER}
                setRefreshData={setRefreshData}
                currentUser={currentUser}
            />
        </div>
    )
}

export default Users