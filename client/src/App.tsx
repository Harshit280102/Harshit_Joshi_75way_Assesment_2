import {Route, Routes} from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./components/role_auth/user/Login";
import { Register } from "./components/role_auth/user/Register";
import {Loginemp} from "./components/role_auth/emp/Loginemp";
import { Registeremp } from "./components/role_auth/emp/Registeremp";
import {SignInadmin} from "./components/role_auth/admin/SignInadmin";
function App() {

  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='emp/login' element={<Loginemp/>}/>
      <Route path='emp/register' element={<Registeremp/>}/>
      <Route path='admin' element={<SignInadmin/>}/>
      {/* <Route path='intrest' element={<CreateIntrest/>}/>
      <Route path='jobs' element={<Job/>}/> */}
    </Route>
    </Routes>
    
  )
}

export default App
