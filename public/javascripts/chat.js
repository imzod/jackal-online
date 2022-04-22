let min = 1;
let max = 6;
let random = Math.floor(Math.random() * (max - min)) + min;

let alertClass;
switch (random) {
    case 1:
        alertClass = 'secondary';
        break;
    case 2:
        alertClass = 'danger';
        break;
    case 3:
        alertClass = 'success';
        break;
    case 4:
        alertClass = 'warning';
        break;
    case 5:
        alertClass = 'info';
        break;
    case 6:
        alertClass = 'light';
        break;
}


// Функция для работы с данными на сайте
$(function () {
    // Включаем socket.io и отслеживаем все подключения
    let socket = io.connect();
    // Делаем переменные на:
    let $form = $("#messForm"); // Форму сообщений
    let $name = $("#name"); // Поле с именем
    let $message = $("#message"); // Текстовое поле
    let $all_messages = $("#all_mess"); // Блок с сообщениями

    // Отслеживаем нажатие на кнопку в форме сообщений
    $form.submit(function (event) {
        // Предотвращаем классическое поведение формы
        event.preventDefault();
        // В сокет отсылаем новое событие 'send mess',
        // в событие передаем различные параметры и данные
        socket.emit('send mess', {mess: $message.val(), name: $name.val(), className: alertClass});
        // Очищаем поле с сообщением
        $message.val('');
    });

    $($message).on('keydown keyup', function() {
        socket.emit('typing', $name.val());
    });



    // Здесь отслеживаем событие 'add mess',
    // которое должно приходить из сокета в случае добавления нового сообщения
    socket.on('add mess', function (data) {
        // Встраиваем полученное сообщение в блок с сообщениями
        // У блока с сообщением будет тот класс, который соответвует пользователю что его отправил
        $all_messages.append("<div class='alert alert-" + data.className + "'><b>" + data.name + "</b>: " + data.mess + "</div>");
    });

    socket.on('typing', function(name) {
        if (name !== $name.val()) {
            $all_messages.empty();
            let mess = $('<b>' + name + '</b> <span>печатает сообщение...</span>');
            $all_messages.last().append(mess);
            mess.fadeOut(3000, function() {$(this).remove()});
        }
    })
});

/*
let socket = io();

let messages = document.getElementById('messages');
let username = document.getElementById('username');
let username = document.getElementById('username');
let form = document.getElementById('form');
let input = document.getElementById('input');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})
socket.on('chat message', function (msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
*/
