import { Routes, Route, Link } from 'react-router-dom';
import Movies from './pages/Movies';
import EditMovie from './components/EditMovie';
import AddMovie from './components/AddMovie';
import Subscriptions from './pages/Subscriptions';
import AddSub from './components/AddSub';
import Users from './pages/Users';
import AddUser from './components/AddUser';
import EditMember from './components/EditMember';
import EditUser from './components/EditUser';
import AddSubForMember from './components/AddSubForMember';
import Login from './components/login'; // Import the Login component

import './App.css';

const App = () => {
  return (
    <>
      <nav>
        <Link to="/"><h1>My Project</h1></Link>
        <ul>
          <li><Link to="/movies">Movies Page</Link></li>
          <li><Link to="/subs">Subscriptions Page</Link></li>
          <li><Link to="/users">Users Page</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Welcome to My Project!</h1>
              <Login /> {/* Display Login component on the main page */}
            </>
          } />
          <Route path="/movies/*" element={<Movies />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/editMovie/:id" element={<EditMovie />} />
          <Route path="/subs/*" element={<Subscriptions />} />
          <Route path="/addSub" element={<AddSub />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editMember/:id" element={<EditMember />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="/addMemberSub/:id" element={<AddSubForMember />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
