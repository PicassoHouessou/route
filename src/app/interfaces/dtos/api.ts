
export interface commercial_modes{
    id:string,
    name:string
}

export interface ReservetionDto{
    from:string;
    to:string;
    datetime:string;
}

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
}