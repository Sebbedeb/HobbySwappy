// MyWaresPage.js
import React, { useEffect, useState } from 'react';
import { GET_WARES_BY_USER_ID } from '../services/WareServices';
import { useQuery } from '@apollo/client';
import { Ware } from '../Types';
import DisplayWare from '../components/DisplayWare';
import EditWare from '../components/EditWare';
import CreateWare from '../components/CreateWare';
import RouteProtector from '../routes/RouteProtector';

const MyWares = () => {

  RouteProtector();
  const userId = parseInt(localStorage.getItem('userId') || '0', 10); // Use radix 10

  const [openWareId, setOpenWareId] = useState<number>(0);

  const { data, loading, error, refetch } = useQuery(GET_WARES_BY_USER_ID, {
    variables: {
      userId: userId
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, wareId: number) => {
    console.log("Clicked on ware with id: " + wareId);
    setOpenWareId(wareId);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading");
    }
    if (error) {
      console.log("error: ", error.message); // Use error message property
    }
    if (data) {
      console.log("data ", data);
    }
    if(openWareId === 0) {
      console.log("Refetching data");
      refetch();
    }

  }, [data, loading, error, openWareId, refetch]);

  return (
    <div>
      <h2>My Wares Page</h2>
      {openWareId !== -1 && <button onClick={() => setOpenWareId(-1)}>Create New Ware</button>}
         {openWareId === -1 && (<CreateWare setOpenWareId={setOpenWareId} />)}


      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="waresContainer">
        {data && data.waresByUserId.map((ware: Ware) => (
          openWareId === 0 ? (
            <DisplayWare key={ware.wareId} ware={ware} handleClick={handleClick} />
          ) : (
            openWareId === ware.wareId && (
              <EditWare ware={ware} setOpenWareId={setOpenWareId} />
            )
          )
        ))}
        

      </div>
    </div>
  );
}

export default MyWares;
