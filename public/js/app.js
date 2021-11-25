const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const background_body = document.querySelector('body')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
    if(!location){
        message1.textContent = 'No location to search'
        message2.textContent = ''
        background_body.style.backgroundImage = "url('../img/background.jpg')"
    }
    else{
        const url = '/weather?address='+encodeURIComponent(location)

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    message1.textContent = data.error
                    message2.textContent = ''
                    background_body.style.backgroundImage = "url('../img/background.jpg')"
                }
                else {
                    message1.textContent = "Location: " + data.location
                    message2.textContent = "It is currently " + data.forecast.condition.toLowerCase() + " and the temperature is " + data.forecast.temp + ' degrees Celsius right now.'

                    if(data.forecast.condition.toLowerCase() === 'sunny') {
                        background_body.style.backgroundImage = "url('../img/sun-18.gif')"
                    }
                    else if(data.forecast.condition.toLowerCase() === 'mist') {
                        background_body.style.backgroundImage = "url('../img/mist.gif')"
                    }
                    else if(data.forecast.condition.toLowerCase() === 'rainy' || data.forecast.condition.toLowerCase() === 'drizzle' || data.forecast.condition.toLowerCase() === 'light drizzle') {
                        background_body.style.backgroundImage = "url('../img/rainy.gif')"
                    }
                    else {
                        background_body.style.backgroundImage = "url('../img/background.jpg')"
                    }
                    
                }
            })
        })
    }
})