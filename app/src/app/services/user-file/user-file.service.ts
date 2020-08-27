import { Injectable } from '@angular/core';
import {remote} from 'electron';
var fs = remote.require('fs');
var path = remote.require('path');

@Injectable({
  providedIn: 'root'
})
export class UserFileService {
  savedStockFilePath: string;

  constructor() { 
    this.savedStockFilePath = path.resolve(__dirname);
  }

  getFile() {
    console.log(this.savedStockFilePath);
  }
}
