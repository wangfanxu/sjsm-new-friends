import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.view.vue";
import Login from "../views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import createSeeker from "@/views/newFriends/CreateNewFriend.view.vue";
import ManageSeekers from "@/views/newFriends/ManageNewSeeker.view.vue";
import ManageMySeekers from "@/views/newFriends/ManageMySeeker.view.vue";

//route guard
import { projectAuth } from "@/firebase/config.firebase";

const requiredAuth = (_to, _from, next) => {
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
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/new-friend/create",
    name: "createSeeker",
    component: createSeeker,
  },
  {
    path: "/new-friend/manage",
    name: "ManageSeekers",
    component: ManageSeekers,
    beforeEnter: requiredAuth,
  },
  {
    path: "/new-friend/:userId/manage",
    name: "ManageMySeekers",
    component: ManageMySeekers,
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
