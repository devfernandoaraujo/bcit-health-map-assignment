import { People } from "./People ";

export class Clinic{
    name: string;
    blockNum: Number;
    staff: Number;
    queue: People[];
    city: string;
    
    constructor(name:string, blockNum: Number, staff: Number, city: string){
        this.name = name;
        this.blockNum = blockNum;
        this.staff = staff;
        this.city = city;
        this.queue = []
    }

     enqueue(people: People) {
        this.queue.push(people);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.queue.shift();
     }

     size() {
        return this.queue.length || 0;
    }

    getCurrentWaitTime(){
        return this.size() * 15;
    }


    private isEmpty() {
        return this.queue.length === 0;
    }


}

exports={Clinic}