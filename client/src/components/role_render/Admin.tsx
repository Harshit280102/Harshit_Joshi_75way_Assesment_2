import { useNavigate } from 'react-router-dom';



export const Admin:React.FC =()=>{

const navigate=useNavigate();

async function handleemployee(){
    navigate('/addemp')
}
async function  handlestore (){
    navigate('/newstore')
}

    
    
return(
        <div className="w-full max-w-xs mx-auto mt-20">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className='text-center text-3xl pb-6 font-bold text-blue-900'>Admin Portal</h3>
          <div className="justify-center items-center text-center ">
            <button className="bg-violet-700 items-center text-white font-semibold py-2 p-4 m-4 rounded focus:outline-none focus:shadow-outline transition  hover:delay-300  hover:bg-blue-700 ease-in-ou" onClick={handlestore}>New Store</button>
            <button className="bg-violet-700 items-center text-white font-semibold py-2 p-4 m-4 rounded focus:outline-none focus:shadow-outline transition  hover:delay-300  hover:bg-blue-700 ease-in-ou" onClick={handleemployee}>Add Employee</button>
          </div>
        </form>
    
      </div>
  
)
}
  