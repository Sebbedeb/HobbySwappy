import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_WARE } from '../services/WareServices';

interface CreateWareProps {
    setOpenWareId: (wareId: number) => void; // Updated prop name
}

function CreateWare({ setOpenWareId }: CreateWareProps): JSX.Element {
    const [createWare] = useMutation(CREATE_WARE);

    const [formData, setFormData] = useState({
        wareTitle: '',
        wareDescription: '',
        warePrice: '',
        wareCategory: '',
        imgName: 'DefaultWarePhoto.png'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCancel = () => {
        setOpenWareId(0); // Updated function name
    }

    const handleCreate = async () => {
        console.log("Creating ware: ", formData);
        await createWare({
            variables: {
                wareTitle: formData.wareTitle,
                wareDescription: formData.wareDescription,
                warePrice: parseInt(formData.warePrice),
                wareCategory: parseInt(formData.wareCategory),
                userId: parseInt(localStorage.getItem('userId') as string), // Use radix 10
                imgName: formData.imgName
            }
        });
        setOpenWareId(0); // Updated function name
    }
    
    return (
        <div>
            <h2>Create Ware</h2>
            <div>
                <label htmlFor="wareTitle">Ware Title</label>
                <input type="text" id="wareTitle" name="wareTitle" value={formData.wareTitle} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="wareDescription">Ware Description</label>
                <input type="text" id="wareDescription" name="wareDescription" value={formData.wareDescription} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="warePrice">Ware Price</label>
                <input type="text" id="warePrice" name="warePrice" value={formData.warePrice} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="wareCategory">Ware Category</label>
                <input type="text" id="wareCategory" name="wareCategory" value={formData.wareCategory} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="imgName">Image Name</label>
                <input type="text" id="imgName" name="imgName" value={formData.imgName} onChange={handleChange} />
            </div>
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default CreateWare;
