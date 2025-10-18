import { UserModel } from "../models/user.model";

export class UserService {
    static findUserByEmail(email: string) {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    phoneNumber: '381123123',
                    email: 'example@mail.com',
                    password: 'pass123',
                    favoriteToy: 'Plišane igračke',
                    data: []
                }
            ]));
        }

        const users: UserModel[] = JSON.parse(localStorage.getItem('users')!);
        const currentUser = users.find(user => user.email === email);

        if(!currentUser) {
            throw new Error('User not found');
        }
        return currentUser;
    }

    static login(email: string, password: string){
        const user = this.findUserByEmail(email);
        if(user?.password !== password){
            throw new Error('Invalid password');
        }
        localStorage.setItem('active', user.email);
    }

    static getActiveUser(){
        const active = localStorage.getItem('active');
        if(!active){
            throw new Error('No active user');
        }
        return this.findUserByEmail(active);
    }

}
