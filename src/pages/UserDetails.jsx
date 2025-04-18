import { Form, Container, Button, Row, Col,Navbar, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { CIcon } from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import react from '../assets/blue.jpg';
import axios from 'axios'
import Header from './Header';

function UserDetails() {

    let val = JSON.parse(localStorage.getItem("users"))
    const navigate = useNavigate()
    const [isUpdated, setupdated] = useState(false)
    const [languageknownValue, setlanguageknownValue] = useState([]);
    const [hobbiesValue, setHobbiesValue] = useState([]);
    const [workExp_Value, setWorkExp_Value] = useState({
        companyName: "",
        courseinstitute: "",
        courseyear: ""
    });

    const [courseValue, setCourseValue] = useState({
        coursename: "",
        courseinstitute: "",
        courseyear: "",
        place: ""
    });

    useEffect(() => {
        getUsersdetailsapi()
        setupdated(false);
    }, [])

    const [userInputValue, setuserInputValue] = useState(
        {
            fullname: "",
            fathername: "",
            mothername: "",
            gender: "",
            dob: "",
            address: "",
            languageknown: [],
            hobbies: [],
            educationdetails: [],
            workexperience: [],
            whether_employee: "",
            phone: "",
        }
    );

    const submitBtn = () => {
        if (userInputValue.fullname == "" ||
            userInputValue.fathername == "" ||
            userInputValue.mothername == "" ||
            userInputValue.gender == "" ||
            userInputValue.dob == "" ||
            userInputValue.address == "" ||
            userInputValue.phone == "") {
            alert("please enter the value")
        }
        else {
            alert("Submitted Successfully")
            const formData = new FormData();
            formData.append("user_id", val.id);
            formData.append("data", JSON.stringify(userInputValue))
            const headers = {'Authorization' : `Bearer ${val.token}`}
            axios.post('https://venkadesh1999.pythonanywhere.com/user_details', formData,{headers}).then((res) => {
            });
            navigate("/goal")
        }
    }

    const updateBtn = () => {
        alert("Updated Successfully")
        const formData = new FormData();
        formData.append("user_id", val.id);
        formData.append("data", JSON.stringify(userInputValue))
        const headers = {'Authorization' : `Bearer ${val.token}`}

        axios.post('https://venkadesh1999.pythonanywhere.com/user_details', formData,{headers}).then((res) => {
            console.log(res)
        });
        navigate("/show")
    }

    const getUsersdetailsapi = () => {
        const headers = {'Authorization' : `Bearer ${val.token}`}

        axios.get(`https://venkadesh1999.pythonanywhere.com/get_userdetails/${val.id}`,{headers})
        .then((res) => {
            let getData = res.data.data.data
            if (getData !== "") {
                setuserInputValue(JSON.parse(getData));
                setupdated(true);
            } else {
                setupdated(false);
            }
        })

    }

    const addLanguage = () => {
        if (languageknownValue == "") {
            alert("please enter the value")
        } else {
            let y = [...userInputValue?.languageknown, languageknownValue]
            setuserInputValue({ ...userInputValue, languageknown: y })
            setlanguageknownValue("")
        }
    }

    const addhobbies = () => {
        if (hobbiesValue == "") {
            alert("please enter the value")
        } else {

            let y = [...userInputValue?.hobbies, hobbiesValue]
            setuserInputValue({ ...userInputValue, hobbies: y })
            setHobbiesValue("")
        }
    }

    const addWork_exp = () => {
        if (workExp_Value.companyName == "" || workExp_Value.courseinstitute == "" || workExp_Value.courseyear == "") {
            alert("please enter the value")
        }
        else {
            let y = [...userInputValue?.workexperience, workExp_Value]
            setuserInputValue({ ...userInputValue, workexperience: y })
            setWorkExp_Value({ companyName: "", courseinstitute: "", courseyear: "" })
        }
    }


    const addCourseBtn = () => {
        if (courseValue.coursename == "" || courseValue.courseinstitute == "" || courseValue.courseyear == "" || courseValue.place == "") {
            alert("please enter the value")
        } else {
            let y = [...userInputValue?.educationdetails, courseValue]
            setuserInputValue({ ...userInputValue, educationdetails: y })
            setCourseValue({ coursename: "", courseinstitute: "", courseyear: "", place: "" })
        }
    }

    const deleteLanguage = (v) => {
        alert("Do you want to delete?")
        let del = userInputValue.languageknown.filter((items) => items != v)
        setuserInputValue({ ...userInputValue, languageknown: del })
    }

    const deletehobbies = ((v) => {
        alert("Do you want to delete?")
        let del = userInputValue.hobbies.filter((items) => items != v)
        setuserInputValue({ ...userInputValue, hobbies: del })
    })

    const deleteWorkExp = ((v) => {
        alert("Do you want to delete?")
        let del = userInputValue.workexperience.filter((items) => items != v)
        setuserInputValue({ ...userInputValue, workexperience: del })
    })

    const deletecourse = ((v) => {
        alert("Do you want to delete?")
        let del = userInputValue.educationdetails.filter((items) => items != v)
        setuserInputValue({ ...userInputValue, educationdetails: del })
    })

    return <div style={
        {
            backgroundImage: `url(${react})`,
            backgroundSize: "cover",
            backgroundAttachment: "revert",
            backgroundRepeat: "no-repeat",
            height: "1200px",
        }
    }>
       <Header />
        <Container>
            <Form style={
                {
                    backgroundColor: "rgba(255, 255, 255, 0.23)",
                    WebkitBackdropFilter: "blur(5px)",
                    backdropFilter: "blur(5px)",
                    marginTop: "20px",
                    padding: "30px",
                    borderRadius: "45px",
                    marginRight: "20px",
                    boxShadow: "6px 8px rgb(11, 161, 247)"
                }
            }>
                <Row>
                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3"   >
                            <Form.Label column sm="3">
                                <h5>Full Name</h5>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "1px solid black",
                                        color: "white"
                                    }}
                                    type="text"
                                    required
                                    value={userInputValue.fullname}
                                    onChange={(e) => setuserInputValue({ ...userInputValue, fullname: e.target.value.trimStart() })}
                                    placeholder="Enter full Name"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3"   >
                            <Form.Label column sm="3">
                                <h5>Father Name</h5>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "1px solid black",
                                        color: "white"
                                    }}
                                    type="text"
                                    value={userInputValue.fathername}
                                    onChange={(e) => setuserInputValue({ ...userInputValue, fathername: e.target.value.trimStart() })}
                                    placeholder="Enter Father Name"
                                    required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3"   >
                            <Form.Label column sm="3">
                                <h5>Mother Name</h5>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "1px solid black",
                                        color: "white"
                                    }}
                                    type="text"
                                    value={userInputValue.mothername}
                                    onChange={(e) => setuserInputValue({ ...userInputValue, mothername: e.target.value.trimStart() })}
                                    placeholder="Enter Mother Name"
                                    required />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-4">
                            <Row>
                                <Form.Label column sm="3">
                                    <h5>Gender</h5>
                                </Form.Label>
                                <Col sm="2" className="mt-2">
                                    <Form.Check type="radio"
                                        label="Male"
                                        value="male"
                                        checked={userInputValue.gender == "male"}
                                        onChange={(e) => setuserInputValue({ ...userInputValue, gender: e.target.value })}
                                    />
                                </Col>
                                <Col sm="2" className="mt-2">
                                    <Form.Check type="radio"
                                        label="Female"
                                        value="female"
                                        checked={userInputValue.gender == "female"}
                                        onChange={(e) => setuserInputValue({ ...userInputValue, gender: e.target.value })} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4"   >
                            <Form.Label column sm="3">
                                <h5>DOB</h5>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type='date'
                                    onChange={(e) => setuserInputValue({ ...userInputValue, dob: e.target.value })}
                                    value={userInputValue.dob}
                                    style={{

                                        backgroundColor: "inherit",
                                        border: "1px solid black", color: "whitesmoke"
                                    }}
                                    placeholder="Enter full Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3"   >
                            <Form.Label column sm="3">
                                <h5>Address</h5>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="textarea"
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "1px solid black",
                                        color: "white",
                                        height: "70px"
                                    }}
                                    onChange={(e) => setuserInputValue({ ...userInputValue, address: e.target.value.trimStart() })}
                                    value={userInputValue.address}
                                    placeholder="Leave a comment here"
                                    required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Row>
                                <Form.Label column sm="3">
                                    <h5>Hobbies</h5>
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setHobbiesValue(e.target.value.trimStart())}
                                        value={hobbiesValue}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black", color: "white"
                                        }}
                                        placeholder="Hobbies"
                                        required />

                                    <ul style={{ marginTop: "10px" }}>
                                        {userInputValue.hobbies?.map((v) =>
                                            <li>{v}<CloseButton
                                                onClick={() => deletehobbies(v)}
                                                style={
                                                    {
                                                        fontSize: "12px",
                                                        marginLeft: "10px",
                                                        backgroundColor: "Background"
                                                    }
                                                } />
                                            </li>)}
                                    </ul>
                                </Col>

                                <Col sm="4">
                                    <Button
                                        onClick={addhobbies}
                                        style={{
                                            backgroundColor: "inherit",
                                            color: "black",
                                            border: "1px solid black"
                                        }}>
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Row>
                                <Form.Label column sm="3">
                                    <h5>Language</h5>
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setlanguageknownValue(e.target.value.trimStart())}
                                        value={languageknownValue}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black", color: "white"
                                        }}
                                        placeholder="Language"
                                        required />

                                    <ul style={{ marginTop: "10px" }}>
                                        {userInputValue.languageknown?.map((v) =>
                                            <li>{v}<CloseButton
                                                onClick={() => deleteLanguage(v)}
                                                style={
                                                    {
                                                        fontSize: "12px",
                                                        marginLeft: "10px",
                                                        backgroundColor: "Background"
                                                    }
                                                } />
                                            </li>)}
                                    </ul>

                                </Col>
                                <Col sm="4">
                                    <Button
                                        onClick={addLanguage}
                                        style={{
                                            backgroundColor: "inherit",
                                            color: "black",
                                            border: "1px solid black"
                                        }}>
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Row>
                                <Form.Label column sm="4">
                                    <h5>whether employee</h5>
                                </Form.Label>
                                <Col sm="2" className="mt-2">
                                    <Form.Check type="radio"
                                        label="Yes"
                                        value="yes"
                                        checked={userInputValue.whether_employee == "yes"}
                                        onChange={(e) => setuserInputValue({ ...userInputValue, whether_employee: e.target.value })}
                                    />
                                </Col>
                                <Col sm="2" className="mt-2">
                                    <Form.Check type="radio"
                                        label="No"
                                        value="no"
                                        checked={userInputValue.whether_employee == "no"}
                                        onChange={(e) => setuserInputValue({ ...userInputValue, whether_employee: e.target.value })}
                                    />

                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-3"   >
                            <Form.Label column sm="3">
                                <h5>Contact Number</h5>
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    type="number"
                                    value={userInputValue.phone}
                                    onChange={(e) => setuserInputValue({ ...userInputValue, phone: e.target.value.trimStart() })}
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "1px solid black",
                                        color: "white"
                                    }}
                                    placeholder="Contact Number"
                                    required />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                <h5>Work Experience</h5>
                            </Form.Label>
                            <Row style={{ marginTop: "15px" }}>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            Company Name
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        value={workExp_Value.companyName}
                                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, companyName: e.target.value.trimStart() })}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black",
                                            color: "white"
                                        }}
                                        placeholder="Company Name"
                                        required />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                           Designation
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        value={workExp_Value.courseinstitute}
                                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, courseinstitute: e.target.value.trimStart() })}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black",
                                            color: "white"
                                        }}
                                        placeholder="Designation"
                                        required />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            year.Of.Exp
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        onChange={(e) => setWorkExp_Value({ ...workExp_Value, courseyear: e.target.value.trimStart() })}
                                        type="number"
                                        value={workExp_Value.courseyear}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black",
                                            color: "white"
                                        }}
                                        placeholder="year"
                                        required />
                                </Col>
                            </Row>

                            <Col sm="3">
                                <Button
                                    onClick={addWork_exp}
                                    style={{
                                        backgroundColor: "inherit",
                                        color: "black",
                                        border: "1px solid black",
                                        marginLeft: "18px"
                                    }}>
                                    Add
                                </Button>
                            </Col>
                            <Table striped="columns" bordered hover style={{ marginTop: "20px", borderRadius: "10px", backgroundColor: "inherit" }}>
                                <thead style={{ backgroundColor: "inherit" }}>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Company Name</th>
                                        <th>Institute name</th>
                                        <th>year.of.Exp</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userInputValue.workexperience?.map((v, i) => <tr>
                                        <td>{i + 1}</td>
                                        <td>{v.companyName}</td>
                                        <td>{v.courseinstitute}</td>
                                        <td>{v.courseyear}</td>
                                        <td><CIcon icon={cilTrash} onClick={() => deleteWorkExp(v)} size="sm" style={{ width: "30px", marginLeft: "9px" }} /></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                <h5>Course details</h5>
                            </Form.Label>
                            <Row style={{ marginTop: "15px" }}>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            Course Name
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        value={courseValue.coursename}
                                        onChange={(e) => setCourseValue({ ...courseValue, coursename: e.target.value.trimStart() })}
                                        style={{
                                            backgroundColor: "inherit",
                                            border: "1px solid black",
                                            color: "white"
                                        }}
                                        placeholder="Course Name"
                                        required />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            Institude Name
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        value={courseValue.courseinstitute}
                                        onChange={(e) => setCourseValue({ ...courseValue, courseinstitute: e.target.value.trimStart() })}
                                        style={
                                            {
                                                backgroundColor: "inherit",
                                                border: "1px solid black",
                                                color: "white"
                                            }
                                        }
                                        placeholder="Institute Name"
                                        required />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            courseyear
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        type="number"
                                        value={courseValue.courseyear}
                                        onChange={(e) => setCourseValue({ ...courseValue, courseyear: e.target.value.trimStart() })}
                                        style={
                                            {
                                                backgroundColor: "inherit",
                                                border: "1px solid black",
                                                color: "white"
                                            }
                                        }
                                        placeholder="year"
                                        required />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="4">
                                    <p>
                                        <Form.Label style={{ marginTop: "10px", marginLeft: "20px" }}>
                                            Place
                                        </Form.Label>
                                    </p>
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        type="text"
                                        value={courseValue.place}
                                        onChange={(e) => setCourseValue({ ...courseValue, place: e.target.value.trimStart() })}
                                        style={
                                            {
                                                backgroundColor: "inherit",
                                                border: "1px solid black",
                                                color: "white"
                                            }
                                        }
                                        placeholder="place"
                                        required />

                                </Col>
                            </Row>

                            <Col sm="3">
                                <Button
                                    onClick={addCourseBtn}
                                    style={{
                                        backgroundColor: "inherit",
                                        color: "black",
                                        border: "1px solid black",
                                        marginLeft: "18px"
                                    }}>
                                    Add
                                </Button>
                            </Col>

                            <Table striped="columns" bordered hover style={{ marginTop: "20px", borderRadius: "20px", backgroundColor: "inherit" }}>
                                <thead >
                                    <tr>
                                        <th>S.No</th>
                                        <th>Company Name</th>
                                        <th>Designation</th>
                                        <th>year.of.Exp</th>
                                        <th>Place</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userInputValue.educationdetails?.map((v, i) => <tr>
                                        <td key={i}>{i + 1}</td>
                                        <td>{v.coursename}</td>
                                        <td>{v.courseinstitute}</td>
                                        <td>{v.courseyear}</td>
                                        <td>{v.place}</td>
                                        <td><CIcon icon={cilTrash} onClick={() => deletecourse(v)} size="sm" style={{ width: "30px", marginLeft: "9px" }} /></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </Form.Group>
                    </Col>
                </Row>

                {isUpdated ? <Button variant="primary"
                    onClick={updateBtn}
                    style={{
                        padding: "10px",
                        width: "120px",
                        textAlign: "center",
                        marginTop: "5px"
                    }}>
                    update
                </Button> :
                    <Button variant="primary"
                        onClick={submitBtn}
                        style={{
                            padding: "10px",
                            width: "120px",
                            textAlign: "center",
                            marginTop: "5px"
                        }}>
                        Submit
                    </Button>}
             </Form>
        </Container>
    </div>
}

export default UserDetails