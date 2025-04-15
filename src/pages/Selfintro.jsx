import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button,Spinner } from 'react-bootstrap';


function Selfintro() {
  let val = JSON.parse(localStorage.getItem("users"))
  const cx = "84c171dacf1aa43c1"
  const apiKey = "AIzaSyC8kh_wDAmTboxQf3lvjBSChxhiNfjbPdU"

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("")
  const [userInputValue, setuserInputValue] = useState(null);
  const [generate,setRegenerate] = useState("generate")

  

  useEffect(() => {
    getApi()
  }, [])

 

  const getApi = () => {

    axios.get(`https://venkadesh1999.pythonanywhere.com/get_resume/${val.id}`).then((res) => {
      let getData = res.data.data.data
      console.log(getData)
      setuserInputValue(JSON.parse(getData))

    });
  }


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
    setLoading(true)
    const prompt = `Hi, based on the  details how to introduce elaborate selfintroduction:
        ${JSON.stringify(userInputValue)}
        avoid text outside HTML tags return only the HTML content`;

    const result = await model.generateContent(prompt);


    const responseText = result.response.text().replace(/```html/g, "").replace(/```/g,"");
    
    setSummary(responseText);
    setLoading(false)
    setRegenerate("upDate")
    console.log(summary)
  }



  return <div>
    <h2 style={{ textAlign: "center", color: "black",marginBottom:"20px" }}>Self Introduction</h2>

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
      

    <div style={{marginLeft:"300px",marginTop:"30px"}}
        dangerouslySetInnerHTML={{ __html: summary }} 
    />

  </div>




}
export default Selfintro