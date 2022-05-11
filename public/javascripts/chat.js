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

const sessionColor = sessionStorage.getItem('color');
if (sessionColor) {
    alertClass = sessionColor;
} else {
    sessionStorage.setItem('color', alertClass);
}

let socket = null;

$(async function () {


    let $form = $("#messForm");

    let response = await fetch('/me');
    let user = await response.json();

    socket = io.connect();

    //let $name = $("#name");
    let $message = $("#message");
    let $typing = $("#typing");
    let $chat = $(".chat");


    let allMessages = JSON.parse(sessionStorage.getItem('messages') || '[]');
    for (let message of allMessages) {
        $typing.before("<div class='alert alert-" + message.className + "'><b>" + message.name + "</b>: " + message.mess + "</div>");
    }
    $chat.animate({scrollTop: $typing.offset().top}, 'slow');


    $form.submit(function (event) {
        event.preventDefault();
        socket.emit('send mess', {mess: $message.val(), name: user.username, className: alertClass});
        $message.val('');
    });

    $message.on('keydown keyup', function () {
        socket.emit('typing', user.username);
    });


    socket.on('add mess', function (data) {

        $typing.before("<div class='alert alert-" + data.className + "'><b>" + data.name + "</b>: " + data.mess + "</div>");
        $chat.animate({scrollTop: $typing.offset().top}, 'slow');
        let allMessages = JSON.parse(sessionStorage.getItem('messages') || '[]');
        allMessages.push(data);
        sessionStorage.setItem('messages', JSON.stringify(allMessages));

    });
    socket.on('connect', function () {
        socket.emit('new user', user.username);
    });

    socket.on('user connected', function (data) {
        $typing.before(`<div><b>${data}</b> подключился</div>`);
        $chat.animate({scrollTop: $typing.offset().top}, 'slow');
    });

    socket.on('user disconnected', function (data) {
        $typing.before(`<div><b>${data}</b> отключился</div>`);
        $chat.animate({scrollTop: $typing.offset().top}, 'slow');
    });

    socket.on('typing', function (name) {

        $typing.empty();
        let mess = $('<b>' + name + '</b> <span>печатает сообщение...</span>');
        $typing.append(mess);
        $chat.animate({scrollTop: $typing.offset().top}, 'slow');
        mess.fadeOut('slow');

    })

    socket.on('generate field', function (field) {
        generate(JSON.parse(field));
    })

});
