import ToastifyEs from "toastify-js/src/toastify-es.js";
import { getAuthToken } from "./util.js";
import { getUser } from "./util.js";

const apiURL = 'http://localhost:8080/api/v1';

async function validateResponse(response) {
    const jsonResponse = {
        ...await response.json(),
    };
    if (!response.ok) {
        ToastifyEs({
            text: jsonResponse.message,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#E88080FF",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        return;
    }
    return jsonResponse;
}

function handleNetworkError(error) {
    console.error('Network error', error);
    ToastifyEs({
        text: "Network error. Please try again later.",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#E88080FF",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

function fetcher(url, options) {
    return fetch(url, options)
        .then(async (response) => await validateResponse(response))
        .catch((error) => handleNetworkError(error));
}

export const login = async (email, password) => fetcher(`${apiURL}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
});

export const register = async (data) => fetcher(`${apiURL}/users`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const getAuthorizationToken = async (data) => fetcher(`${apiURL}/auth/get-authorization`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(data)
});

export const getApiUser = async () => fetcher(`${apiURL}/users/${getUser().email}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`
    }
});