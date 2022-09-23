import { checkingCredentials, login, logout } from "./authSlice"
import { registerUserWithEmailPassword, signInWithGoogle, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers'
import { async } from "@firebase/util"
import { signInWithEmailAndPassword } from "firebase/auth"
import { clearNotesLogout } from "../journal/journalSlice"

export const checkingAuthentication = ( email, password ) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() )
  }
}

export const startGoogleSingIn = () => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() )
    const result = await signInWithGoogle();
    if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
    console.log( { result });

    dispatch( login( result ) )
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName }); 
    if ( !ok ) return dispatch( logout( {errorMessage} ) )

    dispatch( login({ uid, displayName, email, photoURL, ok }))
  }
}

export const starLoginWithEmailPassword = ({ email, password }) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );
    const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailPassword({ email, password });
    if ( !ok ) return dispatch( logout( { errorMessage } ) )
    dispatch( login( { uid, displayName, email, photoURL, ok } ))
  }
}

export const startLogout = () => {
  return async ( dispatch )=> {
    await logoutFirebase();
    dispatch( clearNotesLogout() )
    dispatch( logout() );
  }
}