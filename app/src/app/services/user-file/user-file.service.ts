import { Injectable } from '@angular/core';
const fs = (<any>window).require("fs");
const path = (<any>window).require("path");

@Injectable({
  providedIn: 'root'
})
export class UserFileService {
  
  userFileFolder: string;
  companyFileName: string = "companies.txt";

  constructor() { 
    this.userFileFolder = path.resolve("../app/src/user-files") + "/";
  }

  getFollowedCompanies(): string[] {
    let rawFile = this.readFromFile(this.userFileFolder + this.companyFileName);
    if (!rawFile) {
      return [];
    }

    let companies = rawFile.split('\n');
    return companies;
  }

  addFollowedCompanies(symbol: string): void {
    this.appendFileAsync(this.userFileFolder + this.companyFileName, symbol);
  }

  /**
   * HELPER FUNCTIONS
   */

  readFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("Error: UserFile doesn't exist");
        return null;
    }

    let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    return fileContent;
  }

  appendFileAsync(filePath, text) {
    text = "\n" + text;
    if (fs.existsSync(filePath)) {
        fs.appendFile(filePath, text, (err) => {
            if (err) {
                console.log(`Error appending to file: ${err}`);
            }
        });
    } else {
      console.log("Error appending to user file: file doesn't exist");
    }
}

}
