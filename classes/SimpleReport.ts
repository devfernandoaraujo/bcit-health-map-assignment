import { Clinic } from "./Clinic";
import { IReport } from "./Interfaces";
import { Map } from "./Map";

export class SimpleReport implements IReport{
     map: Map;
    constructor(map: Map){
        this.map = map;
        
    }

    printDetails():void{

         let cities: string[] = [];
        this.map.clinics.forEach( (element:Clinic) => {
            if (!cities.includes(element.city)) {
                console.log(`---------------City: ${element.city}---------------\n `);
                 for (const clinic  of this.map.clinics.filter((clinic: Clinic)=> clinic.city === element.city)) {
                    console.log(`${clinic.name} - Lineup: ${clinic.size()} \n`);
                }

                cities.push(element.city);
            }
        });
        
    }
}

exports = { SimpleReport }