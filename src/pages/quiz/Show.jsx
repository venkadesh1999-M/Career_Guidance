import { Form, Container, Button, Row, Col,Navbar,Nav, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


function Show (){


  const Navigate = useNavigate()
  const globalQuestion  =  useSelector((state) => state.quiz);
    const[quiz,setQuiz] = useState(globalQuestion)
    const[summary,setSummary] = useState([])

    const[markShow,setMarkshow] = useState("show")

    const[verifyAnswer,setverifyAnswer] = useState("")
   
    const questionAi = () => {
      let v =  globalQuestion.answer   
      console.log(v)   
      setSummary(v)
  }

  useEffect(() =>{
    questionAi()
},[])


      const cx = "84c171dacf1aa43c1"
        const apiKey = "AIzaSyC8kh_wDAmTboxQf3lvjBSChxhiNfjbPdU"
    
        const genAI = new GoogleGenerativeAI(apiKey);
    
       
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
              responseMimeType: "application/json",
            },
          });
    
         
    
        async function run() {
          const prompt = `
        Check how many answers are correct from this data not count correct_answers only check answer: ${JSON.stringify(summary)}.
        Return only this exact JSON format:  

        { "total marks": "answers / totalQuestions" }

        No extra text or explanation
        `;
          
   
              const result = await model.generateContent(prompt);
               const responseText = result.response.text();  

                  const text = JSON.parse(responseText);
                  const totalMarks = text["total marks"]; 
                  setverifyAnswer(totalMarks);
                  setMarkshow("update")
        }

        const selfIntro = () =>{
          Navigate('/intro')
        }
    

  

    return <div>
        <h1 style={{textAlign:"center"}}>Quiz</h1>
        {markShow == "show" ?
          <Button variant='primary' style={{marginLeft:"600px",marginTop:"20px"}} onClick={run}>Verify Answer</Button>:
          (
            <>
              <h3 style={{marginLeft:"580px",marginTop:"20px"}}>Total marks = {verifyAnswer}</h3>
              <Button variant='primary' style={{marginLeft:"630px",marginTop:"20px"}} onClick={selfIntro}>Selfintro</Button>
            </>
          )
          
        }

        {quiz.answer[0].map((v,index) => 
          <div style={
              {
                marginLeft:"480px",
                marginTop:"20px"
              }
            }>
            <h4>{v.question}</h4>
                <span>{v.options.map((option,i) => 
                     <Form.Check 
                     type="radio" 
                        style={{marginLeft:"120px",marginTop:"20px"}} 
                        aria-label="radio 1"  
                        label={option}
                        value={v.answer}
                        checked = {v.answer === option}
                     />

                   )}
                   <p style={{marginTop:"20px"}}>Correct answer: <span style={{color:"black",marginTop:"40px",fontSize:"20px",marginLeft:"20px"}}>{v.correct_answer}</span></p>
                  </span>
            </div>
        )}
        
       
         
       
    </div>
}

export default Show