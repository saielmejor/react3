import React, {useState,useEffect} from 'react' ; 

const AuthContext = React.createContext({

    isLoggedIn:false,
    onLogout:() => { }, 
    onLogin:(email,password)=>{}
}); //component wide state 

// CREATE another object to manage the state of login  and logout

export const AuthContextProvider= (props)=> {  

    const [isLoggedIn,setIsLoggedIn]= useState(false); 
    
    useEffect(()=>{ 
        const storedUserLoggedInUser= localStorage.getItem('isLoggedIn') // obtains the stored isLoggegIn
    
        if (storedUserLoggedInUser === '1'){ 
          setIsLoggedIn(true);// sets logged in to true if it already ahs email and password stored
        }
      },[]);
    
    const logoutHandler= () => { 
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    } ; 

    const loginHandler=()=> { 
        localStorage.setItem('isLoggedIn','1')
        setIsLoggedIn(true);
    }; 
    return ( 
        <AuthContext.Provider value={ {isLoggedIn:isLoggedIn, onLogout:logoutHandler,onLogin:loginHandler} }>{props.children} </AuthContext.Provider>
    )

}

export default AuthContext; 