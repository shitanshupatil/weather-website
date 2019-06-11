const express = require('express')
const getCordinates = require('./geocode.js')
const forecast = require('./forecast.js')
const path = require('path') //CORE node module for directory and path manipulations.You need not install it. Its already present
const hbs = require('hbs')

//template engine -- handle bars for dynamic documents
// Express module is actually a function which is used to call an Express application
// console.log(__dirname) //important variables node provides, provided by wrapper function
// console.log(__filename)//important variables node provides, provided by wrapper function
// console.log(path.join(__dirname,'../public'))
const app = express()

//Define paths for Express Config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials') 


//when you dont specify the diretory to search for the VIEWs folder, express by default makes a serach for the VIEWS folder in the root directory of
//your project 

//Setup handlebars engine and views location
app.set('view engine','hbs') //for helping express understand which view engine (dynamic template tool is to be used)
app.set('views',(viewsPath))
//app.set('partials',partialPath)
//For setting up partial path, you have to use HBS.registerpartials
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //express' function USE is used to serve up a folder or a directory for customizing, configuring our express application

//get() function supports two arguments.First is the partial route to which the data needs to be shown.
// second is a function which supports two arguments, first being the request obj and the other being the response obj
//for eg if we have a doman app.com, partial route will be '', for app.com/help partial route will be '/help'


// app.get('/help.html',(req,res)=>{
//     res.send([{
//         name : "Shitanshu Patil",
//         age : 27
//     },{
//         name : "Aishwarya Kshirsagar",
//         age : 25
//     }]) //You can directly pass an object to the server and the server will automatically stringify the object and send it to the requester
//  })
 
//  app.get('/about.html',(req,res)=>{
//      res.send('<h1>About Page Loaded</h1>')
//   })

//below code creates a request object and uses the render function on response recevied. Render function makes it 
//evident that it is dynamic view. THe parameter passed to the render object is the filename to be rendered
 app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather App',
        name : 'Shitanshu Patil'
    }) // render for dynamic content, send() for static content
 })

 app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About Me Page',
        name : 'Shitanshu Patil'
    }) // render for dynamic content, send() for static content
 })
 app.get('/help', (req,res) =>{
    res.render('help',{
        title:'Help Page',
        name : 'Shitanshu Patil',
        message : 'Please find below the FAQs for your help'
    }) // render for dynamic content, send() for static content
 })

  app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send("You must enter an address!")
    }
    //making use of Object shorthand property to pass properties directly through function call
    getCordinates(req.query.address,(error,{latitude,longitude,Location} ={}) => {

        if (error)
        {
            return res.send(error)
        }
        forecast({latitude,longitude,Location},(error,{Summary,currentTemperature,RainfallProbabilityProbability} = {})=>{
            if(error)
            {
                return res.send(error)
            }
            res.send({
                Location,
                Summary,
                currentTemperature,
                RainfallProbabilityProbability
            }) 
        })
    
    })
 })

 app.get('/help/*', (req,res) =>{
    res.render('404',{
        errormessage : "Help Link not found!",
        title:'Help Link Error',
        name : 'Shitanshu Patil',

    }) // render for dynamic content, send() for static content
 })

 app.get('*', (req,res) =>{
    res.render('404',{
        errormessage : "Page Not Found",
        title:'Error 404:',
        name : 'Shitanshu Patil'
    })
 })

app.listen(3000, ()=> {
    console.log('Server is up on port 3000') //this wont be seenon browser
}) // port 3000 is the development port. So you can use this.
//use CTRL C to stop the server


