export interface doctorProfile{
    id:string;
    name:string;
    bio:string;
    profileurl:string;
    specialisation:string;
    qualification:string;
    experience:string;
    phno:string;
    address:string;
    city:string;
    clinic:string;
    reviews:string[];
    ratings:number[];
    totalRating:number;
    availableslots:number[][];
    clinicslots:number[][];
}