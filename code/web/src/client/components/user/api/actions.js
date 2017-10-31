// Imports
import axios from 'axios'

// App Imports
import { routesApi } from '../../../setup/routes'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', JSON.stringify(user))

    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials) {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })

        /*
        return axios.post(routesApi, userCredentials)
            .then((response) => {
                let error = null

                if(response.status === 200 && response.data.token !== '') {
                    const token = response.data.token

                    axios.get(routesApi, { headers: { 'Authorization':  `Bearer ${ token }` } })
                        .then((response) => {
                            dispatch(setUser(token, response.data.user))
                        })
                        .catch(() => {
                            error = 'Please try again'
                        })
                } else {
                    error = response.data.error
                }

                dispatch({
                    type: LOGIN_RESPONSE,
                    error
                })
            })
            .catch((error) => {
                let errorMessage = 'Please try again.'

                if(error.response && error.response.data.error) {
                    errorMessage = error.response.data.error
                }

                dispatch({
                    type: LOGIN_RESPONSE,
                    error: errorMessage
                })
            })
        */
    }
}

// Register a user
export function register(userDetails) {
    return dispatch => {
        return axios.post(routesApi, queryBuilder({ type: 'mutation', operation: 'userCreate', data: userDetails, fields: ['id', 'name', 'email'] }))
    }
}

// Log out user and remove token from localStorage
export function logout() {
    return dispatch => {
        window.localStorage.removeItem('token')

        dispatch({
            type: LOGOUT
        })
    }
}
