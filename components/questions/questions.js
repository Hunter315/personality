import React from 'react';
import SingleQuestion from './singleQuestion';

const questionsArray = ["Question 1", "Question 2", "Question 3"];

const Questions = () => {


console.log(questionsArray)
React.useEffect(()=>{

})
    return(
        <div className="questions-container">
        {questionsArray.map((question) =>
         
            <SingleQuestion title={question} />
            
        )}

        </div>
    )
}

export default Questions;