import { Container,Button,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';
import axios from 'axios';

function CareerAi(){
  const [inputValue, setInputValue] = useState("")
  const [goalValue, setGoalValue] = useState("")
  const [userDetails, setuserDetails] = useState({})
  let getVal = { ...userDetails, details: inputValue, goals: goalValue }

  const [generate,setRegenerate] = useState("generate")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [summary,setSummary] = useState("")

  let val = JSON.parse(localStorage.getItem("users"))

  const getUpdateGoalApi = () => {
    axios.get(`https://venkadesh1999.pythonanywhere.com/get_userdetails/${val.id}`)
        .then((res) => {
            if (res.data.data.data) {
                const getData = JSON.parse(res.data.data.data);
                console.log(getData)
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

        const cx = "84c171dacf1aa43c1"
        const apiKey = "AIzaSyC8kh_wDAmTboxQf3lvjBSChxhiNfjbPdU"
    
        const genAI = new GoogleGenerativeAI(apiKey);
    
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });
    
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };
    
        async function run() {
         
          if(getVal.details == ""){
            alert("Please Fill the UserDetails")
            navigate("/details")
          }else if(getVal.goals == ""){
            alert("Please Fill the GoalDetails")
            navigate("/goal")
          }
          else{
            setLoading(true)
            const prompt  = `based on my educationdetails and indicate goals,skills,location,salary range expectation answer,
            Provide careers and job roles well suited to a [insert a fullname]
            provide guidance format as HTML within <div> tag with Css and Bootstrap design and 
            avoid below  key improvement explanation Output response will be HTML format only and avoid text which are placed outside HTML and html tag also: 
              ${JSON.stringify(getVal)}`

            const result = await model.generateContent(prompt);
            const responseText = result.response.text().replace(/```html/g, "").replace(/```/g,"");
            setSummary(responseText);
            setLoading(false)
            setRegenerate("upDate")
          }
      }
       
  const resumeBtn =()=>{
    alert("Do you want to go Resume Page?")
    navigate("/resume")
  }
 
    return <div>
      <Header />
      <Container style={{
      marginTop:"20px"
    }}>
       <h1 style={{textAlign:"center"}}>Carrer Ai Guidance</h1>
      </Container>
     
       {generate == "generate" ? <Button variant='primary' style={{marginLeft:"610px"}} disabled = {loading} onClick={run}>
          {loading ? 
              (
          <>
          <Spinner animation="border"  size='sm' style={{marginRight:"10px"}} variant="light" />Generating...
          </>
              ): (
              "Generate tips.."
              )
          }         
        </Button>:
        <Button variant='primary' style={{marginLeft:"600px"}} onClick={run}>
          {loading == false ? (
            "Re-generate" 
           ) :
          (
            <>
            <Spinner animation="border"  size='sm' style={{marginRight:"10px"}} variant="light" />Generating...
            </>
          )
        }
          </Button>
      }
        <div style={{marginTop: "20px"}}
             dangerouslySetInnerHTML={{__html: summary}}         
        />
        
        {generate == "generate" ? 
            <></> :
            <Button 
             style={
                {marginLeft:"610px",
                marginTop:"12px"
                }
            }
            variant="danger"
            onClick={resumeBtn}
            >Resume Builder</Button>
        }
    </div>
}

export default CareerAi