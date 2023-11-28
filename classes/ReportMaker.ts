import { IReport } from "./Interfaces";

export class ReportMaker{
    report: IReport;

    constructor(report: IReport){
        this.report = report;
    }
 
    printDetails() {
        this.report.printDetails();
    }
}

exports = {ReportMaker}