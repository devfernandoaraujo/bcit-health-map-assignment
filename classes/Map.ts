// @ts-nocheck
import fs  from "fs/promises";
import { Household } from "./Household";
import { Clinic } from "./Clinic";
import { People } from "./People ";

export class Map {
	private _mapData: any;
    private _currentIntake: number;
    clinics: Clinic[];

            

    constructor(fileName: string, currentIntake: number, processFile: (map: Map) => void){
        this._currentIntake = currentIntake;
        this.clinics = [];

        this.setMapData(fileName)
            .then(()=> this.loadClinics())
            .then(() => processFile(this));
        
    }
    private async setMapData(fileName: string){
        
        const file = await fs.readFile(fileName,{ encoding: 'utf-8' });
        const fileObject = JSON.parse(file);
        this._mapData = fileObject;

    }

    printMap(){ 
        
        const matrix = [];
        let countCities = 0; 

        for (const city of Object.values(this._mapData.city)) {
            matrix[countCities]=[]; 
            for (const household of city.households) {
                let isVaccinated = true; 
                for (const inhabitant of household.inhabitants) {
                    if(!inhabitant.isVaccinated){
                        isVaccinated = false; 
                        break;
                    }
                }
                matrix[countCities][Number(household.blockNum)] = isVaccinated? "F" : "H";
            }

            for (const clinic of city.clinics) {
                matrix[countCities][Number(clinic.blockNum)] = "C";
                
            }
            countCities++;
        }
         
        const maxLength = Math.max(...matrix.map(subarray => subarray.length));
 
        const adjustedArray = matrix.map(subarray => {
        if (subarray.length < maxLength) {
            const padding = Array(maxLength - subarray.length).fill("X");
            return subarray.concat(padding);
        }
        return subarray;
        });
        
        console.log(adjustedArray.map(row => row.join(',')).join('\n'));
    }

    registerForShots(){
         
       for (const cityKey of Object.keys(this._mapData.city)) {
            const city = this._mapData.city[cityKey];
            for (const household of city.households) {
                const householdBlockNum = household.blockNum;
                for (const people: People of household.inhabitants) {
                    if(people.isVaccinated){
                        continue;
                    }
                    else if(people.age >= this._currentIntake){
                        const nearestClinic : Clinic = this.getNearestClinic(householdBlockNum, cityKey);
                        people.city = cityKey;
                        nearestClinic.enqueue(people);
                        people.isVaccinated = true;
                    }
                }
                
            }
        }
        
    }

    private getNearestClinic(PersonBlockNum: number, city: string): Clinic{ 
        let closestClinic = this.clinics
            .filter(clinic => clinic.city == city)
            .reduce((prev, curr)=>{ 
                return(Math.abs(curr.blockNum - PersonBlockNum) < Math.abs(prev - PersonBlockNum)? curr : prev)
            });

        return closestClinic;
    }

    private loadClinics(){
        for (const cityKey of Object.keys(this._mapData.city)) {
            const city = this._mapData.city[cityKey];
            for (const clinic:Clinic of city.clinics) { 
                this.clinics.push(new Clinic(clinic.name, clinic.blockNum, clinic.staff, cityKey));
            }
        }

        console.log(this.clinics);
    }
}



exports = { Map } 