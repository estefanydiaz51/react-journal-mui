import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => { 
    test('debe de regresar el estado inicial y llamarse auth', () => { 
        const state = authSlice.reducer( initialState, {} );
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');
    });
    test('debe de realizar la autenticación', () => { 
        const state  = authSlice.reducer( initialState, login( demoUser ));

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    });

    test('debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout( ));
        expect( state ).toEqual({
            status: 'no-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout y mostrar el mensaje de error ', () => { 

        const errorMessage = 'Credenciales no son correctas';
        
        const state = authSlice.reducer( authenticatedState, logout( {errorMessage} ));

        expect( state ).toEqual({
            status: 'no-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credenciales no son correctas'
        })
    });

    test('debe de cambiar el estado a checking', () => { 
        const state = authSlice.reducer(  authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
     })

 })