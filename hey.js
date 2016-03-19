$(document).ready( function() {
    $(document).click( function() {
        $('#message').focus();
    });

    function messageLength() {
        var message = $('#message').val();
        if (message.length > 0) {
            return true;
        } else if (message.length == 0) {
            return false;
        }
    }

    $('#message').keyup( function() {
        var message = $('#message').val();
        if (messageLength()) {
            $('#success').hide();
            $('#note').show();
        } else {
            $('#note').hide();
        }
    });

    var hook = "" /* Your Slack Incoming Webhook URI as a string */;

    function buildPayload(message) {
        var payload = {};
        payload.text = message;
        return JSON.stringify(payload)
    }

    function success() {
        $('#message').val('');
        $('#note').hide();
        $('#success').show();
    }

    function error() {
        $('#note').hide();
        $('#error').show();
    }

    function sendPayload(hook, payload, success, error) {
        $.ajax({
            method: 'POST',
            url: hook,
            data: payload,
            success: success,
            error: error
        });
    }

    $('#message').keydown( function(event) {
        var message = $('#message').val();
        if (event.which == 13) {
            if (messageLength()) {
                var payload = buildPayload(message);
                sendPayload(hook, payload, success, error)
                event.preventDefault();
            }
            event.preventDefault();
        }
    });
});
