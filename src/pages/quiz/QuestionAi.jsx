import { Form, Container, Button, Row, Col,Navbar,Nav, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import{useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setanswer } from '../../redux/slices/quiz';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

import { useEffect, useState } from "react";

function QuestionAi(){

  const globalQuestion =  useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const[summary,setSummary] = useState([]);


    const cx = "84c171dacf1aa43c1"
    const apiKey = "AIzaSyC8kh_wDAmTboxQf3lvjBSChxhiNfjbPdU"

    const genAI = new GoogleGenerativeAI(apiKey);

   
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

    useEffect(() =>{
        run()
    },[])


    async function run() {
          const prompt  = `Generate 5 random questions with 4 multiple choice and 
          answer seperately it should be follwing JSON fromat:{
              "questions": [
                    {
                      "id": 0,
                      "question": "Your question?",
                      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                      "answer": "",
                      "correct_answer": "Option 3" 
                    },
                    ...
                  ]
                }`

       
          const result = await model.generateContent(prompt);

          const responseText = result.response.text();
          let val = JSON.parse(responseText)
          setSummary(val.questions.map(q => ({ 
            question: q.question, 
            options: q.options, 
            answer: "",
            correct_answer:q.correct_answer
          })));
        
}

const checkHandler = (index, selectedOption) => {
  // setSummary(prev => {
  //   const updatedSummary = [...prev];
  //   updatedSummary[index] = { ...updatedSummary[index], answer: selectedOption };
  //   return updatedSummary;
  // });
  const updatedsummary = [...summary]
  updatedsummary[index] = {...updatedsummary[index],answer:selectedOption}
  setSummary(updatedsummary)
};


const submitBtn =() => {
    const val = [...globalQuestion.answer,summary]
    console.log(val)
    dispatch(setanswer(val))
    navigate("/showquiz")

}
    return <div>
     
        <h1 style={{textAlign:"center"}}>Quiz Question</h1>
        {summary?.map((v,index) => 
          <div style={
              {
                marginLeft:"480px",
                marginTop:"20px"
              }
            }>
            <h4>{v.question}</h4>
                <span>{v.options.map((option,i) => 
                     <Form.Check type="radio" 
                        style={{marginLeft:"120px",marginTop:"20px"}} 
                        aria-label="radio 1"  
                        label={option}
                        value={option}
                        onChange={() => checkHandler(index,option)}
                        checked = {v.answer === option}
                     />
                  
                   )}
                   
                  </span>
            </div>
        )}
   
        <Button style={{
          marginLeft:"600px",
          textAlign:"center",
          marginTop:"30px"
        }} variant='primary' onClick={submitBtn}>Submit</Button>

       
    </div>
}

export default QuestionAi