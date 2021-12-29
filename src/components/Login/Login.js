import React, { useEffect, useState,useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';

//creates a emailReducer function outside of the component 
const emailReducer=(state,action)=> { 
  if (action.type ==='USER_INPUT') { 
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if (action.type==='INPUT_BLUR'){ 
    return { value:state.value, isValid:state.value.includes('@')} ; //checks if it includes the "a " from latest state snapshot
  }
return {value:' ', isValid:false} ;
};

const passwordReducer=(state,action)=> { 
  if (action.type ==='USER_INPUT') { 
    return {value:action.val, isValid:action.val.trim().length > 6};
  }
  if (action.type==='INPUT_BLUR'){ 
    return { value:state.value, isValid:state.value.trim().length > 6} ; //checks if it includes the "a " from latest state snapshot
  }
return {value:'', isValid:false} ;
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
// reducer function 
const authCtx=useContext(AuthContext);

const [emailState,dispatchEmail]= useReducer(emailReducer,{value:' ', isValid:null}) // set is valid to null so it doesnt input_blur 

const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:' ', isValid:null})

//use object destructuring to pull out certain objects from a component 
const { isValid:emailIsValid }=emailState;
const {isValid:passwordIsValid}= passwordState;

useEffect(()=> { 

  const identifier= setTimeout(()=>{ 
    console.log('CHECK FORM VALIDITY')
    setFormIsValid(
      emailIsValid && passwordIsValid
    );
  },500); // check form validity after user stopped typing for 500 ms 
 return () => { 
console.log('CLEANUP')
clearTimeout(identifier); // cleartime out is used to clear the previous timer from last key stroke

 }; //cleanup function runs after form validation function occurs 
},[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    //add dispatch function
    dispatchEmail({type:'USER_INPUT', val:event.target.value})// gets type user input and target value 
  //  setFormIsValid( event.target.value.includes('@') && passwordState.isValid); not optimal 
    
    
   
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value}); 
    // setFormIsValid( emailState.isValid && passwordState.isValid);


  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'}) // we dont need to add val because we dont need to add any value 
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
   
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
