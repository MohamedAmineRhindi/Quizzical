import React from "react"

export default function Intro({ handleClick, formData, setFormData }) {
    const categoryArray = [{"id":0,"name":"Any category"},{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},
    {"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},
    {"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},
    {"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},
    {"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},
    {"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},
    {"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},
    {"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

    const difficultyArray = ["Any Difficulty", "Easy", "Medium", "Hard"]

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <main className="intro">
            <h1 className="intro--header">Quizzical</h1>
            <p className="intro--description">Test your knowledge with 6 random questions</p>
            <button className="intro--btn" onClick={handleClick}>Start quiz</button>
            <form>
                <select id="categoryId" value={formData.category} onChange={handleChange} name="categoryId">
                    {categoryArray.map((category, index) => { return <option value={category.id} key={index}>{category.name}</option> })}
                </select>
                <select id="difficulty" value={formData.difficulty} onChange={handleChange} name="difficulty">
                    {difficultyArray.map((difficulty, index) => { return <option value={difficulty} key={index}>{difficulty}</option> })}
                </select>
            </form>
        </main>
    )
}

