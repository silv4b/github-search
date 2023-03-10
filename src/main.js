import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import InitialPage from './pages/InitialPage.vue';
import DetailPage from './pages/DetailPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: InitialPage },
    { path: '/search', name: 'search', component: DetailPage }
  ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');
