import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreateNewFriend from "@/views/newFriends/CreateNewFriend.vue";
import ManageNewFriend from "@/views/newFriends/ManageNewFriend.vue";
import getUser from "@/composables/getUser";

//route guard
import { projectAuth } from "@/firebase/config";

const requiredAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: requiredAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/new-friend/create",
    name: "CreateNewFriend",
    component: CreateNewFriend,
  },
  {
    path: "/new-friend/manage",
    name: "ManageNewFriend",
    component: ManageNewFriend,
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const { user } = getUser();

export default router;
