let images = ["../assets/1.png", "../assets/2.png", "../assets/3.png", "../assets/4.png", "../assets/5.png", "../assets/6.png", "../assets/7.png"];

class User {
    constructor(id, login){
        let rnd = Math.floor(Math.random() * (5-1)) + 1;
        this.id = id;
        this.login = login + rnd;
        this.image = images[rnd];
    }
}

class Message {
    constructor(id, user, message, date){
        this.id = id;
        this.user = user;
        this.message = message;
        this.date = date;
    }
}

Vue.component('posts', {
    data: function () {
        return {
            options: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
        }
    },
    template:
        `<ul id="mediaList" class="list-unstyled">
            <template v-for="msg in messages">
                <li class="media">
                    <img class="align-self-center mr-3" v-bind:src="msg.user.image"/>
                    <div class="media-body" style="width: 200rem word-wrap: break-word;">
                        <h3 class="font-weight-light">{{msg.user.login}}</h3>
                            <span class="text-center">{{msg.message}}</span>
                        <br/>
                        <small><i>Posted on {{msg.date | dateFilter}}</i></small>
                    </div>
                </li>
            </template>
        </ul>`,
    props: ['messages'],
    filters: {
        dateFilter: function (date) {
            return new Date(date).toLocaleString("en-US", this.options);
        }
    }
});

Vue.component('chat', {
    template:
        `<div id="chat">
            <div class="form-group" id="inputDiv">
                <input @keyup.enter="submitMessage" type="text" id="msgText" placeholder="Write a message..." class="form-control" v-model="inputText"/>
                <button id="submitMessage" class="btn-primary" @click="submitMessage">Send</button>
            </div>
            <posts v-bind:messages="messages"></posts>
        </div>`,
    data: function () {
        return {
            inputText: "",
            messages:[],
            stompClient: null,
            connected: false,
            user: new User(0, "NoName")
        }
    },
    methods: {
        submitMessage: function () {
            if (this.inputText !== ""){
                let msg = JSON.stringify(new Message(0, this.user, this.inputText, new Date()));
                this.stompClient.send("/app/message", {}, msg);
                this.inputText = "";
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
            let msg = JSON.parse(message.body);
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