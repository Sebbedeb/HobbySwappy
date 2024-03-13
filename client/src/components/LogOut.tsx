import { useUserContext } from "../context/CurrentUserContext";

function LogOut() {
    const { setUserId } = useUserContext();
    return ( 
        <div>
            <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setUserId(0);
                window.location.reload();
            }}>Log Out</button>
        </div>
     );
}

export default LogOut;