import { useNavigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
function Navbar() {

    return(
        <nav className = 'flex items-center justify-between bg-blue-600 p-4'>
            <div className="AppName text-4xl">MoviesApp</div>
                <div className="links ">
                    <ul className = 'flex items-center, justify-between gap-20'>
                        <li> <Link to = '/'>Home</Link></li>
                        <li><Link to = '/favourites'>Favourites</Link></li>
                    </ul>
                </div>

        </nav>
    )
}



export default Navbar