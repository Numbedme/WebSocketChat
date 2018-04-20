Vue.component("app-accordion", {
    template: `
    <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Create new chat
                    </button>
                </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <button type="button" id="createChat" class="btn-primary">Create chat</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Connect to chat
                    </button>
                </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                    <div class="form-group" id="createRoom">
                        <input type="text" id="roomId" class="form-control">
                        <button type="button" id="connectToChat" class="btn-primary">Connect to chat</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Exit
                    </button>
                </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">
                    <button type="button" id="exitButton" class="btn-primary">Exit chat</button>
                </div>
            </div>
        </div>
    </div>
    `
});

Vue.component('posts', {
    template:
        `<ul id="mediaList" class="list-unstyled">
            <li class="media" v-for="msg in messages">
                <div>{{msg.text}}</div>
            </li>
        </ul>`,
    props: ['messages']
});

Vue.component('chat', {
    template:
        `<div id="chat">
            <div class="form-group" id="inputDiv">
                <input @keyup.enter="submitMessage" type="text" id="msgText" placeholder="Write a message..." class="form-control" v-model="messageText"/>
                <button id="submitMessage" class="btn-primary" @click="submitMessage">Send</button>
            </div>
            <posts v-bind:messages="messages"></posts>
        </div>`,
    data: function () {
        return {
            messageText: "",
            messages:[],
            stompClient: null,
            connected: false
        }
    },
    methods: {
        submitMessage: function () {
            if (this.messageText !== ""){
                this.stompClient.send("/app/message", {}, this.messageText);
                this.messageText = "";
            }
        },
        connect: function () {
            if (!this.connected){
                this.disconnect();
            }
            this.stompClient = Stomp.over(new SockJS('/websocket'));
            this.stompClient.connect({}, this.subscribe);
            this.connected = true;
        },
        disconnect: function () {
            if (this.stompClient != null){
                this.stompClient.disconnect();
                this.connected = false;
            }
        },
        subscribe: function () {
            this.stompClient.subscribe('/topic/local', this.showMessage);
        },
        showMessage: function (message) {
            let msg = {id: 0, text: message.body};
            this.messages.unshift(msg);
            new Audio("../assets/message.mp3").play();
        }
    },
    created:function () {
        this.connect();
    }
});

var app = new Vue({
    el: '#main',
    data:{
        socketEndpoint: '/websocket',
        targetURL: '/app/message',
        subscribeURL:'/topic/chat'
    }
});