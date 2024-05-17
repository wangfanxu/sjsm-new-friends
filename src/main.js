import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrmieVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import { projectAuth } from "./firebase/config.firebase";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
//global styles
import "./assets/main.css";

const application = createApp(App);
application.use(PrmieVue);
application.component("DataTable", DataTable);
application.component("Column", Column);
application.component("Dialog", Dialog);

let isFirstTimeLogin = false;
projectAuth.onAuthStateChanged(() => {
  if (!isFirstTimeLogin) application.use(router).mount("#app");
  isFirstTimeLogin = true;
});
