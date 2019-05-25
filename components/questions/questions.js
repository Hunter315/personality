import React from 'react';
import SingleQuestion from './singleQuestion';
import {Store} from '../store'


const questionsArray = ["Question 1", "Question 2", "Question 3"];

const Questions = () => {
    const {state, dispatch} = React.useContext(Store)
console.log(state.userId)
    const answerQuestion = (responses) => {

        firebase.firestore().collection('users').doc(state.userId)
    }

// React.useEffect(()=>{

// })
    return(
        <div className="questions-container">
        {questionsArray.map((question) =>
         
            <SingleQuestion title={question} />
            
        )}

        </div>
    )
}

export default Questions;