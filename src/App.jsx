import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import YajmanDashboard from "./pages/yajmanDashboard/YajmanDashboard";
import { ProtectedRouteForYajman } from "./protectedRoute/ProtectedRouteForYajman";
import PurohitRegistration from "./pages/purohitdashboard/PurohitRegistration";
import ZonalPurohitAdmin from "./pages/admin/zonalpurohit/ZonalPurohitAdmin";
import PurohitDashboard from "./pages/purohitdashboard/PurohitDashboard";
import { ProtectedRouteForPurohit } from "./protectedRoute/ProtectedRouteForPurohit";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purohitregistration" element={<PurohitRegistration />} /> {/* for redirecting to user dashboard after login */}
          <Route path="/category/:categoryname" element={<CategoryPage />} />  {/* category Page route  */}
    
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/purohitdashboard" element={
            <ProtectedRouteForPurohit>
              <PurohitDashboard />
            </ProtectedRouteForPurohit>
          } />
           <Route path="/yajman-dashboard/*" element={
           <ProtectedRouteForYajman>
             <YajmanDashboard />
           </ProtectedRouteForYajman>
            } />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/zonalpurohit" element={
      
              <ZonalPurohitAdmin />
       
          } />
         
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
