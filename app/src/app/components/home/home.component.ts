import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly searchErrorMessageText = "No symbol found";

  companiesFollowed: string[]; // stock name of companies
  searchInput: string;
  searchErrorMessage: string = null;
  searchResult: any[] = null;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companiesFollowed = ["fb", "amzn"];
  }

  searchSymbol() {
    if (this.searchInput && this.searchInput != "") {
      this.companyService.searchForCompany(this.searchInput)
        .subscribe(
          response => {
            this.processSearchResult(response);
          },
          error => { 
            console.log(error);
            this.setSearchError(true);
         }
        );
    }
  }

  processSearchResult(data) {
    if (!data || data.length === 0) {
      this.setSearchError(true);
      return;
    }

    this.searchResult = data.map(company => company.symbol);
    console.log(this.searchResult);

    this.setSearchError(false);
  }
  

  isFollowingCompany(symbol: string) {
    return this.companiesFollowed.indexOf(symbol) != -1 ? true : false;
  }

  /**
   * Show an error message if aa symbol searched if not found. 
   * The message disappear after two second.
   */
  setSearchError(showMessage) {
    if (showMessage) {
      this.searchErrorMessage = this.searchErrorMessageText;
      this.searchResult = null;
    } else {
      this.searchErrorMessage = null;
    }
  }


  // TODO: improve search: allow checking with company names and partial search
  OLDsubmitSearch() {
    if (this.searchInput && this.searchInput !== "") {
    this.companyService.searchForCompany(this.searchInput)
      .subscribe(
        response => { this.OLDprocessSearch(response) },
        error => { console.log(error) }
      );
    }
  }

  // TODO: add the whole company info object to the array and update the ngFor and company-summary.component
  OLDprocessSearch(data: any) {
    this.searchInput = this.searchInput.toUpperCase();
    
    let company = data.find((companyInfo)  => {
      return companyInfo.symbol === this.searchInput;
    });

    if (company && !this.isFollowingCompany(company.symbol)) {
      this.companiesFollowed.unshift(company.symbol);
    } else {
      this.setSearchError(true);
      console.log("Error: no symbol found");
    }

    this.searchInput = null;
  }
}
