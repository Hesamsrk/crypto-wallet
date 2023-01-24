import {hookstate} from '@hookstate/core';

interface IStore {
    privateKey: string
}


export const Store = hookstate<IStore>({
    privateKey: ""
});






