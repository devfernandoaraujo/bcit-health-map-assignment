import { People } from "./People ";

export class Household{
    blockNum: Number;
    inhabitant: People[];
    constructor(blockNum: Number, inhabitant: People[]){
        this.blockNum = blockNum;
        this.inhabitant = inhabitant;
    }
}

exports={Household}