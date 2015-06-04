module.exports = {
    events: {
        mount: function() {
            alert(111);
            var containerHeight = ($("document").height() > $("window").height()) ? $("document").height(): $("window").height(); 
            alert(222);
            alert(containerHeight);
        } 
    }
}