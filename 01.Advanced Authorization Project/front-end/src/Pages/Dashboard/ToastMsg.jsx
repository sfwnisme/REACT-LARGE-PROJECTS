import {useState} from 'react';
import Toast from 'react-bootstrap/Toast';
console
function ToastMsg({data}) {
    const [show, setShow] = useState(true);
    const toggleShowA = () => setShow(!show);

    return (
        <Toast show={show} onClose={toggleShowA} bg={'danger'} style={{position: 'fixed', top: '1rem', right: '1rem'}}>
            <Toast.Header>
                <small className="me-auto"
                       style={{color: 'red'}}>{data || "Woohoo, you're reading this text in a Toast!"}</small>
            </Toast.Header>
        </Toast>
    );
}

export default ToastMsg;