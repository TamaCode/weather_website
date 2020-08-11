const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';


// Evento de tipo submit se genera cuando apreto el boton "Search"
weatherForm.addEventListener('submit', (eventObj) => {
    eventObj.preventDefault(); // Esto evita que se recargue la pagina al oprimir el boton
   
    messageOne.textContent = 'Processing Request...';
    messageTwo.textContent = '';

    const location = searchInput.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = `${data.location}:`;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});