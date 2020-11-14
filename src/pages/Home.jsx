import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/topbar'

const Home = () => {
    return (
        <div>
            <Topbar/>
            <Link to='/login'>Logout</Link>
        </div>
    )
}

export default Home
