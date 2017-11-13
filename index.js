const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))

let gurl = 'https://www.google.com/recaptcha/api/siteverify'

app.post('/form', async function(req, res) {
  console.log(req.body)

  let grequest = {
    secret: '6LcxkjgUAAAAAOLEAQi-xu8EwIVUcLmbvi8B3464',
    response: req.body['g-recaptcha-response'],
    remoteip: req.ip
  }

  let response = await fetch(
    `${gurl}?secret=${grequest.secret}&response=${grequest.response}`,
    { method: 'post' }
  )

  response = await response.json()

  res.send({
    response
  })
})

app.listen(3000, function() {
  console.log('listening on http://localhost:3000')
})
