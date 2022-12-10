import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

const ProtectRoute =({children})=>{
    const {username,email,userId} = useSelector(store=>store.user)

    if(!username||!email||!userId){
         return <Navigate to='/auth'/>
    }

    return children
}

export default ProtectRoute