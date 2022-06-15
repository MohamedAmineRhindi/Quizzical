import React from "react"
import Question from "./Question"

export default function Quiz({ questions, setIsPlaying, startQuiz, setFormData }) {
    const [responses, setResponses] = React.useState(questions.map(question => {
        return { id: question.id, answer: "" }
    }))
    const [quizResults, setQuizResults] = React.useState(new Array(questions.length).fill(false))
    const [isChecked, setIsChecked] = React.useState(false)

    React.useEffect(() => {
        setResponses(questions.map(question => {
            return { id: question.id, answer: "" }
        }))
    }, [questions])

    function handleClick(answer, id) {

        setResponses(prevResponses => prevResponses.map(response => {

            if (response.id === id) {
                if (response.answer) {
                    if (response.answer === answer) {
                        return { id, answer: "" }
                    } else {
                        return { id, answer }
                    }
                } else {
                    return { id, answer }
                }
            } else {
                return response
            }
        }))
    }

    function handleSubmit() {
        if (!isChecked) {
            const quizResultsArray = responses.map((response, index) => {
                return response.answer === questions[index].correctAnswer
            })
            setQuizResults(quizResultsArray)
            setIsChecked(true)
        } else {
            setIsPlaying(true)
            setIsChecked(false)
            startQuiz()
        }
    }

    function backToMenu() {
        setIsPlaying(false)
        setIsChecked(false)
        setFormData({
            categoryId: "0",
            difficulty: "Any difficulty",
        })
    }

    const questionsEl = questions.map((question, index) => {
        return (
            <Question
                key={question.id}
                questionData={question}
                handleClick={handleClick}
                response={responses.find(response => response.id === question.id)}
                quizResult={quizResults[index]}
                isChecked={isChecked}
            />
        )
    })

    function getScore() {
        const correctAnsNum = quizResults.filter(result => result).length
        return `${correctAnsNum}/${quizResults.length}`
    }

    return (
        <main className="quiz">
            {questionsEl}
            <footer className="quiz--footer">
                {isChecked && <p className="quiz--score">You scored {getScore()} correct answers</p>}
                <button className="quiz--btn" onClick={handleSubmit}>
                    {isChecked ? "Play again" : "Check answer"}
                </button>
                {isChecked && <button className="quiz--btn dark" onClick={backToMenu}>Menu</button>}
            </footer>
        </main>
    )
}