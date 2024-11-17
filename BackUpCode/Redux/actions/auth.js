import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from './types';
import { baseURL } from '../../baseURL';

import Swal from "sweetalert2";


export const load_user = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            // console.log("Sending GET request to fetch user data");
            const res = await axios.get(`${baseURL}/api/logedin_user/`,config);
            // console.log("Server Response:", res); // Log the server response

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

            console.log("User data loaded successfully");
        } catch (err) {
            console.error("Error loading user data:", err);
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${baseURL}/api/token/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }; 

    const body =JSON.stringify({username, password})
    try {
        const res = await axios.post(`${baseURL}/api/token/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        Toast.fire({
            icon: 'error',
            title: 'Invalid username or password'
          })
    }

}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};