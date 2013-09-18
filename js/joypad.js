
var joystick = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'cyan'
});
joystick.addEventListener('touchStartValidation', function(event) {
    var touch = event.changedTouches[0];
    if (touch.pageX > window.innerWidth / 2)
        return false;
    return true
});

var joystick1 = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'orange'
});
joystick1.addEventListener('touchStartValidation', function(event) {
    var touch = event.changedTouches[0];
    if (touch.pageX <= window.innerWidth / 2)
        return false;
    return true
});