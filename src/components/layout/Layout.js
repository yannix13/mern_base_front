import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <main className="App"> 
        <Navbar/>
        <div className="content_app" >
          <Sidebar/>
          <Outlet />
        </div>
    </main>
  )
}

export default Layout