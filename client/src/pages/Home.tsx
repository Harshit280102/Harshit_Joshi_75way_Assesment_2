
import { useAppDispatch, useAppSelector } from "../redux/services/Hooks";
import ErrorBoundary from "../Error.Boundary";
import { logout,selectAuth } from "../redux/services/authslice";
import { useNavigate } from "react-router-dom";


export const Home:React.FC =()=>{
    const {name,authToken,refreshToken}=useAppSelector(selectAuth);
    const navigate =useNavigate();
    // const dispatch =useAppDispatch();
 
    const handleIntrest =()=>{
        navigate("/intrest");
    }
    const handleEmp =()=>{
        navigate("emp/register");
    }
    const handleAdmin =()=>{
      navigate("/admin");
    }
    
  
    return(
        <section className="w-full max-w-xs mx-auto mt-10">
            <ErrorBoundary>
            <div>
            <h1 className='text-center text-3xl pb-6 font-bold text-violet-700'>Welcome to the Home Page</h1>
            <h2 className='text-center text-3xl pb-6 font-bold'>{name}</h2>
            </div>
            </ErrorBoundary>
            {
              authToken&&refreshToken ?(
                <div className="flex justify-center items-center">
                
                <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit"
                onClick={()=>handleIntrest()}
                >See All Stores</button>
                
                </div>
                
              ):(
                <div>
                    <h4 className='text-center text-xl font-semibold'>You are Not Signed In</h4>
                </div>
              )}
              <div className="absolute bottom-0 m-6">
              <button className=" text-zinc-700 px-4" type="submit"
                onClick={handleEmp}
                >Register as a Employee ?</button>
               <button className=" text-zinc-700 px-4" type="submit"
                onClick={handleAdmin}>Admin Sign In ?</button>
              </div>
            
        </section>
    )
}