import React from 'react';
import SingleQuestion from './singleQuestion';

const allQuestions = ["Question 1"]
const Questions = () => {

//display all questions from an array map which populates a single Question component.





return(
<>
{allQuestions.map((question) => {
    <SingleQuestion title={question} />
})}



</>


)


}

export default Questions;