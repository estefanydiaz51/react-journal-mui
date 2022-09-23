import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, starLoginWithEmailPassword, startCreatingUserWithEmailPassword, startGoogleSingIn, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers.js');

describe('Pruebas en AuthThunks', () => { 
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checking credentials ', async() => { 
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith(  checkingCredentials() );
    });

    test('startGoogleSingIn debe de llamar el checkingCredentials y login - Exito', async() => { 
        const loginData = {
            ok: true,
            ...demoUser
        }
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSingIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSingIn debe de llamar el checkingCredentials y logout - Error', async() => { 
        const loginData = {
            ok: false,
            errorMessage: 'Un error en google'
        }
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSingIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('starLoginWithEmailPassword debe de llamar checkingCrendentials y login - Exito', async() => { 
        const loginData = {
            ok: true,
            ...demoUser
        };
        const formData = {
            email: demoUser.email,
            password: '123456'
        };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await starLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

     });

     test('starLoginWithEmailPassword debe de llamar checkingCrendentials y logout - Error', async() => { 
        const loginData = {
            ok: false,
            errorMessage: 'Credenciales incorrectas'
        };
        const formData = {
            email: demoUser.email,
            password: '123456'
        };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await starLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: 'Credenciales incorrectas' } ) );

     });
    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        const loginData = {
            ok: true,
            ...demoUser
        }

        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    })

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => { 
        const loginData = {
            ok: false,
            errorMessage: 'credenciales incorrectas'
        }

        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: 'credenciales incorrectas' } ) )
    })

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    })
 })