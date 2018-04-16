
$(function () {
    let stompClient;
    let roomId;

    function generateRoomId(id){
        if (id){
            roomId = id;
        } else {
            roomId = new Date().getTime();
        }
        $("<p></p>").text("Chat name: " + roomId).addClass("chatId").prependTo("div.container");
    }

    function connect() {
        disconnect();
        initSTOMP();
        generateRoomId();
        $("#inputDiv").show();
    }

    function initSTOMP(){
        let socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function () {
            stompClient.subscribe('/topic/chat/' + roomId, showMessage);
        });
    }

    function disconnect() {
        if(stompClient != null) {
            stompClient.disconnect();
            $(".chatId").remove();
            $("#inputDiv").hide();
            $("#mediaList").empty();
            roomId = null;
            stompClient = null;
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
        disconnect();
        generateRoomId($("#roomId").val());
        initSTOMP();
        $("#inputDiv").show();
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
    });

    $("#exitButton").on("click", disconnect);

    $("#sendMessage").on("click", sendMessage);

    $("#createChat").on("click", connect);

    $("#connectToChat").on("click", connectToChat);
});