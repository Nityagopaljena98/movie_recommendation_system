import store from '../app/store.js'
import {setCurrentMovie , setBigMovies} from '../features/moviesSlice.js'
import axios from '../axios.js'
import {setUser , setUid , selectUser , selectUid, setRecommendations} from  '../features/userSlice.js'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Route} from 'react-router-dom'

let i = 0
let bigMovies

export async function getUser() {
    await axios({
        method : "POST"  , 
        url : "http://localhost:5000/getUser" ,  
        headers : {
            "auth-token" : document.cookie.split("=")[1]        
        }
    })
    .then(res => {
        store.dispatch(setUser({username : res.data[0].username, uId : res.data[0].uId , recommendations : res.data[0].recommendations , myList : res.data[0].myList}))
        store.dispatch(setBigMovies(JSON.parse(res.data[0].recommendations)))
    })
    .catch(err => console.log(err))
}

export async function getGenreData  () {
    const allMovies = axios({
        method : "GET" , 
        url : "http://localhost:5000/getMovies" ,
        headers : {
            'auth-token' : document.cookie.split("=")[1]
        } 
    }).then(res => res.data).catch(err => console.log({err}))
    return allMovies
}


export async function changePrefernce(title) {
    const uId = store.getState().userReducer.uId;
    console.log('User ID:', uId);
    console.log('Movie:', title);
    
    axios.post('/recommend' , {
        id : store.getState().userReducer.uId  ,
        movie : title
    }).then(result => {
        console.log(`result`,result)
        store.dispatch(setRecommendations(result.data))
        return
    })
    .catch(err => {
        console.log(`err`,err)
    })
}
