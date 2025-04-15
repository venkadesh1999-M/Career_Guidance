import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../assets/image12.avif'
import Header from './Header';

function ShowUser() {

    let val = JSON.parse(localStorage.getItem("users"))

    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState("")
    const [goalValue, setGoalValue] = useState("")

    const [userDetails, setuserDetails] = useState({})
    let getVal = { ...userDetails, details: inputValue, goals: goalValue }
    localStorage.setItem("userdetails", JSON.stringify(getVal));

    const getUpdateGoalApi = () => {
        axios.get(`https://venkadesh1999.pythonanywhere.com/get_userdetails/${val.id}`)
            .then((res) => {
                if (res.data.data.data) {
                    const getData = JSON.parse(res.data.data.data);
                    setInputValue(getData);
                }
            })

        axios.get(`https://venkadesh1999.pythonanywhere.com/get_usergoal/${val.id}`)
            .then((res) => {
                if (res.data.data.data) {
                    const getDatas = JSON.parse(res.data.data.data);
                    setGoalValue(getDatas);
                }
            })
    }

    useEffect(() => {
        getUpdateGoalApi();
    }, []);

    const submit = () => {
        alert("Ask Guidance")
        navigate("/careerAi")
    }

    const save = () => {
        navigate("/details")
    }

    const update = () => {
        navigate("/goal")
    }

    return (
        <div style={
            {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "1200px",
            }}>

             <Header/> 

            <h3 style={{ textAlign: "center" }}>My Profile</h3>
            <div>
                <Row>
                    <Col sm="6">
                        <h4 style={{ marginLeft: "40px", marginTop: "20px" }}>Personal Details</h4>
                        <div>
                            <table style={{
                                borderCollapse: "collapse", marginLeft: "80px", marginTop: "20px",
                                borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black",
                                backgroundColor: "inherit", width: "80%", height: "325px"
                            }}>
                                <tbody >
                                    <tr>
                                        <td style={{ padding: "10px" }}>fullname</td>
                                        <td>{inputValue.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>fathername</td>
                                        <td>{inputValue.fathername}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>mothername</td>
                                        <td>{inputValue.mothername}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>gender</td>
                                        <td>{inputValue.gender}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>dob</td>
                                        <td>{inputValue.dob}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>address</td>
                                        <td>{inputValue.address}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>whether_employee</td>
                                        <td>{inputValue.whether_employee}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px" }}>phone</td>
                                        <td>{inputValue.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>

                    <Col sm="6">
                        <div>
                            <h4 style={{ marginTop: "20px" }}>Hobbies & Languages</h4>
                            <div style={{
                                marginLeft: "40px", width: "80%", height: "350px", borderRadius: "1px",
                                boxShadow: "0 0 10px black",
                                backgroundColor: "inherit"
                            }}>
                                <div style={{ marginLeft: "30%", marginTop: "20px", padding: "30px" }}>
                                    <Col sm="3">
                                        <div>
                                            <h4>Hobbies</h4>
                                            <ul style={{ listStyleType: "square" }}>
                                                {inputValue.hobbies?.map((v) => <li>
                                                    {v}
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                    </Col>

                                    <Col sm="3">
                                        <div>
                                            <h4>Language</h4>
                                            <ul style={{ listStyleType: "square" }}>
                                                {inputValue.languageknown?.map((v) => <li>
                                                    {v}
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm="6">
                        <div>
                            <h5 style={{
                                marginTop: "20px", marginLeft: "40px",
                                marginBottom: "20px",
                            }}>Work Experience</h5>
                            <table striped bordered hover style={{
                                marginLeft: "80px", marginTop: "1%", width: "80%",
                                borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black"
                            }}>
                                <thead style={
                                    {
                                        backgroundColor: "grey", color: "white"
                                    }
                                }>
                                    <tr>
                                        <th style={{ padding: "10px" }}>companyName</th>
                                        <th style={{ padding: "10px" }}>courseinstitute</th>
                                        <th style={{ padding: "10px" }}>courseyear</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inputValue.workexperience?.map((workexperience) => (
                                        <tr>
                                            <td style={{ padding: "10px" }}>{workexperience.companyName}</td>
                                            <td style={{ padding: "10px" }}>{workexperience.courseinstitute}</td>
                                            <td style={{ padding: "10px" }}>{workexperience.courseyear}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Col>

                    <Col sm="6">
                        <h5 style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                        }}>Course Details</h5>
                        <table striped bordered hover style={{
                            marginLeft: "40px", marginTop: "1%", width: "80%",
                            boxShadow: "0 0 10px black"
                        }}>
                            <thead style={{ textAlign: "left", fontWeight: "bold", padding: "1px", backgroundColor: "grey", color: "white" }}>
                                <tr >
                                    <th style={{ padding: "10px" }}>coursename</th>
                                    <th style={{ padding: "10px" }}>courseinstitute</th>
                                    <th style={{ padding: "10px" }}>courseyear</th>
                                    <th style={{ padding: "10px" }}>place</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inputValue.educationdetails?.map((educationdetails) => (
                                    <tr>
                                        <td style={{ padding: "10px" }}>{educationdetails.coursename}</td>
                                        <td style={{ padding: "10px" }}>{educationdetails.courseinstitute}</td>
                                        <td style={{ padding: "10px" }}>{educationdetails.courseyear}</td>
                                        <td style={{ padding: "10px" }}>{educationdetails.place}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm="6">
                    <h4 style={{ marginTop: "20px", marginLeft: "40px" }}>Skils & Goals</h4>
                    <div style={
                        {
                            marginLeft: "80px",
                            marginTop: "20px",
                            width: "80%",
                            maxHeight: "350px",
                            borderRadius: "5px 5px 0 0",
                            boxShadow: "0 0 10px black",
                            padding: "10px",
                            height: "80%",
                            backgroundColor: "inherit"
                        }}>
                        <div style={{ marginLeft: "40%", padding: "30px", listStyleType: "square" }}>
                            <h5>Goal</h5>
                            <ul style={{ listStyleType: "square" }} >
                                <li>{goalValue.goal}</li>
                            </ul>
                            <div>
                                <h5>Skills</h5>
                                <ul style={{ listStyleType: "square" }} >
                                    {goalValue.skill?.map((v) => <li>
                                        {v}
                                    </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col sm="6">
                    <div>
                        <h4 style={{ marginTop: "20px" }}>Question:</h4>
                        <div style={{
                            marginLeft: "40px", marginTop: "20px", width: "80%", height: "300px",
                            borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black", backgroundColor: "inherit"
                        }}>
                            {goalValue.questions?.map((v) =>
                                <ul>
                                    <h6 ><li style={{ listStyleType: "none", color: "black", textAlign: "center", marginTop: "20px" }}>
                                        {v.question}
                                    </li></h6>
                                    <li style={{ listStyleType: "none", textAlign: "center" }}>
                                        {v.answer}
                                    </li>
                                </ul>
                            )}
                            <ul>
                                {goalValue.answer?.map((v) => <li>
                                    {v}
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>

            <div style={
                {
                    textAlign: "center",
                    marginTop: "30px"
                }
            } >
                <Button variant="success" onClick={submit}>Ask Guidance</Button>
                <div style={{ marginTop: "20px" }}>
                    <Button style={
                        {
                            marginLeft: "20px"
                        }
                    }
                        variant="dark" onClick={save}>Updateuser</Button>


                    <Button style={
                        {
                            marginLeft: "20px"
                        }
                    }
                        variant="dark" onClick={update}>Updategoal</Button>
                </div>
            </div>
        </div>
    )
}
export default ShowUser;