import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth";

// PersistLogin est appelé à chaque fois qu'on charge une route protégée
// Si le state ne contient plus d'accessToken (donc si on a rechargé la page) il va
// Automatiquement renvoyer une requete (avec le refreshToken du Cookie htttp only  )
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth()

    useEffect(() => {

        let isMounted = true

         const verifyRefreshToken = async () => {
            try{
                console.log("launch refresh :")
                await refresh();
            }catch(err){
                console.error(err)
            }
            finally{
               isMounted && setIsLoading(false)
            }
         }

         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

         return () => isMounted = false
    }, [])

    useEffect(() => {
        console.log(`isLoading : ${isLoading}`)
        console.log(`authToken : ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]);

    return (
        <>
            {!persist ? <Outlet /> : isLoading
                    ? <p>Loading...</p>
                    : <Outlet/>
            }
        </>
    )
  
}

export default PersistLogin