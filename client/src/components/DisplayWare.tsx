import { Ware } from "../Types";
import React from "react";

interface DisplayWareProps {
    ware: Ware;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, wareId: number) => void
}

const DisplayWare: React.FC<DisplayWareProps> = ({ ware, handleClick }) => {
    console.log(ware);
    
        return (
            <div key={ware.wareId} className="wareItem" onClick={(event) => handleClick(event, ware.wareId)}>
                <div className="wareContainer">
                    <div className='warePhoto'>
                        {ware.imgName !== "DefaultWarePhoto.png" ? (
                            <img src={ware.imgName} alt={ware.wareTitle} />
                        ) : (
                            <img src="images/DefaultWarePhoto.png" alt={ware.wareTitle} />
                        )}
                    </div>
                    <div className='wareTitle'>{ware.wareTitle}</div>
                    <div className='warePrice'>${ware.warePrice}</div>
                </div>
            </div>
        );
    } 


export default DisplayWare;
