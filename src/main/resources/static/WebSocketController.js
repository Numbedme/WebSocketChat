$(function () {
    let stompClient;
    let roomId;

    function generateRoomId(id){
        if (!id){
            roomId = new Date().getTime();
        } else {
            roomId = id;
        }
        $("<p></p>").text("Chat name: " + roomId).prependTo("div.container");
    }

    function connect() {
        let socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);
        if (!roomId){
            generateRoomId();
        }
        stompClient.connect({}, function () {
            stompClient.subscribe('/topic/chat/' + roomId, showMessage);
        });
        $("#inputDiv").show();
        $("#createRoom").hide();
    }

    function disconnect() {
        if(stompClient != null) {
            stompClient.disconnect();
        }
    }

    function sendMessage() {
        let message = $("#msgText").val();
        if (message){
            stompClient.send("/app/message/" + roomId, {}, message);
        }
    }

    function createMessage(message) {
        let media = $("<li></li>");
        let text = $("<div></div>");
        text.text(message.body);
        media.addClass("media");
        media.append(text);
        return media;
    }

    function showMessage(message) {
        $("#mediaList").prepend(createMessage(message));
    }

    function connectToChat() {
        generateRoomId($("#roomId").val());
        connect();
    }

    $("#msgText").keypress(function (e) {
        if (e.which === 13){
            sendMessage();
            $(this).val("");
        }
    });

    $("#roomId").keypress(function (e) {
        if (e.which === 13){
            connectToChat();
            $(this).val("");
        }
    })

    $("#sendMessage").on("click", sendMessage);

    $("#createChat").on("click", connect);

    $("#connectToChat").on("click", connectToChat);
});