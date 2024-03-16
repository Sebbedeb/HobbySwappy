import { Ware } from "../Types";
import React from "react";

interface DisplayWareProps {
    ware: Ware;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, wareId: number) => void
}

const DisplayWare: React.FC<DisplayWareProps> = ({ ware, handleClick }) => {
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    
    // Only render the ware if it belongs to another user
    if (ware.userId !== userId) {
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
    } else {
        // Return null if the ware belongs to the current user
        return null;
    }
}

export default DisplayWare;
