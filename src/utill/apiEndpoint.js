// import Deashboard from "../component/Deashboard";

// export const BASE_URL = "http://localhost:8080/";
// export const BASE_URL1 = "https://money-rwal.onrender.com/";


// const CLOUDNARY_CLOUDNAME = "dgbiowyya"


// export const API_ENDPOINT = {
//     LOGIN: "/login",
//     REGISTER: "/register",
//     UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDNARY_CLOUDNAME}/image/upload`,
//     GET_ALL_CATEGORY: "/categories",
//     ADD_CATEGORY: "/categories/create",
//     UPDATE_CATEGORY: "/categories/update",
//     GET_ALL_INCOME: "/income",
//     GET_ALL_EXPENSE: "/expense",
//     GET_CATEGORY_BY_TYPE: "/categories",
//     ADD_INCOME: "/income/addincome",
//     ADD_EXPENSE: "/expense",
//     DELETE_INCOME: "/income",
//     DELETE_EXPENSE: "/expense",
//     DEASHBOAREDREQUEST:"/dashboard",
//     FILTER:"/filter",
//     EMAIL:"/email/send"
// };

export const BASE_URL = "https://money-rwal.onrender.com";
 export const BASE_URL1 = "http://localhost:8080/";

const CLOUDINARY_CLOUDNAME = "dgbiowyya";

export const API_ENDPOINT = {
    LOGIN: "/login",
    REGISTER: "/register",
    EMAIL: "/email/send",

    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/image/upload`,

    GET_ALL_CATEGORY: "/categories",
    ADD_CATEGORY: "/categories/create",

    GET_ALL_INCOME: "/income",
    ADD_INCOME: "/income/addincome",
    DELETE_INCOME: "/income",

    GET_ALL_EXPENSE: "/expense",
    ADD_EXPENSE: "/expense",
    DELETE_EXPENSE: "/expense",

    DASHBOARD: "/dashboard",
    FILTER: "/filter",
};
