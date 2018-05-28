let images = ["../assets/1.png", "../assets/2.png", "../assets/3.png", "../assets/4.png", "../assets/5.png", "../assets/6.png", "../assets/7.png"];

class User {
    constructor(id, login){
        let rnd = Math.floor(Math.random() * (5-1)) + 1;
        this.id = id;
        this.login = login;
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

class Chat {

}

Vue.component('navigation-bar', {
    template:`<nav class="sidenav">
                  <a class="navbar-brand">Hello, {{$root.user.login}}</a>
                  <a class="nav-link active" href="#" data-toggle="modal" data-target="#modalRegistry">Change name</a>
                  <a class="nav-link active" href="#" data-toggle="modal" data-target="#modalChat">Create chat</a>
              </nav>`,
    data:function () {
        return {
            user: this.$root.user
        }
    }
});

Vue.component('modal-registry', {
   template: `<div class="modal fade" id="modalRegistry" tabindex="-1" role="dialog" aria-labelledby="modalRegistryLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalRegistryLabel">Register user</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                              <div class="form-group">
                                <label for="user-name" class="col-form-label">Enter username:</label>
                                <input type="text" class="form-control" id="user-name" placeholder="Username..." v-model="inputText">
                              </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @keyup.enter="submit" @click="submit">Register</button>
                          </div>
                        </div>
                      </div>
                    </div>`,
    data:function(){
       return {
           inputText: ""
       }
    },
    methods:{
       submit: function () {
           let self = this;
           let user = new User(null, this.inputText);
           $.ajax({
               url: this.$root.userURL,
               type:"POST",
               data: JSON.stringify(user),
               contentType: "application/json; charset=utf-8",
               success: function (data) {
                   self.$root.user = data;
               },
               error: function (data) {
                   alert(JSON.parse(data));
               }
           })
       }
    }
});

Vue.component('modal-chat', {
    template: `<div class="modal fade" id="modalChat" tabindex="-1" role="dialog" aria-labelledby="modalChatLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalChatLabel">Register new chat</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                              <div class="form-group">
                                <label for="chat-name" class="col-form-label">Chat name:</label>
                                <input type="text" class="form-control" id="chat-name" v-model="chatName">
                              </div>
                              <div class="form-group">
                                <label for="chat-pass" class="col-form-label">Chat password:</label>
                                <input type="password" class="form-control" id="chat-pass" v-model="chatPassword">
                                <small><i>Leave empty for public chat</i></small>
                              </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @keyup.enter="submit" @click="submit">Register</button>
                          </div>
                        </div>
                      </div>
                    </div>`,
    methods:{
        submit:function () {
            let self = this;
            let chat = {
                name: this.chatName,
                password:this.chatPassword
            };
            $.ajax({
                url: this.$root.chatURL,
                type:"POST",
                data: JSON.stringify(chat),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    self.$root.chats.push(response);
                },
                error: function (data) {
                    alert(JSON.parse(data));
                }
            })
        }
    },
    data:function () {
        return {
            chatName: "",
            chatPassword: ""
        }
    }
});

Vue.component('tabbed-chats', {
    template:`<div>
                <ul class="nav nav-tabs" id="tabbedNav" role="tablist">
                    <li class="nav-item" v-for="(chat, index) in chats">
                        <a class="nav-link" :class="{'active':index === 0}" :id="chat.name + '-tab'" data-toggle="tab"
                         :href="'#' + chat.name" role="tab" :aria-controls="chat.name" 
                         :aria-selected="{'true':index === 0}">{{chat.name}}<span aria-hidden="true" class="close">&times;</span></a>
                    </li>
                </ul>
                <div class="tab-content" id="tabbedChats">
                    <div class="tab-pane fade" :class="{'show active':index === 0}" :id="chat.name" role="tabpanel" :aria-labelledby="chat.name + '-tab'" v-for="(chat, index) in chats">
                        <chat :chatName="chat.name"></chat>
                    </div>
                </div>
               </div>`,
    data:function () {
        return {
            chats:[{name:"Global"}, {name:"Test"}]
        }
    }
});

Vue.component('posts', {
    template:
        `<div id="mediaList" class="list-unstyled">
            <template v-for="msg in messages">
                <post v-bind:message="msg"></post>
                <br/>
            </template>
            <br/>
        </div>`,
    props: ['messages']
});


Vue.component('post', {
    data: function () {
        return {
            options: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },
            user: {}
        }
    },
    template: `<div class="media">
                    <img class="align-self-center mr-3 ml-3" v-bind:src="user.image" v-if="!isCurrentUser()"/>
                    <div class="media-body rounded" v-bind:class="defineClass">
                        <h3 class="font-weight-bold">{{user.login}}</h3>
                        <span class="text-center" v-if="message.messageType === 'TEXT'">{{message.message}}</span>
                        <span class="text-center" v-if="message.messageType === 'FILE'">Download file: <a :href="fileHref">click</a></span>
                        <br/>
                        <small><i>Posted on {{message.date | dateFilter}}</i></small>
                    </div>
                    <img class="align-self-center ml-3 mr-3" v-bind:src="user.image" v-if="isCurrentUser()"/>
                </div>`,
    computed:{
        defineClass:function () {
            return {
                'media-background-self text-right': this.isCurrentUser(),
                'media-background-else': !this.isCurrentUser()
            }
        },
        fileHref:function () {
            return `${this.$root.fileURL}/${this.message.message}`;
        }

    },
    watch:{
        message:function () {
            this.init();
        }
    },
    props: ['message'],
    filters: {
        dateFilter: function (date) {
            return new Date(date).toLocaleString("en-US", this.options);
        }
    },
    methods: {
        init: function () {
            let self = this;
            $.get(this.message._links.user.href, function (data) {
                self.user = data;
            })
        },
        isCurrentUser:function(){
            return this.$root.user.login === this.user.login;
        }
    },
    created:function () {
        this.init();
    }
})

Vue.component('chat', {
    template:
        `<div id="chat">
            <posts v-bind:messages="messages"></posts>
            <div class="input-group" id="inputDiv">
                <input @keyup.enter="submitMessage" type="text" :id="chatName" placeholder="Write a message..." class="form-control" v-model="inputText"/>
                <div class="input-group-append">
                    <label class="btn btn-secondary">Choose<input type="file" style="display: none;" ref="fileRef" @change="sendFiles">
                    </label>
                    <button id="submitMessage" class="btn btn-primary" @click="submitMessage">Send</button>
                </div>
            </div>
        </div>`,
    data: function () {
        return {
            inputText: "",
            messages:[],
            chat: null,
            stompClient: Stomp.over(new SockJS(this.$root.socketEndpoint)),
            connected: false
        }
    },
    props:['chatName'],
    methods: {
        sendFiles:function () {
            let fd = new FormData();
            let self = this;
            fd.append("file", this.$refs.fileRef.files[0]);
            $.ajax({
                url: this.$root.fileURL,
                data: fd,
                type: "POST",
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data) {
                    let msg = JSON.stringify({
                        id: null,
                        user:self.$root.user,
                        message:data.name,
                        date:new Date(),
                        messageType:"FILE"
                    });
                    self.stompClient.send(`${self.$root.targetURL}${self.chat.name}`, {}, msg);
                },
                error: function (jqXHR) {
                    alert(JSON.stringify(jqXHR));
                }
            });
        },
        submitMessage: function () {
            if (this.inputText !== ""){
                let msg = JSON.stringify({
                    id: null,
                    user:this.$root.user,
                    message:this.inputText,
                    date:new Date(),
                    messageType:"TEXT"
                });
                this.stompClient.send(`${this.$root.targetURL}${this.chat.name}`, {}, msg);
                this.inputText = "";
            }
        },
        getChat: function (name) {
            let self = this;
            this.stompClient.connect({}, function () {
                $.get(`${self.$root.chatByNameURL}${name}`, function (data) {
                    self.chat = data;
                    self.$root.chats.push(data);
                    self.stompClient.subscribe(`${self.$root.subscribeURL}${self.chat.name}`, self.processMessage);
                    self.updateChat();
                    self.connected = true;
                });
            });
        },
        updateChat: function () {
            let self = this;
            $.get(self.chat._links.messages.href, function (data) {
                self.messages = data._embedded.messages;
                self.messages.sort(function (a,b) {
                    return new Date(b.date) - new Date(a.date);
                });
            });
        },
        connect: function (name) {
            if (this.connected){
                this.disconnect();
            }
            this.getChat(name);
        },
        disconnect: function () {
            if (this.stompClient != null){
                this.stompClient.disconnect();
                this.connected = false;
            }
        },
        processMessage: function (message) {
            this.updateChat();
            new Audio("../assets/message.mp3").play();
        }
    },
    created:function () {
        this.connect(this.chatName);
    }
});

let app = new Vue({
    template:`<div>
                <navigation-bar></navigation-bar>
                <div class="main container row justify-content-md-center">
                    <div class="col-md-8">
                        <tabbed-chats></tabbed-chats>
                    </div>
                </div>
                <modal-registry></modal-registry>
                <modal-chat></modal-chat>
             </div>`,
    el: '#app',
    data:{
        socketEndpoint: '/websocket',
        targetURL: '/app/message/',
        subscribeURL:'/topic/chat/',
        chatByNameURL: '/rest/chats/search/findByName?name=',
        userURL: "/rest/users",
        chatURL:"/rest/chats",
        fileURL:"/files",
        utilURL:"/util",
        chats:[],
        user: new User(-1, "")
    },
    created:function () {
        let self = this;
        $.ajax({
            url: `${self.utilURL}/users`,
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                console.log(data)
                self.user = data;
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        });
    }
});