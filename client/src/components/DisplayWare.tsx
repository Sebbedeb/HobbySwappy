import { Ware } from "../Types";

interface DisplayWareProps {
    ware: Ware;
    handleClick : (event: React.MouseEvent<HTMLDivElement, MouseEvent>, wareId: number) => void
}

function DisplayWare({ ware, handleClick}: DisplayWareProps): JSX.Element {
    return ( 
        <div key={ware.wareId} className="wareItem" >
        <div className="wareContainer" onClick={(event) => handleClick(event, ware.wareId)}>
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