console.log("javascript file bleh!!");

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//     response.json().then((result) => {
//         if (result.error) {
//             return console.log(result.error);
//         }
        
//         console.log(result);
        
//     })
// })

// event listener is used to acivate whenever any link is pressed
// querry selector is used to get info from browser
//
// prevent default is used to prevent auto refreshing of page when event listener is called

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const firstPara = document.querySelector('#first')
const secondPara = document.querySelector('#second')

// firstPara.textContent = 'e'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    firstPara.textContent = 'Loading...'
    secondPara.textContent = ''
    fetch("http://localhost:3000/weather?address="+ searchElement.value).then((response) => {
    response.json().then((result) => {
        if (result.error) {
            return [firstPara.textContent = result.error, console.log(result.error)]
            //return console.log(result.error);
        }
        firstPara.textContent = 'At '+ result.location
        secondPara.textContent = 'Weather is '+ result.description +', with temperature: '+ result.temperature +' degrees'
        console.log(result);
        
    })
})
    // console.log('testing');
})