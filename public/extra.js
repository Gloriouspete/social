let form = document.getElementById('form');
let input = document.getElementById('input');
let container = document.querySelector('.container');
const socket = io();
usern = document.querySelector('#usern');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('chat message', input.value);
    input.value = '';
    input.focus();
    return false;
});

socket.on('chat message', (msg) => {
    console.log(msg);
    message = document.createElement('div');
    message.classList.add('messages');
    p = document.createElement('p');
    p.classList.add('message');
    p.textContent = msg;
    message.appendChild(p);
    container.appendChild(message);
    usern.textContent = jsonData;
    
});
