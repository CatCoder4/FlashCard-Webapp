const express = require("express")
const fs = require("fs")

const app = express()
const Port = 3000

app.use(express.static("Frontend"))
app.use(express.json())



app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.get("/getQuestions", (req, res) => {
    fs.readFile("data/questions.txt", "utf8",  (err, Questions) => {
        if (err) {
            console.log(err)
        }
        Questions = Questions.split(',')
        res.send({body: Questions})
    })

})

app.get("/getAnswers", (req, res) => {
    fs.readFile("data/answers.txt", "utf8",  (err, Answers) => {
        if (err) {
            console.log(err)
        }
        Answers = Answers.split(',')
        res.send({body: Answers})
    })

})

app.get("/getIndex", (req, res) => {
    fs.readFile("data/index.txt", "utf8",  (err, index) => {
        if (err) {
            console.log(err)
        }
        res.send({body: index})
    })
})

app.put("/UpdateQuestions", (req, res) => {
    let question = "," + req.body.Question
    fs.appendFileSync("data/questions.txt", question)
})

app.put("/UpdateAnswers", (req, res) => {
    let answer = "," + req.body.Answer
    console.log(answer)
    fs.appendFileSync("data/answers.txt", answer)
})

app.put("/UpdateIndex", (req, res) => {
    let data = req.body
    fs.writeFileSync("data/index.txt", JSON.stringify(data.i))
})

app.listen(Port, console.log(`listening on port: ${Port}`))