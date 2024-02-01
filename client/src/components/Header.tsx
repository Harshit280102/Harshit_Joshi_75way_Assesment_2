import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/services/Hooks";
import { logout, selectAuth } from "../redux/services/authslice";


export const Header:React.FC =()=>{
  const {authToken} = useAppSelector(selectAuth);
  const dispatch =useAppDispatch();
  
  const handlelogout =()=>{
    dispatch(logout());

  }
  

    return(
        <main className="text-center bg-gray- rounded shadow-xl">
        <header className="flex justify-between  py-6 mx-12 mb-10 font-xl ">
       <Link to="/" className="font-roboto font-bold text text-xl bg-black  bg-clip-text p-2">Store Appointment </Link>
       <nav>
          {!authToken ? 
          <div className='flex gap-3  items-center'>
            <button className=' bg-transparent hover:bg-violet-700 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded'><Link to="/login" >LogIn</Link></button> 
         <button className='bg-transparent hover:bg-violet-700 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded'><Link to="/register">Register</Link></button></div> :
         <button className=' bg-transparent hover:bg-violet-700 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded' onClick={handlelogout}>Logout</button> 
}
         </nav>
     </header >
         </main>
        
        
    )
}
