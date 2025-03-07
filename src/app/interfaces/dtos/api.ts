
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

export interface AutoCompleteItem{
    id?:string;
    name?:string;
    quality?:number;
    stop_area?:{
        id:string;
        name:string;
        label:string;
        administrative_regions:any[];
        codes:any[];
        coord:{
            lat?:string;
            lon?:string;
        };
        links:any[];
        timezone:string;
    }
    embedded_type?:string;
}