import './App.css';
import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import shuffle from "./utils.js"
import { nanoid } from "nanoid"

export default function App() {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [formData, setFormData] = React.useState(
      {
          categoryId: "0", 
          difficulty: "Any difficulty"
      }
  )

    async function startQuiz() {
        setIsPlaying(true)
        setIsLoading(true)
        const diff = formData.difficulty === "Any difficulty" ? "" : `&difficulty=${formData.difficulty.toLowerCase()}`
        const cat = formData.categoryId === "0" ? "" : `&category=${formData.categoryId}`
        const url = `https://opentdb.com/api.php?amount=6${cat}${diff}`
        const res = await fetch(url)
        const data = await res.json()
        const questionsData = data.results.map(item => {
            const { category, type, difficulty, question, correct_answer, incorrect_answers } = item
            return {
                id: nanoid(),
                category: category,
                type: type,
                difficulty: difficulty,
                question: question,
                answers: shuffle(type === "multiple" ?
                    shuffle([correct_answer, ...incorrect_answers])
                    : ["True", "False"]),
                correctAnswer: correct_answer,
            }
        })
        setIsLoading(false)
        setQuestions(questionsData)
    }

    return (
        <>
            {!isPlaying && <Intro handleClick={startQuiz} formData={formData} setFormData={setFormData}/>}
            {isPlaying && isLoading && <main className="intro"><h1 className="intro--header">Loading...</h1></main>}
            {isPlaying && !isLoading && !!questions.length && <Quiz questions={questions} setIsPlaying={setIsPlaying} startQuiz={startQuiz} setFormData={setFormData}/>}
        </>
    )
}