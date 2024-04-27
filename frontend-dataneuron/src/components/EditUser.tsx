import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Modal from 'react-modal';


export interface Data {
    user:any ;
    onClose:() => void;
    type : string;
    isOpen: boolean ;
}

export function EditUser({ isOpen ,user, onClose , type}: Data) {
    const [editEntries , setEditEntries] = useState({
        name:user.name ,
        email: user.email
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditEntries((prevValues) => ({ ...prevValues, [name]: value }));
      };
    
    const handleUpdateUser = async () => {
        try {
          await axios.put(
            `${BACKEND_URL}/api/v1/${type}`,
            editEntries
          );
          onClose();
        } catch (error) {
          console.error("Error updating user:", error);
        }
      };
    return <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Data Modal">
         
        <h2>Edit Data</h2>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={editEntries.name} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="number" id="age" name="age" value={editEntries.email} onChange={handleInputChange} />
        </div>
        <button onClick={handleUpdateUser}>Save</button>
    </Modal>
}
