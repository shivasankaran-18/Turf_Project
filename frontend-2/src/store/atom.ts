
import axios from "axios"
import {atom,selector} from "recoil"
import { BACKEND_URL } from "../config"

export const userDetails=atom({
    key:"user",
    default:selector({
        key:"users",
        get:async()=>{
            const res=await axios.get(`${BACKEND_URL}/api/user/detail`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            return res.data
        }
    })
})