import * as mongoose from 'mongoose';
export interface User {
    _id: string;
    name: string,
    username: string,
    email: string,
    password?: string,
}