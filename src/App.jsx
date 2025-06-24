import MovieCard from './components/MovieCard'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <div>
      <Navbar />
    <main className = 'name-content'>
    <Routes>
      <Route path = '/' element = {<Home/>}></Route>
      <Route path = '/favourites' element = {<Favourites/>}></Route>
    </Routes>
    </main>
  </div>
  )
}


export default App

