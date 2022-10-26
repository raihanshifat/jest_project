import {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import axiosInstance from '../axiosinstance'
import { useHistory } from 'react-router-dom'
const Home=()=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [articles,setArticles]=useState([])
    const history = useHistory();
    useEffect(()=>{
        const access_token=localStorage.getItem('access_token')
        const refresh_token=localStorage.getItem('refresh_token')
        if(access_token && refresh_token){
            setIsAuthenticated(true)
        }
    },[])
    useEffect(()=>{
        if(isAuthenticated){
            axiosInstance.get("blog/list")
            .then((res)=>{
                setArticles(res.data)
            })
        }

    },[isAuthenticated])

    const handleLogout=(e)=>{
        axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
    }
    return(
        <>

        {isAuthenticated?
        <>
        <button onClick={handleLogout}>
        logout</button>
        {articles?articles.map(article => {
          return(<div id={article.id} key={article.id}>
              {/* <img src={article.cover}/> */}
              <h1>{article.title}</h1>
              {/* <h5>{article.author.firstname}</h5> */}
              <p>{article.date}</p> 
              <p>{article.body}</p>
              </div> 
        )}):<></>}</>
        : 
        <div>
            <h1>Please login to view the homepage</h1> 
            <NavLink to="/signup">
                <Button>SignUp</Button>
            </NavLink>
            <NavLink to="/login">
                <Button>SignIn</Button>
            </NavLink>
        </div>}
  
        </>
    )
}

export default Home;