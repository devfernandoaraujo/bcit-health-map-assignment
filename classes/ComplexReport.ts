import { Clinic } from './Clinic';
import { IReport } from './Interfaces';
import { Map } from "./Map";

export class ComplexReport implements IReport{
    map: Map;
    constructor(map: Map){
        this.map = map;
        
    }

    printDetails():void{
       let cities: string[] = [];
       let averageList: number[] = [];
        this.map.clinics.forEach( (element:Clinic) => {
            if (!cities.includes(element.city)) {
                console.log(`---------------City: ${element.city}---------------\n `);
                 for (const clinic  of this.map.clinics.filter((clinic: Clinic)=> clinic.city === element.city)) {
                    averageList.push(clinic.size())
                    console.log(`${clinic.name} - Lineup: ${clinic.size()}`);
                }

                const average: number= (averageList.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/ averageList.length) * 15;
                console.log(`Average Wait Time: ${average}  \n`);
                averageList = [];
                cities.push(element.city);
            }
        });
    }
}

exports={ ComplexReport }