import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from '../assets/bluewh.webp';
import axios from 'axios';


function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const submit = () => {
        const name = user.name
        const email = user.email
        const password = user.password
        if (name && email && password) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            axios.post("https://venkadesh1999.pythonanywhere.com/register", formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === "success") {
                        alert("Register Success")
                        setUser({ name: "", email: "", password: "" })
                        navigate('/login')
                    }
                })
        }
        else {
            alert("Please fill up")
        }
    }

    return <div style={
        {
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundAttachment: "revert",
            backgroundRepeat: "no-repeat",
            height: "680px",
        }
    }>
        <h1 style={{
            textAlign: "center",
        }}>Register</h1>

        <Container style={
            {
                width: "500PX",
                backgroundColor: "inherit",
                borderRadius: "30px"
            }
        }>
            <Form style={
                {
                    WebkitBackdropFilter: "blur(5px)",
                    backdropFilter: "blur(5px)",
                    marginTop: "50px",
                    padding: "30px",
                    marginRight: "20px",
                }
            }>
                Name
                <Form.Control type="text"
                    value={user.name}
                    style={{ padding: "12px", marginTop: "9px", marginBottom: "12px" }}
                    placeholder="enter your name" onChange={(e) => setUser({ ...user, name: e.target.value.trimStart() })} required ></Form.Control>
                Email
                <Form.Control type="text"
                    style={{ padding: "12px", marginTop: "9px", marginBottom: "12px" }}
                    value={user.email} placeholder="enter your email" onChange={(e) => setUser({ ...user, email: e.target.value.trimStart() })} required ></Form.Control>
                Password
                <Form.Control type="text"
                    style={{ padding: "12px", marginTop: "9px", marginBottom: "12px" }}
                    value={user.password} placeholder="enter your password" onChange={(e) => setUser({ ...user, password: e.target.value.trimStart() })} required ></Form.Control>
                <Button style={
                    {
                        textAlign: "center",
                        marginLeft: "140px",
                        marginTop: "20px"
                    }
                } variant="danger" onClick={submit}>Register</Button>

            </Form>

        </Container>
    </div>

}
export default Register