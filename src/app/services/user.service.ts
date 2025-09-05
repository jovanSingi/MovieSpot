import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model"
import { User } from "../user/user";

export class UserService {
    static retrieveUsers() {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    name: 'Jovan',
                    lastName: 'Klincov',
                    number: '123123123',
                    email: 'jovan@gmail.com',
                    username: 'jovan',
                    password: 'jovan',
                    orders: []
                }
            ];

            localStorage.setItem('users', JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
        const users: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.password === currentPassword);


        if (!user) {
            console.log("Trenutna lozinka nije tačna");
            return;
        }

        if (newPassword !== confirmPassword) {
            console.log("Nova lozinka i potvrda se ne poklapaju");
            return;
        }

        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Lozinka uspešno promenjena");
    }

    static createUser(name: string, lastName: string,
        number: string, email: string, username: string, password: string) {

        // Uzmi postojeće korisnike ili napravi prazan niz
        const users: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');

        // Dodaj novog korisnika
        users.push({
            name,
            lastName,
            number,
            email,
            username,
            password,
            orders: []
        });

        // Sačuvaj nazad u localStorage
        localStorage.setItem('users', JSON.stringify(users));

        return true;
    }

    static login(username: string, password: string) {
        for (let user of this.retrieveUsers()) {
            if (user.username === username && user.password === password) {
                localStorage.setItem('active', user.email)
                return true;
            }
        }
        return false;
    }

    static getActiveUser() {
        const activeUser = localStorage.getItem('active')

        if (!activeUser) return null;

        for (let user of this.retrieveUsers()) {
            if (user.email === activeUser) {
                return user;
            }
        }

        return null;

    }

    static createOrder(order: OrderModel) {
        const users = this.retrieveUsers();
        for (let user of users) {
            if (user.email === localStorage.getItem('active')) {
                user.orders.push(order);
                localStorage.setItem('users', JSON.stringify(users));
                return true;
            }
        }
        return false;
    }

    // static rateOrder(order: OrderModel, rating: 'liked' | 'disliked') {
    //     const users = this.retrieveUsers();
    //     for (let user of users) {
    //         if (user.email === localStorage.getItem('active')) {
    //             console.log('usao')
    //             const o = user.order;
    //             console.log(o);
    //             if (o) {
    //                 console.log(o);
    //                 o.rating = rating;
    //                 localStorage.setItem('users', JSON.stringify(users));
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }




}