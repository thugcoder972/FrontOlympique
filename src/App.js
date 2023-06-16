import Navbar from './/components/Navbar/NavBar'
import './App.css';
import Cart from './components/Cart/Cart';
import{Routes,Route} from "react-router-dom";
import Home from "./components/Home/Home";
import News from "./components/News/News";
import Top from "./components/Top/Top";
import Category from "./components/Category/Category";
import DetailsProducts from "./components/Home/Components/Products/DetailsProducts";

function App() {
  return (
   <><Navbar />
   <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/News' element={<News/>} />
      <Route path='/Top' element={<Top/>} />
      <Route path='/Category' element={<Category/>} />
      <Route path='/cart' element={<Cart />}/>
      <Route path='/DetailsProducts' element={<DetailsProducts />}/>
    </Routes>
    </>
  );
}

export default App;
