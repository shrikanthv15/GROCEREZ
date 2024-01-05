import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomePage.vue';
import AboutView from '../views/AboutView.vue';
import LoginPage from '../views/LoginPage.vue';
import ProductPage from '../views/AdminHomePage.vue'
import AddCategoryPage from '../views/AddCategory.vue';
import AddProduct from '../views/AddProduct.vue';
import UserHome from '../views/UserHomePage.vue';
import CartPage from '../views/CartPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import EditProduct from '../views/EditProducts.vue';
import EditCategory from '../views/EditCategory.vue';
import UserOrder from '../views/OrderSummary.vue';
import ManagerList from '../views/ManagerAccept.vue';
import SearchResults from '../views/SearchResult.vue';
import SendRequest from '../views/SendRequest.vue';
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/login', component: LoginPage},
  { path: '/products' , component: ProductPage},
  { path: '/addcategory' , component: AddCategoryPage},
  {path: '/addproduct', name: 'AddProduct', component: AddProduct},
  { path: '/userhome' , component: UserHome},
  { path: '/cartpage/:userId' ,name: 'CartPage', component: CartPage},
  { path: '/register' ,name: 'RegsiterPage', component: RegisterPage},
  { path: '/editproduct/:productId' ,name: 'EditProduct', component: EditProduct},
  { path: '/editcategory/:categoryId' ,name: 'EditCategory', component: EditCategory},
  { path: '/userorder/:userId' ,name: 'userorder', component: UserOrder},
  { path: '/managerlist' ,name: 'managerlist', component: ManagerList},
  { path: '/search-results', name: 'SearchResults', component: SearchResults,},
  { path: '/send-request' ,name: 'sendrequest', component: SendRequest},
   // Add the new route
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
