const express = require('express')
const bodyParser = require('body-parser')
const Razorpay = require('razorpay')
const path = require('path')

let instace = new Razorpay ({
    key_id : 'rzp_test_W0q2jqxf1ZzWFv',
    key_secret : 'iGHMomKVuLzdYUKviAY4SoaY'
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res) => {
    res.render('home')
})

app.get('/donate',(req,res) => {
    res.render('donate')
})

app.post('/donate', (req,res) => {

    var options = {
        amount : req.body.amount,
        currency : 'INR'
    }
    
    console.log(req.body)
    instace.orders.create(options).then((data) => {
        let details = {
            name : req.body.name,
            email : req.body.email,
            amount: req.body.amount*1000,
            mobile: req.body.mobile,
            payerId: data.id
        }
        res.render('checkout', {details : details})
        // res.send({"sub": data, "status": "success"})
    }).catch((error) => {
        res.render('fail')
    })
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/contact', (req,res)=> {
    res.render('contact')
})
app.get('/fail', (req,res) => {
    res.render('fail')
})

app.listen(5524,() => {
    console.log('Server Running at http://localhost:5524')
})