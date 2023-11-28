
export class People {
    phn: string;
    fullName: string;  
    isVaccinated: boolean; 
    age: Number;

    constructor(phn:string, fullName: string, isVaccinated: boolean, age: Number){
        this.phn = phn;
        this.fullName = fullName;
        this.isVaccinated = isVaccinated;
        this.age = age;
    
    }

}

exports= { People }