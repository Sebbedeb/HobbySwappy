import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_WARES } from "../services/WareServices";
import { useState } from "react";
import { Ware } from "../Types";
import "../styles/WarePage.css";
import { useNavigate } from "react-router-dom";
import DisplayWare from "../components/DisplayWare";

function WarePage() {
    const [categoryId, setCategoryId] = useState<number>(0);

    const { data, loading, error } = useQuery(GET_WARES, {
        variables: {
            categoryId: categoryId
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            console.log("Loading");
        }
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }, [data, loading, error]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, wareId: number) => {
        navigate(`/ware/${wareId}`); // Redirect to Ware component with wareId as part of the URL
    }

    return (
        <div>
            <h1>Wares</h1>
            <button onClick={() => setCategoryId(1)}>Nerdy Stuff</button>
            <button onClick={() => setCategoryId(2)}>Creative Stuff</button>
            <button onClick={() => setCategoryId(3)}>Sports</button>
            <button onClick={() => setCategoryId(0)}>All</button>

            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}


            <div className="waresContainer">
            
                {data && data.wares.map((ware: Ware) => (
                    <DisplayWare ware={ware} handleClick={handleClick} />
                ))}

            </div>
        </div>
    );
}

export default WarePage;
