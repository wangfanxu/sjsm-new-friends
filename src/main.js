import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import { projectAuth } from "./firebase/config";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
//global styles
import "./assets/main.css";

const application = createApp(App);

// 安装 PrimeVue
application.use(PrimeVue);

// 注册 PrimeVue 组件
application.component("DataTable", DataTable);
application.component("Column", Column);
application.component("Dialog", Dialog);

// 监听身份验证状态变化
let isFirstTimeLogin = false;
projectAuth.onAuthStateChanged(() => {
  // 如果是第一次登录，挂载应用程序
  if (!isFirstTimeLogin) {
    application.use(router).mount("#app");
    isFirstTimeLogin = true;
  }
});
