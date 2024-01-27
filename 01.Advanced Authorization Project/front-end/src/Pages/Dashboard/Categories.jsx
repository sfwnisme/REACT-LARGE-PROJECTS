import TableShow from "../../Components/TableShow.jsx";
import {useEffect, useState} from "react";
import {AXIOS} from "../../Api/AXIOS.JSX";
import {CAT} from "../../Api/API.jsx";
import Cookie from "cookie-universal";

const Categories = () => {
    const [cat, steCat] = useState([])

    useEffect(() => {
        AXIOS
            .get(`/${CAT}`)
            .then((data) => {
                console.log(':::get categories done:::', data)
            })
    }, [])

    return (
        <div>
            {/*<TableShow header={header} data={cat}/>*/}
        </div>
    )
}

export default Categories