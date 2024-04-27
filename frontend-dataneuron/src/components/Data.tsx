import { ChangeEvent, useState } from "react";
import { useData , useCount } from "../hooks";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Data = ({type} : {type :"employee" | "admin" | "customer"}) => {
    const {loadingCount , count} = useCount({type}) ;
    const [edit, setEdit] = useState({
        name:"",
        email: ""
    });

    const [makechange , setMakechange] = useState(false) ;
    const {data} = useData({type}) ;
    const TABLE_HEAD = ["Name", "Email", "Edit"];
    const [prevEmail, setPrevEmail] = useState<string>("");
    const [postInputs, setPostInputs] = useState({
        name: "",
        email: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/${type}`, postInputs);
            alert(`${response?.data.id}` + "  Unique Id created for the data you added")
        } catch(e) {
            alert("Error while Adding data")
            // alert the user here that the request failed
        }
    }
    
    const  editRequest =  (item : any) =>{
        setEdit(item) ;
        setPrevEmail(item.email);
        setMakechange(true) ;

    }


    const handleSave = async () => {
        try {
            await axios.put(
                `${BACKEND_URL}/api/v1/${type}`,
                edit , {
                    headers: {
                      'X-Prev-Email': prevEmail
                    }
                }    
            );
          
          
          setEdit({
            name:"",
            email: ""
          }); 

          setMakechange(false) ;
        } catch (error) {
          console.error('Error saving data:', error);
        }
    };

    const handleClose = async () => {
          setEdit({
            name:"",
            email: ""
          }); 
          setMakechange(false) ;
        
    };
    



    return <div className="flex justify-center flex-col overflow-auto rounded my-4 mx-4">
        <div className="flex justify-center pt-20">
            <div>
                <div className="px-4">
                    <div className="text-3xl font-extrabold">
                        Count
                    </div>
                    <div className="text-slate-500">
                        {loadingCount ? "Loading..." : count}
                    </div>
                </div>
                <div className="pt-4">
                    <div className="grid grid-cols-3">
                        <LabelledInput label="Name" placeholder="Abhishek Singh..." onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }}/> 
                        <LabelledInput label="Email" placeholder="abhishek@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }}/>
                        <button  onClick= {sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add</button>
                    </div>
                </div>
                <div>
                    <Card className="h-full w-full" placeholder={"undefined"}  onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div>
                                    <Typography variant="h5" color="blue-gray" placeholder={"undefined"}  onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                                        {type === "admin" ? "Admin " : (type === "customer" ? "Customer " : "Employee ")}Data
                                    </Typography>
                                    
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0" placeholder={"undefined"}  onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                    <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70" placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}                                    >
                                        {head}
                                    </Typography>
                                    </th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(
                                (item , index) => {
                                    const isLast = index === data?.length-1;
                                    const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                    
                                    return (
                                    <tr key={item?.email}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal" placeholder={"undefined"}  onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}                                                    >
                                                        {item?.name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70" placeholder={"undefined"}  onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}                                                    >
                                                        {item?.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
    
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text"  placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                                                    <PencilIcon  onClick={() =>editRequest(item)} className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                    );
                                },
                                )}
                            </tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                            <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                            Page 1 of 10
                            </Typography>
                            <div className="flex gap-2">
                            <Button variant="outlined" size="sm" placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm"  placeholder={"undefined"} onPointerEnterCapture={() => { console.log('on pointer enter') }} onPointerLeaveCapture={() => { console.log('on pointer enter') }}>
                                Next
                            </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
        {makechange && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Data</h2>
            <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={edit.name} onChange={(e) => {
                                setEdit({
                                    ...edit,
                                    name: e.target.value
                                })}} />
            </div>
            <div className="mb-4">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={edit.email} onChange={(e) => {
                                setEdit({
                                    ...edit,
                                    email: e.target.value
                                })}} />
            </div>
            <div className="flex justify-center flex-col">
                <button onClick={handleSave} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                <button onClick={handleClose} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
            </div>
            </div>
      </div>
      )}
    </div>


}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}