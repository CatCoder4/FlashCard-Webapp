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
    let answer = "," + req.body.Answer
    fs.appendFileSync("data/questions.txt", question)
    fs.appendFileSync("data/answers.txt", answer)

})

app.put("/UpdateIndex", (req, res) => {
    let index = req.body.i
    fs.writeFileSync("data/index.txt", JSON.stringify(index))
})

app.delete("/DeleteQuestion", (req, res) => {
    let Questions = fs.readFileSync("data/questions.txt", "utf8")
    let Answers = fs.readFileSync("data/answers.txt", "utf8")
    Questions = Questions.split(",")
    Answers = Answers.split(',')
    Questions.splice(req.body.CardIndex, 1)
    Answers.splice(req.body.CardIndex, 1)
    let writeableQ = Questions.join(',')
    let writeableA = Answers.join(',')
    fs.writeFileSync("data/questions.txt", writeableQ)
    fs.writeFileSync('data/answers.txt', writeableA)
})

app.listen(Port, console.log(`listening on port: ${Port}`))