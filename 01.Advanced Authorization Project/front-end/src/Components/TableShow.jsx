import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import getUserType from "../utils/getUserType.jsx";
import ToastMsg from "../Pages/Dashboard/ToastMsg.jsx";
import { AXIOS } from "../Api/AXIOS.JSX";
import { useEffect, useState } from "react";

const TableShow = (props) => {
    //:::
    const [enableToast, setEnableToast] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setEnableToast(false), [2000])
        return () => clearTimeout(timer)
    }, [enableToast])
    //:::

    //::: handle props
    let { header, data, del, setRefreshData, currentUser } = props
    // this value only for users table so we shoud add a default value "{id: ""}" to avoid errors
    // creating object with empty id value as a default value to avoid calling undefined object's key
    currentUser = currentUser || { id: ''/* make it empty to avoid undefined values */ }
    //:::

    //::: table header
    const headerShow = header.map((head, index) => <th key={index}>{head?.name}</th>)
    //:::

    //::: handle delete function
    const handleDelete = async (id) => {
        try {
            const res = await AXIOS.delete(`/${del}/${id}`)
            setRefreshData((prev) => !prev)
            setEnableToast((prev) => !prev)
            console.log(':::delete data done:::', res)
        } catch (error) {
            console.log('+++delete data error+++', error)
        }
    }
    //:::

    //::: table data
    const dataShow = data.map((item, index) => (
        <tr key={index}>
            {header.map((item2, index2) => (
                <td key={index2}>
                    {item2?.key === 'image' ? <img src={item?.image} width='100px' height='50px' /> : getUserType(item[item2?.key])}
                    {currentUser && item[item2?.key] === currentUser?.name && '(you)'}
                </td>
            ))}
            <td style={{ width: '90px' }}>
                <NavLink to={`${item?.id}`}>
                    <Button variant={"primary"} size={"sm"}>
                        <FontAwesomeIcon icon={faEdit} size={"xs"} />
                    </Button>
                </NavLink>
                <span> </span>
                {
                    currentUser.id !== item.id &&
                    <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
                        <FontAwesomeIcon icon={faTrash} size={"xs"} />
                    </Button>
                }
            </td>
        </tr>
    )
    )
    //:::

    //:::
    const dataLoading = ['', ''].map((item, index) => (
        <tr key={index}>
            {
                header.map((item2, index) => <td key={index}>loading...</td>)
            }
            <td style={{ width: '100px' }}>
                <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
                    ...
                </Button>
                <span> </span>
                <a>
                    <Button variant={"primary"} size={"sm"}>
                        ...
                    </Button>
                </a>
            </td>
        </tr>
    )
    )
    //:::

    //:::
    const dataUndefined = <tr colSpan='12'><td>no data</td></tr>
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
                        data.length === 0 && dataLoading
                    }

                    {dataShow}
                </tbody>
            </Table>
            {enableToast &&
                <ToastMsg data={'you have deleted it successfully'} />
            }
        </div>
    )
}

export default TableShow


//    data.length === 0 ? (
//        <tr>
//            <td colSpan={12} style={{textAlign: 'center'}}>Loading....</td>
//        </tr>
//        ) : data.length === 0 ? (
//            <tr>
//                <td colSpan={12} style={{textAlign: 'center'}}>No data found</td>
//            </tr>
//            ) : (dataShow)
//
//}