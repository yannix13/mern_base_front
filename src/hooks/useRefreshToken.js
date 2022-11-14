import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {

        try {

            const response = await axios.get('/api/refreshtoken');
    
            setAuth(prev => {
                console.log('refresh log prev :')
                console.log(JSON.stringify(prev))
                console.log('refresh log token :')
                console.log(response.data.token)
                return {
                    ...prev, 
                    role: response.data.role,
                    accessToken: response.data.token}
            })
    
            return response.data.token

        } catch (err) {
            console.error(err)
        }

   
    }

  return refresh
}

export default useRefreshToken