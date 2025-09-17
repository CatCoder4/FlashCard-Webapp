const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')
const b3 = document.getElementById('b3')
const b4 = document.getElementById('b4')

const cardNum = document.getElementById('p1')

const question = document.getElementById('question')
const info = document.getElementById('info')
const title = document.getElementById('Title1')

const Aquestion = []
const Aanswer = []

const form = document.getElementById('form1')

const NewQuestion = document.getElementById('Qtext')
const NewAnswer = document.getElementById('Atext')

const CardNum = document.getElementById('cardNum')


let Qlist = []

let Alist = []

fetch("http://localhost:3000/getQuestions").
then(response => response.json()).
then(data => {
  Qlist = data.body
  question.innerHTML = Qlist[0]
})

fetch("http://localhost:3000/getAnswers").
then(response => response.json()).
then(data => {
  Alist = data.body
})

let CardI = 0
let Answer = false

let i = 1
let index = 0

fetch("http://localhost:3000/getIndex").then(response => response.json()).then(data => {
  index = data.body
  CardNum.innerHTML = `${i} card out of ${index}`
})


function pre() {
  title.innerHTML = 'Question:'
  info.innerHTML = ""
  CardI--
  if (CardI < 0) {
    CardI++
    info.innerHTML = "This is the first card. You cannot go before it"
    return false
  }
  else {
    i--
    CardNum.innerHTML = `${i} card out of ${index}`
    IndexOfCard(CardI)
  }

}

function flip() {
  Answer = !Answer
  if (Answer) {
    title.innerHTML = "Answer:"
    question.innerHTML = Alist[CardI]
  }
  else {
    title.innerHTML = 'Question:'
    IndexOfCard()
  }  
}

function next() {
  title.innerHTML = 'Question:'
  info.innerHTML = ""
  CardI++


  if (CardI >= index) {
    CardI--
    info.innerHTML = `there is only ${index} flash cards in the current version.`
  }
  else {
    i++
    CardNum.innerHTML = `${i} card out of ${index}`
    IndexOfCard(CardI)
  }
}

function IndexOfCard() {
  if (!Answer) {
      let card = Qlist[CardI]
      question.innerHTML = card
  }
  else {
      let card = Alist[CardI]
      question.innerHTML = card
  }
}

function showAdd() {
  
  if (form.style.display == 'none') {
    b4.innerHTML = 'hide'
    form.style.display = 'block' 
  }
  else if(form.style.display == 'block'){
    b4.innerHTML = 'Add Card'
    form.style.display = 'none' 
  }
}

function addCard() {
  let NewQuestionVal = NewQuestion.value
  let newAnswerVal = NewAnswer.value
  Qlist.push(NewQuestionVal)
  Alist.push(newAnswerVal)
  index++
  fetch("http://localhost:3000/UpdateIndex", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({i: index})
  })
  fetch("http://localhost:3000/UpdateQuestions", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({Question: NewQuestionVal})
  })
  fetch("http://localhost:3000/UpdateAnswers", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({Answer: newAnswerVal})
  })
  CardNum.innerHTML = `${i} card out of ${index}`
}

function Remove() {
  if (Qlist.length <= 1 && Alist.length <= 1) {
    info.innerHTML = "You can't delete all cards"
  }
  else {
    Qlist.splice(CardI, 1)
    Alist.splice(CardI, 1)
    
    CardI++
    if (CardI < 0) {
      CardI--
      next()
    }
    else {
      pre()
      i++
    }
    index--
    fetch("http://localhost:3000/UpdateIndex", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({i: index})
    })
    CardNum.innerHTML = `${i} card out of ${index}`
  }

}