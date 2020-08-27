import { Injectable } from '@angular/core';
const fs = (<any>window).require("fs");
const path = (<any>window).require("path");
//mport { ipcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class UserFileService {
  savedStockFilePath: string;
  
  constructor() { 
    ipcRenderer.on("test-back", (msg) => {
      console.log(msg)
    })
  }

  getFile() {
    console.log("in get file")
    //console.log(path.resolve("../"))
    ipcRenderer.send("test")
  }

}
