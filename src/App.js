import './App.css';
import LoginApi from './api/LoginApi';
import Register from './api/Register';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Home from './components/Home';
import LinkPage from './components/LinkPage';
import Lounge from './components/Lounge';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Admin from './components/Admin';

import PersistLogin from "./components/PersistLogin"
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  "User": "2001",
  "Editor": "1984",
  "Admin": "5150"
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/> }>
          {/* Public routes */}
          <Route path='login' element={<LoginApi />}/>
          <Route path='register' element={<Register />}/>
          <Route path='linkpage' element={<LinkPage />}/>
          <Route path='unauthorized' element={<Unauthorized />}/>

          {/* We want to protect these routes */}
          <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                  <Route path='/' element={<Home/>}/>
              </Route>
              
              <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
                  <Route path='editor' element={<Editor />}/>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                  <Route path='admin' element={<Admin />}/>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>}>
                  <Route path='lounge' element={<Lounge />}/>
              </Route>
          </Route>

          {/* Catch all */}
          <Route path='*' element={<Missing />}/>
      </Route>
    </Routes>
  );
}

export default App;
