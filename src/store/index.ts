import {UsersStore} from './users.store';
import type {ComponentProps} from './users.store';

const userStore = new UsersStore();

export {
    userStore,
    ComponentProps
}