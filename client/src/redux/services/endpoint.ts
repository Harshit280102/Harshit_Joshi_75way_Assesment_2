import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface Job{
    _id:string,
    title:string,
    description:string,
    categoryName:string,
    owner:string,
    ppl_Applied:string[],
}

export const apiEndpoint =createApi({
    reducerPath:'apiEndpoint',
    baseQuery:fetchBaseQuery(
        {
            baseUrl:'http://localhost:4000/',
            prepareHeaders:(headers,{getState})=>{
                const authToken=(getState() as RootState).auth.authToken;
                const refreshToken=(getState() as RootState).auth.refreshToken;
                if(authToken && refreshToken){
                    console.log(`Bearer ${authToken}+${refreshToken}`)
                    headers.set("authorization",`Bearer ${authToken}+${refreshToken}`);
                }
                return headers;
            }
        }
    ),
    endpoints:(builder)=>({

        RegisterUser:builder.mutation({
            query:(payload:{name:string;email:string;password:string})=>{
                return{
                    url:"user/register",
                    method:'POST',
                    body:payload,
                }
            }
        }),
        
        SigninUser:builder.mutation({
            query:(payload:{email:string;password:string})=>{
                return{
                    url:"user/signin",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        RegisterEmployee:builder.mutation({
            query:(payload:{name:string;email:string;password:string;store_id:string})=>{
                return{
                    url:"/employee/register",
                    method:'POST',
                    body:payload,
                }
            }
        }),
        
        SigninEmployee:builder.mutation({
            query:(payload:{email:string;password:string})=>{
                return{
                    url:"/employee/signin",
                    method:'POST',
                    body:payload,
                }
            }
        }),


        createIntrest:builder.mutation({
            query:(payload:{intrest:string})=>{
                return{
                    url:"createintrest",
                    method:'POST',
                    body:payload,
                    headers:{"Content-type":"application/json"},
                }
            }
        }),

        getJobs:builder.query<Job[],void>({
            query:()=> "jobs"
        }),

    })
})

export const {useRegisterUserMutation, 
    useSigninUserMutation, 
    useCreateIntrestMutation,
    useGetJobsQuery,
    useRegisterEmployeeMutation,
    useSigninEmployeeMutation} =apiEndpoint;