const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''
    if(!location){
        message1.textContent = 'No location to search'
        message2.textContent = ''
    }
    else{
        const url = '/weather?address='+encodeURIComponent(location)

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    message1.textContent = data.error
                    message2.textContent = ''
                }
                else {
                    message1.textContent = "Location: " + data.location
                    message2.textContent = "The temperature is " + data.forecast.temp + ' degrees Celsius right now.'
                    message3.textContent = "It is currently " + data.forecast.condition.toLowerCase() + " right now."
                }
            })
        })
    }
})