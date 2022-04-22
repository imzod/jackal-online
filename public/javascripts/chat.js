let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');



form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})
socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

/*socket.on('connect', function() {
    let item = document.createElement('li');
    item.textContent = 'User connected';
    socket.emit('connect', 'User connected');
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('disconnect', function() {
    let item = document.createElement('li');
    item.textContent = 'You have been disconnected';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});*/
