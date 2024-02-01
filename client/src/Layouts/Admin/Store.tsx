import {useState,useEffect} from 'react';
import {useCreateStoreMutation} from "../../redux/services/endpoint";
import { useNavigate } from 'react-router-dom';


export const Store:React.FC =()=>{

    const [storeName,setStorename] =useState<string>("");
    const [open,setOpen]=useState<string>("");
    const [close,setClose]=useState<string>("");
    
    console.log(open);
    console.log(storeName);
    console.log(close);


  
    const navigate=useNavigate();


  
    const [createStore,responseInfo]=useCreateStoreMutation();
  

    async function submitUser(event:React.FormEvent<HTMLFormElement>){
      event.preventDefault();

     try{

    
      await createStore({storeName,open,close });
     }catch(err){
      window.alert(err);
     }
    }
  
    useEffect(()=>{
      if(responseInfo.isSuccess){
        window.alert(`${responseInfo.data.name}`);
        navigate("/")
      }
      if(responseInfo.isError){
        window.alert(`Error in User Registeration`);
      }
    },[responseInfo.isSuccess,responseInfo.isError])




    
    
return(
        <div className="w-full max-w-xs mx-auto mt-10">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={(e)=>submitUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Create Store</h3>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Store Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            type="text" 
            value={storeName}
            onChange={(e)=>setStorename(e.target.value)}
            placeholder="Store Name" 
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Opening Time
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="text" 
             value={open}
             onChange={(e)=>setOpen(e.target.value)}
             placeholder="12:00 Noon"/>
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="text" 
             value={close}
             onChange={(e)=>setClose(e.target.value)}
             placeholder="08:00 PM"/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Create Store
            </button>
        
          </div>
        </form>
    
      </div>
    )}