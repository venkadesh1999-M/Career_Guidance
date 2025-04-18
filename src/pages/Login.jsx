import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import image from '../assets/image.jpg'
import { useSelector, useDispatch } from 'react-redux';
import {setLoginUsers} from '../redux/slices/login'

function Login() {
    const careerGlobalState = useSelector((state) => state.login.loginUsers)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })

    const Save = () => {
        const formData = new FormData();
        formData.append("email", loginDetails.email);
        formData.append("password", loginDetails.password); 

        axios.post('https://venkadesh1999.pythonanywhere.com/login', formData).then((res) => {
            if (loginDetails.email && loginDetails.password) {
                if (res.data.status === "success") {
                    alert("Login Successfull")
                    dispatch(setLoginUsers(res.data.data))     
                    localStorage.setItem("users", JSON.stringify(res.data.data));        
                    navigate('/details')
                }
                else {
                    alert("Not registered")
                    navigate('/register')
                }
            }
            else {
                alert("please fill up")
            }

        });
    }

    return <div style={
        {
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "750px",
        }
    }>

        <h1 style={{ textAlign: "center" }}>Login</h1>

        <div style={{
            backgroundColor: "rgba(163, 24, 91, 0.27)",
            width: "500px",
            marginRight: "350px",
            borderRadius: "15px",
            marginLeft: "500px",
            marginTop: "60px",
            background: "transparent",
            boxShadow: "0 0 10px"
        }}>
            <Form style={{ padding: "45px" }}>
                Email:
                <Form.Control type="email" placeholder="Enter mail Id"  style={{ marginTop: "10px", marginBottom: "16px" }} value={loginDetails.email} onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} />
                Password:
                <Form.Control type="password"  style={{marginTop: "10px",marginBottom: "16px"}}placeholder="Enter password" value={loginDetails.password} onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} />
                <Button variant="success"  style={{ textAlign: "center", marginLeft: "170px", marginTop: "20px" }} onClick={Save}>Save</Button>
            </Form>
        </div>
    </div>
}

export default Login


