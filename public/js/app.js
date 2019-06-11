console.log('Client Side JavaScript File!')

//Client side Javascript. Not accessible in Node.js. Runs in client side JS. 
//THEN function below is a part of a bigger API called PROMISES
// fetch('http://localhost:3000/weather?address=!').then((response)=> {
// response.json().then((data)=>{
// if (data.error)
// {
//      console.log(data.error)
// }
// else{
//     console.log(data)
// }
// })})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(event)=>{
event.preventDefault() //Prevents the default functioning of the browser ie reloading it
console.log(search.value)
console.log('testing!')
var url = 'http://localhost:3000/weather?address=' + search.value
fetch(url).then((response) => {
    response.json().then((data)=>{
        if (data.error)
        {
            console.log(data.error)  
            document.querySelector('#message1').textContent  = 'Error: ' +data.error
            document.querySelector('#message2').textContent = ''
        }
        else{
            document.querySelector('#message1').textContent = ''
            document.querySelector('#message2').textContent  = 'Location: ' +data.Location + ' /n ' + 
            'Summary: ' + data.Summary + ' /n '
            + 'Current Temperature: ' + data.currentTemperature
           
            console.log(data)
        }
    })
})
})