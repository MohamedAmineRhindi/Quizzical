import React from "react"
import { nanoid } from "nanoid"

export default function Question({ questionData, handleClick, response, quizResult, isChecked }) {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    const answersEl = questionData.answers.map(answer => {
        const isSelected = response && response.answer === answer
        function getClassName() {
            if (isSelected && !isChecked) {
                return "selected"
            }
            if (isChecked && answer === questionData.correctAnswer) {
                return "correct"
            }
            if (isSelected && isChecked && !quizResult) {
                return "incorrect"
            } if (!isSelected && isChecked && !(answer === questionData.correctAnswer)) {
                return "off"
            }
        }
        return (
            <span
                key={nanoid()}
                className={`question--answer ${getClassName()}`}
                onClick={() => {
                    
                    if(!isChecked){
                        handleClick(answer, questionData.id)
                    }
                }}
            >
                {decodeHtml(answer)}
            </span>
        )
    })

    return (
        <div className="question">
            <h3 className="question--question">{decodeHtml(questionData.question)}</h3>
            <div className="question--answers">
                {answersEl}
            </div>
        </div>
    )
}