import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
//Auth files
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import clientCredentials from '../credentials/client'


import {Store} from '../components/store'


//COMPONENTS
import Questions from '../components/questions/questions';

const Index = (props) => {
const [localUser, setLocalUser] = React.useState({})
    
const {state, dispatch} = React.useContext(Store)
  console.log("localUser", localUser)
  const initFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials); }

    if(state.user){
      console.log("componentDidMount local state user: ", state.user)
      dispatch({
        type: "LOGIN",
        payload: state.user
      });
      //I can request info here from db about user if i want once they are logged in
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLocalUser(user)
        console.log(user)
        dispatch({
          type: "LOGIN",
          payload: user
        });
        return user
          .getIdToken()
          .then(token => {
            return fetch('/api/login', {
              method: 'POST',
              headers: new Headers({'Content-Type': 'application/json'}),
              credentials: 'same-origin',
              body: JSON.stringify({token})
            })
          })
          .then( res => console.log("signed in")/*I can also make a db call here to do something */)
      } else {
        this.setState({ user: null })
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => console.log("signed out")/* cancel whatever thing i had before, such as db listener */)
      }
    })

  }// eend CDM
  
  const handleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  const handleLogout = () => {
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT"    
    });
  }
 
  console.log("STATE>USER", state)
React.useEffect(()=>{
  initFirebase()
},[])
  return(
  <div>
    <Head title="Home" />
    <Nav />
    <Questions/>
    <div className="hero">
      




      { state.user ? (
        <button onClick={handleLogout}>Logout</button>

      ) : (
        <button onClick={handleLogin}>Login With Google</button>
      )}

     

     
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)
  
}

Index.getInitialProps = ({ req, query }) => {
  console.log(req)
  const user = req && req.session ? req.session.decodedToken : null
// don't fetch anything from firebase if the user is not found
  console.log(user)
return {user}
}
export default Index;

