import React, { useState } from 'react';
import { Ware } from '../Types';
import { EDIT_WARE, DELETE_WARE } from '../services/WareServices';
import { useMutation } from '@apollo/client';


interface EditWareProps {
    ware: Ware;
    setOpenWareId: (wareId: number) => void;
}

function EditWare({ ware, setOpenWareId }: EditWareProps): JSX.Element {

    const [editWare] = useMutation(EDIT_WARE);
    const [deleteWare] = useMutation(DELETE_WARE);

    const [formData, setFormData] = useState({
        wareTitle: ware.wareTitle,
        wareDescription: ware.wareDescription,
        warePrice: ware.warePrice.toString(),
        wareCategory: ware.wareCategory.toString(),
        imgName: ware.imgName
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target);
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCancel = () => {
        setOpenWareId(0);
    }

    const  handleUpdate = async () => {
        await editWare({
            variables: {
                wareId: ware.wareId,
                wareTitle: formData.wareTitle,
                wareDescription: formData.wareDescription,
                warePrice: parseInt(formData.warePrice),
                wareCategory: parseInt(formData.wareCategory),
                imgName: formData.imgName as string
            }
        });
        setOpenWareId(0);
    }
    
    const handleSell = async () => {
        await deleteWare({
            variables: {
                wareId: ware.wareId
            }
        });
        setOpenWareId(0);
    }



    return (
        <div>
            <h2>Edit Ware</h2>
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
                <label htmlFor="imgName">Ware Image</label>
                <input type="text" id="imgName" name="imgName" value={formData.imgName} onChange={handleChange} />
            </div>
            <div>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSell}>Sell</button>
            </div>
        </div>
    );
}

export default EditWare;
