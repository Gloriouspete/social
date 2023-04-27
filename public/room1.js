const socket = io('/room1');
const username = prompt('your username');

socket.on('connect', () => {
  console.log(`Connected to room1 with ID: ${socket.id}`);
  socket.emit('join', username);
});
socket.on('disconnect', () => {
  console.log(`Disconnected from room1 with ID: ${socket.id}`);
  socket.emit('join', username);
});
socket.on('message', (data) => {
    const message = JSON.parse(data);
    const li = document.createElement('p');
    li.classList.add('mess');
    const tex = document.createElement('p');
    tex.classList.add('maniac');
    li.innerText =` ${message.username}`;
    tex.innerText= ` ${message.text}`;
    const container = document.createElement('div');
    container.classList.add('container');
    container.appendChild(li);
    container.appendChild(tex);
    document.getElementById('messages').appendChild(container);
  });


document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('input');
  socket.emit('message',input.value);
  input.value = '';
});