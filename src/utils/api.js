import axios from "axios";

const bearer = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQHJhamFrb24uY29tIiwiZXhwIjoxNjkzODE4ODEwfQ.T3Pl3rHkGNRhc-9S1iacOMZNOi8gzIF8T7L2g-iBRF8";


const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
    },
})

const apiToken = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export {api, apiToken}