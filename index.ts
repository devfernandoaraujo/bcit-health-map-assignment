import { Map } from "./classes/Map";
import path from 'path';
import { ReportMaker } from "./classes/ReportMaker";
import { ComplexReport } from "./classes/ComplexReport";
import { SimpleReport } from "./classes/SimpleReport";


const main= async (filename: string)=>{
    const filePath = path.join(__dirname, filename);
    let map :Map;
    map = new Map(filePath, 20, processFile);
}

const processFile = async(map : Map)=>{
    console.log("----------------------------Printing Map----------------------------");
    map.printMap();
    console.log("----------------------------End of Map----------------------------");
    map.registerForShots(); 
    console.log("----------------------------Complex Report----------------------------");
    let report = new ReportMaker(new ComplexReport(map));
    report.printDetails();
    console.log("----------------------------Simple Report----------------------------");
    report = new ReportMaker(new SimpleReport(map));
    report.printDetails();
    console.log("----------------------------End of Report----------------------------")
    map.printMap();
    console.log("----------------------------End of Map----------------------------")
}

main("./data.json");