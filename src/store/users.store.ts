import {action, makeObservable, observable} from 'mobx';
import {getUsers, UserItem} from "@/apis";

export interface ComponentProps {
    props: {
        users: UserItem[]
        getUsers(): void
    }
}

export class UsersStore {
    users: UserItem[]
    constructor() {
        this.users = [];

        makeObservable(this, {
            users: observable,
            getUsers: action
        })
    }

    async getUsers() {
        this.users = await getUsers();
    }
}
