<template>
  <div class="messages">
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-1">
          <h1>New Message</h1>
          <form v-on:submit.prevent="createMessage()">
            <div class="form-group">
              <input class="form-control" type="text" v-model="newMessageBody" />
            </div>
            <input class="btn btn-primary" type="submit" value="Create Message" />
          </form>
        </div>
        <div class="col-md-6 offset-md-1 mt-md-0 mt-5">
          <h1>All Messages</h1>
          <div class="jumbotron mt-1 py-2" v-for="message in messages" :key="message.body">
            <p class="lead">
              <strong>{{ message.name }}</strong>
              : {{ message.created_at }}
            </p>
            <p>{{ message.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  name: "MessagesBox",
  data: function() {
    return {
      messages: [],
      newMessageBody: ""
    };
  },
  created: function() {
    axios.get("/api/messages").then(response => {
      this.messages = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        console.log("Disconnected");
      },
      received: data => {
        console.log("Data from MessagesChannel:", data);
        this.messages.unshift(data);
      }
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        body: this.newMessageBody
      };
      axios.post("/api/messages", params).then(response => {
        this.newMessageBody = "";
        // this.messages.unshift(response.data);
      });
    }
  }
};
</script>