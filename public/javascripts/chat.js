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
let socket = null;

$(function () {
    socket = io.connect();


    let $form = $("#messForm");
    let $name = $("#name");
    let $message = $("#message");
    let $typing = $("#typing");
    let $chat = $(".chat");


    $form.submit(function (event) {
        event.preventDefault();
        socket.emit('send mess', {mess: $message.val(), name: $name.val(), className: alertClass});
        $message.val('');
    });

    $($message).on('keydown keyup', function () {
        socket.emit('typing', $name.val());
    });


    socket.on('add mess', function (data) {

        $typing.before("<div class='alert alert-" + data.className + "'><b>" + data.name + "</b>: " + data.mess + "</div>");
        $chat.animate({scrollTop: $typing.offset().top}, 'slow');

    });

    socket.on('typing', function (name) {
        if (name !== $name.val()) {
            $typing.empty();
            let mess = $('<b>' + name + '</b> <span>печатает сообщение...</span>');
            $typing.append(mess);
            mess.fadeOut('slow');
        }
    })

    socket.on('generate field', function (field) {
        generate(JSON.parse(field));
    })
});
