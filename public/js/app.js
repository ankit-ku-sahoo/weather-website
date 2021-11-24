console.log('Client side javascript file is loaded')

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location)
            
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    // console.log('testing')
    e.preventDefault()
    const location = search.value
    // console.log(location)

    message1.textContent = 'Loading...'
    message2.textContent = ''
    if(!location){
        // console.log('No location to search')
        message1.textContent = 'No location to search'
        message2.textContent = ''
    }
    else{
        const url = 'http://localhost:3000/weather?address='+encodeURIComponent(location)
        // console.log(url)

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    // console.log(data.error)
                    message1.textContent = data.error
                    message2.textContent = ''
                    // message2.textContent = 'Unable to find location'
                }
                else {
                    // console.log(data.location)
                    // console.log(data.forecast)
                    message1.textContent = data.location
                    message2.textContent = data.forecast.temp + ' deg C'
                }
            })
        })
    }

    

})