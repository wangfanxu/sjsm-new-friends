import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrmieVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';

//global styles
import "./assets/main.css";
const application = createApp(App);
application.use(router).mount("#app");
application.use(PrmieVue);
application.component("DataTable", DataTable);
application.component("Column", Column);
