import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import {Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import getUserType from "../utils/getUserType.jsx";
import {AXIOS} from "../Api/AXIOS.JSX";

const TableShow = (props) => {
    let {header, data, del, setRefreshData, currentUser} = props
    currentUser = currentUser || false // this value only for users table so we shoud add a default value "false" to avoid errors
    //::: handle delete function
    const handleDelete = async (id) => {
        try {
            const res = await AXIOS.delete(`/${del}/${id}`)
            setRefreshData((prev) => !prev)
            console.log(':::delete data done:::', res)
        } catch (error) {
            console.log('+++delete data error+++', error)
        }
    }
    //:::
    //::: table header
    const headerShow = header.map((head, index) => <th key={index}>{head?.name}</th>)
    //:::

    //::: table data
    const dataShow = data.map((item, index) => (
            <tr key={index}>
                {header.map((item2, index2) => (
                    <td key={index2}>
                        {getUserType(item[item2?.key])}
                        {currentUser && item[item2?.key] === currentUser?.name && '(you)'}
                    </td>
                ))}
                <td>
                    <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
                        <FontAwesomeIcon icon={faTrash} size={"xs"}/>
                    </Button>
                    <span> </span>
                    <NavLink to={`${item?.id}`}>
                        <Button variant={"primary"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
                            <FontAwesomeIcon icon={faEdit} size={"xs"}/>
                        </Button>
                    </NavLink>
                </td>
            </tr>
        )
    )
    //:::

    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    {headerShow}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.length === 0 ? (
                        <tr>
                            <td colSpan={12} style={{textAlign: 'center'}}>Loading....</td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={12} style={{textAlign: 'center'}}>No data found</td>
                        </tr>
                    ) : (dataShow)

                }
                </tbody>
            </Table>
        </div>
    )
}

export default TableShow