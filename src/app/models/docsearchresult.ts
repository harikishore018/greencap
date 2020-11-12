export interface DocSearchResult{
    id : number;
    name : String;
    specialization : string[];
    experience : number;
    qualification : string[];
    location : String;
    clinic : String;
    description : String;
    rating : number;
    consultationfee : number;
    isverified : boolean;
    videoavailability:string[][];
    clinicavailability:string[][];
}