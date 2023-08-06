
import './App.css';
import Movies from './Forms/Components/Movies';
import Playlist from './Forms/Components/Playlist';
import Home from './Forms/Components/Home';
import Login from './Forms/Components/Login';
import{Routes,Route, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div>
   
      <BrowserRouter>
      <Routes>
        <Route exact path='/home' Component={Home}></Route>
        <Route exact path='/login' Component={Login}></Route>
        <Route exact path='/movies' Component={Movies}></Route>
        <Route exact path='/playlist' Component={Playlist}></Route>
        </Routes>
      
      </BrowserRouter>
      </div>
    
  )
}

export default App;
