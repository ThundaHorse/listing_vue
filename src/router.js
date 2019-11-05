import Vue from "vue";
import Router from "vue-router";

import Postings from "./views/postings/Postings.vue";
import NewPost from "./views/postings/NewPost.vue";
import ShowPosting from "./views/postings/ShowPosting.vue";
import UserPosts from "./views/postings/UserPosts.vue";
import EditPost from "./views/postings/EditPost.vue";

import Home from "./views/Home.vue";

import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

import Cart from "./views/cart/Cart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "messages", component: Home },
    { path: "/postings", name: "postings", component: Postings },
    { path: "/edit/:id", name: "editPost", component: EditPost },
    { path: "/postings/:id", name: "showPosting", component: ShowPosting },
    { path: "/user_listings", name: "userPosts", component: UserPosts },
    { path: "/cart", name: "cart", component: Cart },
    { path: "/newpost", name: "newPost", component: NewPost },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }
  ]
});
