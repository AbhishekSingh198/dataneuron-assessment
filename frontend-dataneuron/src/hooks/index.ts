import { useEffect , useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export interface Data {
    "name": string;
    "email": string
}

export const useCount = ({type}:{type : "admin" | "customer" | "employee"}) => {
    const [loadingCount, setLoadingCount] = useState(true);
    const [count, setCount] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/count/${type === "admin" ? "a" : (type === "customer" ? "c" : "e")}`)
            .then(response => {
                setCount(response.data.count);
                setLoadingCount(false);
            })
    }, [])

    return {
        loadingCount,
        count
    }
}

export const useData = ({type}:{type : "admin" | "customer" | "employee"}) => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState<Data[]>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/${type === "admin" ? "admin" : (type === "customer" ? "customer" : "employee")}`)
            .then(response => {
                setData(response.data.admins);
                setLoadingData(false);
            })
    }, [])

    return {
        loadingData,
        data
    }
}