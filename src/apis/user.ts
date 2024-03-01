import {Xsync} from 'js-func-tools';

interface UserAddress {
    city: string
    geo: {lat: string, lng: string}
    street: string
    suite: string
    zipcode: string
}
interface UserCompany {
    bs: string
    catchPhrase: string
    name: string
}

export interface UserItem {
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
    address: UserAddress
    company: UserCompany
}
export interface ResponseDataUser {
    status: number
    data: UserItem[]
}
// Users API: https://jsonplaceholder.typicode.com/users
export const getUsers = async () => {
    const {status, data} = await Xsync({method: 'GET', url: 'https://jsonplaceholder.typicode.com/users'}) as ResponseDataUser;
    if (status !== 200) return [];
    return data;
}

interface PostParams {
    userId: string
}

export interface PostItem {
    body: string
    id: number
    title: string
    userId: number
}
export interface ResponseDataPost {
    status: number
    data: PostItem[]
}
// Posts API: https://jsonplaceholder.typicode.com/posts
export const getPosts = async (params: PostParams) => {
    const {status, data} = await Xsync({method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts', params}) as ResponseDataPost;
    if (status !== 200) return [];
    return data;
}
