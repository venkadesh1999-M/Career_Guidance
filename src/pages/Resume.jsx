import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';
import image from '../assets/orange.jpg';
import { useNavigate } from 'react-router';
import Header from './Header';

function Resume() {
    let user = JSON.parse(localStorage.getItem("users"))
    const navigate = useNavigate()
    const [skillValue, setSkillValue] = useState([])
    const [languageknownValue, setlanguageknownValue] = useState([])
    const [hobbiesValue, setHobbiesValue] = useState([])
    const [courseValue, setCourseValue] = useState({
        coursename: "",
        courseinstitute: "",
        courseyear: "",
        place: ""
    })

    const [workExp_Value, setWorkExp_Value] = useState({
        companyName: "",
        role: "",
        year: "",
        place: ""
    })

    const [project, setProject] = useState({
        project_title: "",
        project_description: ""
    })

    const [certification, setCertification] = useState({
        certification_name: "",
        institute: "",
        duration: "",
        place: ""
    })

    const [inputValue, setInputValue] = useState({
        fullname: "",
        email: "",
        objective: "",
        fathername: "",
        mothername: "",
        gender: "",
        dob: "",
        address: "",
        nationality: "",
        languageknown: [],
        skills: [],
        hobbies: [],
        educationdetails: [],
        certification: [],
        workexperience: [],
        project: [],
        marital_status: "",
        phone: ""
    })

    useEffect(() => {
        getResumeApi()
    }, [])

    const addlanguageValue = () => {
        let b = [...inputValue?.languageknown, languageknownValue]
        console.log(b)
        setInputValue({ ...inputValue, languageknown: b })
        setlanguageknownValue("")
    }
    const deletelanguage = (v) => {
        let del = inputValue.languageknown.filter((items) => items != v)
        setInputValue({ ...inputValue, languageknown: del })
    }

    const addskillValue = () => {
        let b = inputValue?.skills ? [...inputValue?.skills, skillValue]: [skillValue]
        setInputValue({ ...inputValue, skills: b })
        setSkillValue("")
    }
    const deleteskill = (v) => {
        let del = inputValue.skills.filter((items) => items != v)
        setInputValue({ ...inputValue, skills: del })
    }

    const addhobbiesValue = () => {
        let b = [...inputValue?.hobbies, hobbiesValue]
        setInputValue({ ...inputValue, hobbies: b })
        setHobbiesValue("")
    }
    const deletehobbies = (v) => {
        let del = inputValue.hobbies.filter((items) => items != v)
        setInputValue({ ...inputValue, hobbies: del })
    }

    const addcourseValue = () => {
        let b = [...inputValue?.educationdetails, courseValue]
        setInputValue({ ...inputValue, educationdetails: b })
        setCourseValue({
            coursename: "",
            courseinstitute: "",
            courseyear: "",
            place: ""
        })
    }
    const deleteEdu = (v) => {
        let del = inputValue.educationdetails.filter((items) => items != v)
        setInputValue({ ...inputValue, educationdetails: del })
    }

    const addcertification = () => {
        let b = inputValue?.certification ?[...inputValue?.certification,certification]:[certification]
        setInputValue({ ...inputValue, certification: b })
        setCertification({
            certification_name: "",
            institute: "",
            duration: "",
            place: ""
        })
    }
    const deletecertification = (v) => {
        let del = inputValue.certification.filter((items) => items != v)
        setInputValue({ ...inputValue, certification: del })
    }

    const addworkexperience = () => {
        let b = [...inputValue?.workexperience, workExp_Value]
        setInputValue({ ...inputValue, workexperience: b })
        setWorkExp_Value({
            companyName: "",
            courseinstitute: "",
            courseyear: "",
        })
    }
    const deletework = (v) => {
        let del = inputValue.workexperience.filter((items) => items != v)
        setInputValue({ ...inputValue, workexperience: del })
    }

    const addproject = () => {
        let b = inputValue?.project?[...inputValue?.project, project]:[project]
        setInputValue({ ...inputValue, project: b })
        setProject({
            project_title: "",
            project_description: ""
        })
    }
    const deleteproject = (v) => {
        let del = inputValue.project.filter((items) => items != v)
        setInputValue({ ...inputValue, project: del })
    }

    const submit = () => {
        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("data", JSON.stringify(inputValue));

        axios.post('https://venkadesh1999.pythonanywhere.com/resume', formData).then((res) => {
            console.log(res)
        })
        alert("submit")
        navigate("/quiz")
    }

    const getResumeApi = () => {
        axios.get(`https://venkadesh1999.pythonanywhere.com/get_resume/${user.id}`).then((res) => {
            let getData = JSON.parse(res.data.data.data)
            let v = {...inputValue,...getData}
            console.log(v)
            setInputValue(v)
        });
    };

    const getUserDetails = () => {
        axios.get(`https://venkadesh1999.pythonanywhere.com/get_userdetails/${user.id}`)
        .then((res) => {
            const getData = res.data.data.data
            setInputValue(JSON.parse(getData));
        })
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundAttachment: "revert",
        backgroundRepeat: "no-repeat",
        height: "2250px",
    }}>
                     <Header/> 
        <h1 style={{ textAlign: "center", color: "white" }}><i>Resume</i></h1>
        <Container>
            <Row>
                <Col sm="6">

                    <h3 style={{
                        marginTop: "20px",
                        marginBottom: "5px", width: "400px", marginLeft: "100px", color: "white"
                    }}><i>Name</i></h3>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={inputValue.fullname} placeholder='enter your name'
                        onChange={(e) => setInputValue({ ...inputValue, fullname: e.target.value })} />

                    <h3 style={{
                        marginTop: "8px",
                        marginBottom: "5px", width: "400px", marginLeft: "100px", color: "white"
                    }}><i>Email</i></h3>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="email" value={inputValue.email} placeholder='enter your email'
                        onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })} />


                    <h3 style={{
                        marginTop: "8px",
                        marginBottom: "5px", width: "400px", marginLeft: "100px", color: "white"
                    }}><i>Objective</i></h3>
                    <Form.Control style={{ width: "400px",height:"70px", marginLeft: "100px" }} type="objective" value={inputValue.objective} placeholder='enter your objective'
                        onChange={(e) => setInputValue({ ...inputValue, objective: e.target.value })} />

                <h4 style={{
                        marginTop: "20px",
                        marginBottom: "10px",  width: "400px", marginLeft: "100px", color: "white"
                    }}><i>Language</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }}
                        type="text"
                        value={languageknownValue} placeholder="Enter language" onChange={(e) => setlanguageknownValue(e.target.value)} />
                    <ul>
                        <Button style={{ marginLeft: "100px" }} onClick={addlanguageValue} variant='warning' >+</Button>
                        {inputValue.languageknown?.map((v) =>
                            <li style={{ width: "400px", marginLeft: "100px" , color:"white"}}><i>{v}</i>
                                <td ><Button variant='danger' onClick={() => deletelanguage(v)}>x</Button></td>
                            </li>
                        )}
                    </ul>

                    <h4 style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>Skills</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }}
                        type="text"
                        value={skillValue} placeholder="Enter skill" onChange={(e) => setSkillValue(e.target.value)} />
                    <ul>
                        <Button style={{ marginLeft: "100px" }} onClick={addskillValue} variant='warning' >+</Button>

                        {inputValue.skills?.map((v) =>
                            <li style={{ width: "400px", marginLeft: "100px", color:"white" }}><i>{v}</i>
                                <td><Button variant='danger' onClick={() => deleteskill(v)}>x</Button></td>
                            </li>   
                        )}
                    </ul>

                    <h4 style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>Hobbies</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }}
                        type="text"
                        value={hobbiesValue} placeholder="Enter hobbies" onChange={(e) => setHobbiesValue(e.target.value)} />
                    <ul>
                        <Button style={{ marginLeft: "100px" }} onClick={addhobbiesValue} variant='warning' >+</Button>
                        {inputValue.hobbies?.map((v) =>
                            <li style={{ width: "400px", marginLeft: "100px", color:"white" }}><i>{v}</i>
                                <td><Button variant='danger' onClick={() => deletehobbies(v)}>x</Button></td>
                            </li>
                        )}
                    </ul>
                   
                </Col>

                <Col sm="5">
                <h1 style={{
                        marginTop: "20px",
                        marginBottom: "10px", marginLeft: "100px", color: "white"
                    }}><i>Personal details:</i></h1>

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Fathername</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={inputValue.fathername} placeholder='enter your fathername'
                        onChange={(e) => setInputValue({ ...inputValue, fathername: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Mothername</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={inputValue.mothername} placeholder='enter your mothername'
                        onChange={(e) => setInputValue({ ...inputValue, mothername: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Address</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={inputValue.address} placeholder='enter your address'
                        onChange={(e) => setInputValue({ ...inputValue, address: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>DOB</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="date" value={inputValue.dob} placeholder='enter your dob'
                        onChange={(e) => setInputValue({ ...inputValue, dob: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Gender</i></h4>

                    <Form.Check style={{ marginLeft: "100px", color: "white" }} inline type="radio" label="Male" value="male" checked={inputValue.gender === "male"}
                        onChange={(e) => setInputValue({ ...inputValue, gender: e.target.value })} />
                    <Form.Check style={{ width: "400px", marginLeft: "100px", color: "white" }} inline type="radio" label="Female" value="female" checked={inputValue.gender === "female"}
                        onChange={(e) => setInputValue({ ...inputValue, gender: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Maritial Status</i> </h4>
                    <Form.Check style={{ marginLeft: "100px", color: "white" }} inline type="radio" label="Married" value="married"
                        checked={inputValue.marital_status === "married"}
                        onChange={(e) => setInputValue({ ...inputValue, marital_status: e.target.value })} />
                    <Form.Check style={{ width: "400px", marginLeft: "100px", color: "white" }} inline type="radio" label="unmarried" value="unmarried"
                        checked={inputValue.marital_status === "unmarried"}
                        onChange={(e) => setInputValue({ ...inputValue, marital_status: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Nationality</i></h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={inputValue.nationality} placeholder='enter nationality'
                        onChange={(e) => setInputValue({ ...inputValue, nationality: e.target.value })} />

                    <h4 style={{ width: "400px", marginLeft: "100px", marginTop: "8px", color: "white" }}><i>Contact Number</i> </h4>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="number" value={inputValue.phone} placeholder='enter your contact'
                        onChange={(e) => setInputValue({ ...inputValue, phone: e.target.value })} />
                   
                </Col>
            </Row>

            <Row>   
                <Col sm="6">
                    <h3 style={{
                        marginTop: "20px",
                        marginBottom: "10px",  width: "400px", marginLeft: "100px", color: "white"
                    }}><i>Education</i></h3>
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>CourseName</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={courseValue.coursename} placeholder="Enter CourseName"
                        onChange={(e) => setCourseValue({ ...courseValue, coursename: e.target.value })} />
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>CourseInstitute</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={courseValue.courseinstitute} placeholder="Enter CourseName"
                        onChange={(e) => setCourseValue({ ...courseValue, courseinstitute: e.target.value })} />
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>Year</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="number" value={courseValue.courseyear} placeholder="Enter year"
                        onChange={(e) => setCourseValue({ ...courseValue, courseyear: e.target.value })} />
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>Place</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={courseValue.place} placeholder="Enter Place"
                        onChange={(e) => setCourseValue({ ...courseValue, place: e.target.value })} />

                    <Button style={{ marginLeft: "100px" }} onClick={addcourseValue} variant='warning'>+</Button>

                    <table striped bordered cover style={{
                        borderCollapse: "collapse", marginTop: "20px",
                        borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black",
                        backgroundColor: "lavender", height: "120px", width: "400px", marginLeft: "100px"
                    }}>
                        <thead style={{ backgroundColor: "grey", height: "40px",color:"white" }}>
                            <tr>
                                <th style={{ padding: "10px" }}><i>coursename</i></th>
                                <th style={{ padding: "10px" }}><i>institute</i></th>
                                <th style={{ padding: "10px" }}><i>year</i></th>
                                <th style={{ padding: "10px" }}><i>place</i></th>
                                <th style={{ padding: "10px" }}><i>Action</i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputValue.educationdetails?.map((v) =>
                                <tr>
                                    <td style={{ padding: "10px" }}><i>{v.coursename}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.courseinstitute}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.courseyear}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.place}</i></td>
                                    <td style={{ padding: "10px" }}><Button variant='dark' onClick={() => deleteEdu(v)}>x</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>

                <Col sm="4">
                    <h3 style={{
                        marginTop: "20px",
                        marginBottom: "10px", marginLeft: "100px", color: "white"
                    }}><i>Certification</i></h3>
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>coursename</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={certification.certification_name} placeholder="Enter CourseName"
                        onChange={(e) => setCertification({ ...certification, certification_name: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>institute</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={certification.institute} placeholder="Enter institute"
                        onChange={(e) => setCertification({ ...certification, institute: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>duration</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={certification.duration} placeholder="Enter duration"
                        onChange={(e) => setCertification({ ...certification, duration: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>place</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={certification.place} placeholder="Enter place"
                        onChange={(e) => setCertification({ ...certification, place: e.target.value })} />

                    <Button style={{ marginLeft: "100px" }} onClick={addcertification} variant='warning' >+</Button>

                    <table striped bordered cover style={{
                        borderCollapse: "collapse", marginLeft: "100px", marginTop: "20px",
                        borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black",
                        backgroundColor: "lavender", width: "400px"
                    }}>
                        <thead style={{ backgroundColor: "grey", height: "40px",color:"white" }}>
                            <tr>
                                <th style={{ padding: "10px" }}><i>name</i></th>
                                <th style={{ padding: "10px" }}><i>institute</i></th>
                                <th style={{ padding: "10px" }}><i>duration</i></th>
                                <th style={{ padding: "10px" }}><i>place</i></th>
                                <th style={{ padding: "10px" }}><i>Action</i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputValue.certification?.map((v) =>
                                <tr>
                                    <td style={{ padding: "10px" }}><i>{v.certification_name}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.institute}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.duration}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.place}</i></td>
                                    <td style={{ padding: "10px" }}><Button variant='dark' onClick={() => deletecertification(v)}>x</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>

                <Col sm="6">
                    <h3 style={{
                        marginTop: "20px",
                        marginBottom: "10px", marginLeft: "100px", width: "400px", color: "white"
                    }}><i>WorkExperience</i></h3>
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>CompanyName</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={workExp_Value.companyName} placeholder="Enter CompanyName"
                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, companyName: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>role</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={workExp_Value.courseinstitute} placeholder="Enter role"
                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, courseinstitute: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>year</i></Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="number" value={workExp_Value.courseyear} placeholder="Enter year"
                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, courseyear: e.target.value })} />

                    <Button style={{ marginLeft: "100px" }} onClick={addworkexperience} variant='warning' >+</Button>
                    <table striped bordered cover style={{
                        borderCollapse: "collapse", marginLeft: "100px", marginTop: "20px",
                        borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black",
                        backgroundColor: "lavender", width: "400px"
                    }} >
                        <thead style={{ backgroundColor: "grey", height: "40px",color:"white" }}>
                            <tr>
                                <th style={{ padding: "10px" }}><i>companyName</i></th>
                                <th style={{ padding: "10px" }}><i>role</i></th>
                                <th style={{ padding: "10px" }}><i>year</i></th>
                                <th style={{ padding: "10px" }}><i>Action</i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputValue.workexperience?.map((v) =>
                                <tr>
                                    <td style={{ padding: "10px" }}><i>{v.companyName}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.courseinstitute}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.courseyear}</i></td>
                                    <td style={{ padding: "10px" }}><Button variant='dark' onClick={() => deletework(v)}>x</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>

                <Col sm="4">
                    <h3 style={{
                        marginTop: "20px",
                        marginBottom: "10px", marginLeft: "100px", width: "400px", color: "white"
                    }}><i>Project</i></h3>
                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>project title</i> </Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={project.project_title} placeholder="Enter project title"
                        onChange={(e) => setProject({ ...project, project_title: e.target.value })} />

                    <Form.Label style={{ width: "400px", marginLeft: "100px", color: "white" }}><i>project description</i> </Form.Label>
                    <Form.Control style={{ width: "400px", marginLeft: "100px" }} type="text" value={project.project_description} placeholder="Enter project description"
                        onChange={(e) => setProject({ ...project, project_description: e.target.value })} />

                    <Button style={{ marginLeft: "100px" }} onClick={addproject} variant='warning' >+</Button>
                    <table striped bordered cover style={{
                        borderCollapse: "collapse", marginLeft: "100px", marginTop: "20px",
                        borderRadius: "5px 5px 0 0", boxShadow: "0 0 10px black",
                        backgroundColor: "lavender", width: "400px"
                    }} >
                        <thead style={{ backgroundColor: "grey", height: "40px",color:"white" }}>
                            <tr>
                                <th style={{ padding: "10px" }}><i>tiltle</i></th>
                                <th style={{ padding: "10px" }}><i>description</i></th>
                                <th style={{ padding: "10px" }}><i>Action</i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputValue.project?.map((v) =>
                                <tr>
                                    <td style={{ padding: "10px" }}><i>{v.project_title}</i></td>
                                    <td style={{ padding: "10px" }}><i>{v.project_description}</i></td>
                                    <td style={{ padding: "10px" }}><Button variant='dark' onClick={() => deleteproject(v)}>x</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
            </Row>

            <div style={
                {
                    textAlign: "center",
                    marginTop: "30px",
                    marginLeft: "50%"
                }
            }>
                <td><Button variant='danger' onClick={submit}style={{padding:"10px",width:"100px"}}>submit</Button></td>
            </div>

        </Container>
    </div>
}
export default Resume