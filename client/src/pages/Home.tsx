
import { useAppSelector } from "../redux/services/Hooks";
// import ErrorBoundary from "../Error.Boundary";
import {  selectAuth } from "../redux/services/authslice";
import { useNavigate } from "react-router-dom";

//Role Render Components
import {Admin} from "../components/role_render/Admin";
import { User } from "../components/role_render/User";
import { Employee } from "../components/role_render/Employee";
import { useEffect ,useState} from "react";

export const Home:React.FC =()=>{
   
    const [name,setName] = useState<string>("") ;
    const [role,setRole] = useState<string>("") ;
    const [loading,isLoading] = useState<Boolean>(false) ;


    const navigate =useNavigate();
    // const dispatch =useAppDispatch();

  useEffect(()=>{
    const local:any = localStorage.getItem("user");
    console.log(local) ;
    if(local)   {
      const localObject = JSON.parse(local) ;
      setName(localObject.name) ;
      setRole(localObject.role) ;
    }
    isLoading(true) ;
  },[])

  const {authToken,refreshToken}=useAppSelector(selectAuth);
 
    const handleEmp =()=>{
        navigate("emp/register");
    }
    const handleAdmin =()=>{
      navigate("/admin");
    }

    
    
  
    return(
        <section className="w-full max-w-xs mx-auto mt-4">
            <div>
            <h1 className='text-center text-2xl pb-4 font-bold text-violet-700'>Welcome to the Home Page</h1>
            </div>
            <div>

            {
              loading ? <div className="">
            {
              authToken&&refreshToken ?(
                <div className="flex justify-center items-center">

                <div className="flex flex-col">
                    <h2 className='text-center text-l pb-4font-medium'>{name}</h2>
                    <div className="">
                      {
                        role=="Admin"?(<Admin/>):(role=="User"?(<User/>):(<Employee/>))
                      }
                    </div>
                    
                </div>
              
                </div>
              ):(
                <div>
                    <h4 className='text-center text-xl font-semibold'>You are Not Signed In</h4>
                </div>
              )
              }
              </div>  : <div className=""></div>
            }
            </div>
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


