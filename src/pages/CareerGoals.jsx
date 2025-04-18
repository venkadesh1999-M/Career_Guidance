import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';
import image from '../assets/goal.jpg'
import { IoAddOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from 'react-router';
import Header from './Header';

function CareerGoals() {
    let user = JSON.parse(localStorage.getItem("users"));
    const [inputValue, setInputValue] = useState("")
    const [userDetails, setuserDetails] = useState({})
    let getVal = { ...userDetails, details: inputValue};    
    const navigate = useNavigate()
    const [goalsQues, setgoalsQues] = useState([
        {
            question: "what is your preferred work location?",
            answer: ""
        },
        {
            question: "what relevant certification do you hold?",
            answer: ""
        },
        {
            question: "Get a job within?",
            answer: ""
        },
        {
            question: "What is your salary range expectation?",
            answer: ""
        }
    ])

    const [skillDetails, setSkillDetails] = useState([])
    const [goalsDetails, setGoalDetails] = useState({
        goal: "",
        skill: [],
        questions: [],
    })

    useEffect(() => {
        getgoalDetailsApi()
    }, [])


    const addskill = () => {
        if (skillDetails == "") {
            alert("Please enter the value")

        }
        else {
            setSkillDetails("")
            let value = [skillDetails]
            let skills = [...goalsDetails.skill, ...value]
            setGoalDetails({ ...goalsDetails, skill: skills })
        }
    }

    const deleteBtn = (v) => {
        alert("Do you want to delete?")
        let del = goalsDetails.skill.filter((items) => items != v)
        setGoalDetails({ ...goalsDetails, skill: del })
    }

    const handleQuestion = (index, value) => {
        let updatedQuestions = goalsDetails.questions.length ? [...goalsDetails.questions] : [...goalsQues];
        updatedQuestions[index].answer = value;
        setGoalDetails({ ...goalsDetails, questions: updatedQuestions });
    };

    const submit = () => {
        if (goalsDetails.goal == "" ||
            goalsDetails.skill == "" ||
            goalsDetails.questions[0].answer == "" ||
            goalsDetails.questions[1].answer == "" ||
            goalsDetails.questions[2].answer == "" ||
            goalsDetails.questions[3].answer == "") {
            alert("please enter the value")
        }
        else if(getVal.details == ""){
            alert("Please fill in your user details before setting a goal");
            navigate("/details");
        }
        else {
            const formData = new FormData();
            formData.append("user_id", user.id);
            formData.append("data", JSON.stringify(goalsDetails));
            const headers = {'Authorization' : `Bearer ${user.token}`}
            axios.post('https://venkadesh1999.pythonanywhere.com/user_goal', formData,{headers}).then((res) => {
            })
            alert("submitted successfully");
            navigate("/show");
        }
    }

    const getgoalDetailsApi = () => {
        const headers = {'Authorization' : `Bearer ${user.token}`}

        axios.get(`https://venkadesh1999.pythonanywhere.com/get_usergoal/${user.id}`,{headers})
            .then((res) => {
                let getData = res.data.data.data
                setGoalDetails(JSON.parse(getData))
            })
    }

    const getUpdateGoalApi = () => {
        const headers = {'Authorization' : `Bearer ${user.token}`}

        axios.get(`https://venkadesh1999.pythonanywhere.com/get_userdetails/${user.id}`,{headers})
            .then((res) => {
                if (res.data.data.data) {
                    const getData = JSON.parse(res.data.data.data);
                    setInputValue(getData);
                }
            })
        }
        useEffect(() => {
            getUpdateGoalApi()
        }, [])
    

    return <div style={
        {
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "900px",
            background: "20"
        }
    }>
        <Header />

        <h1 style={{ textAlign: "center", color: "black" }}><i>Career Goal</i></h1>
        <div style={{
            backgroundColor: "rgb(34, 160, 195)",
            width: "500px",
            marginLeft: "34%",
            borderRadius: "15px",
            marginTop: "50px",
            boxShadow: "0 0 10px",
            padding: "30px"
        }}>

            <h5 style={{ textAlign: "left", color: "black", marginLeft: "25px" }}>Goal:</h5>
            <Form.Control type="text" value={goalsDetails.goal} placeholder="Enter your goal" onChange={(e) => setGoalDetails({ ...goalsDetails, goal: e.target.value.trimStart() })} required  ></Form.Control>

            <h5 style={{ textAlign: "left", color: "black", marginLeft: "25px" }}>skill:</h5>
            <div>
                <div className="d-flex align-items-center">
                    <Form.Control
                        type="text"
                        value={skillDetails}
                        onChange={(e) => setSkillDetails(e.target.value.trimStart())}
                        required
                        className="me-2"
                    />
                    <Button variant="warning" onClick={addskill}><IoAddOutline /></Button>
                </div>

                <ul>
                    <div>
                        {goalsDetails.skill?.map((v) =>
                            <li>{v} <Button variant="danger" onClick={() => deleteBtn(v)}><AiTwotoneDelete /></Button>
                            </li>
                        )}
                    </div>
                </ul>
            </div>

            {goalsDetails?.questions?.length ? goalsDetails.questions.map((q, index) => (
                <div>
                    <b>{q.question}</b>
                    <Form.Control type="text" value={q.answer} onChange={(e) => handleQuestion(index, e.target.value.trimStart())} required />
                </div>
            )) : goalsQues.map((q, index) => (
                <div>
                    {q.question}
                    <Form.Control type="text" style={{ textAlign: "left", color: "black", marginLeft: "5px" }} value={q.answer} onChange={(e) => handleQuestion(index, e.target.value.trimStart())} required />
                </div>
            ))}

            <div style={{ textAlign: "center", color: "black", paddingTop: "20px" }} >
                <Button variant="success" onClick={submit}>Submit</Button>
            </div>
        </div>
    </div>
}
export default CareerGoals