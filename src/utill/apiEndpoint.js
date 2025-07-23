import Deashboard from "../component/Deashboard";

// https://money-rwal.onrender.com
export const BASE_URL = "https://money-rwal.onrender.com";


const CLOUDNARY_CLOUDNAME = "dgbiowyya"


export const API_ENDPOINT = {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDNARY_CLOUDNAME}/image/upload`,
    GET_ALL_CATEGORY: "/categories",
    ADD_CATEGORY: "/categories/create",
    UPDATE_CATEGORY: "/categories/update",
    GET_ALL_INCOME: "/income",
    GET_ALL_EXPENSE: "/expense",
    GET_CATEGORY_BY_TYPE: "/categories",
    ADD_INCOME: "/income/addincome",
    ADD_EXPENSE: "/expense",
    DELETE_INCOME: "/income",
    DELETE_EXPENSE: "/expense",
    DEASHBOAREDREQUEST:"/dashboard",
    FILTER:"/filter",
    EMAIL:"/email/send"
};
