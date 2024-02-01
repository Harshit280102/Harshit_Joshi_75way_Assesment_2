import { useEffect, useState } from 'react';
import {useRegisterEmployeeMutation} from '../../redux/services/endpoint';
import { useNavigate } from 'react-router-dom';




export const Registeremp:React.FC =()=>{
  const [username,setUsername] =useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [store,setStore]=useState<string>("");


  const navigate=useNavigate();

  const [createEmp,responseInfo]=useRegisterEmployeeMutation();

  console.log(username);
  console.log(email);
  console.log(password);
  console.log(store);

  async function submitUser(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
   try{
    // const valid = await userSchema.validate(you);
  
    await createEmp({ name:username,email,password,store_id:store});
   }catch(err){
    window.alert(err);
   }
  }

  useEffect(()=>{
    if(responseInfo.isSuccess){
      window.alert(`${responseInfo.data.Employee_create.name} you are now a Registered Employee in ${responseInfo.data.store_located.storeName}`);
      navigate("/emp/login")
    }
    if(responseInfo.isError){
      window.alert(`Error in Employee Registeration`);
    }
  },[responseInfo.isSuccess,responseInfo.isError])

    return(
        <div className="w-full max-w-xs mx-auto mt-10">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={(e)=>submitUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Register Employee</h3>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Employee Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            type="text" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username" 
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Email
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="Email" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="example.12@gmail.com"/>
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             placeholder="*********"/>
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Store-Id
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="store" 
             value={store}
             onChange={(e)=>setStore(e.target.value)}
             placeholder="enter your store ID"/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Register
            </button>
        
          </div>
        </form>
    
      </div>
    )
}