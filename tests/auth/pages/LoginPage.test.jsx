import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { startGoogleSingIn } from "../../../src/store/auth/thunks"
import { authSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { Password } from "@mui/icons-material"

const mockStartGoogleSingIn = jest.fn()
const mockStarLoginWithEmailPassword = jest.fn()
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    starLoginWithEmailPassword: ({email, password}) => {
        return () => mockStarLoginWithEmailPassword({email, password})
    }
}))


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn )=> fn()
}))


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})






describe('Pruebas en el LoginPage', () => { 
    beforeEach(() => jest.clearAllMocks)
    test('debe de mostrar el comoponente correctamente', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
                
            </Provider>
        )
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
    })

    test('debe de llamar el startGoogleSingIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
                
            </Provider>
        )
        const googleBtn = screen.getByLabelText('google-btn')
        fireEvent.click(googleBtn)
        expect(mockStartGoogleSingIn).toHaveBeenCalled()
     })

    test('debe de llamar el startLoginWithEmailPassword ', () => { 
        const email = 'estefanydiaz1104@gmail.com'
        const password = '123456'
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
                
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo'})
        fireEvent.change(emailField, {target: {name: 'email', value: email}})

        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, {target: {name: 'password', value: password}})

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit(loginForm)

        expect(mockStarLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        })

     })
 })