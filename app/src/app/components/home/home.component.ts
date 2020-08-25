import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly searchErrorMessageText = "Symbol not found";

  companiesFollowed: string[]; // stock name of companies
  searchInput: string;
  searchErrorMessage: string = null;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companiesFollowed = ["fb", "amzn"];
  }

  // TODO: improve search: allow checking with company names and partial search
  submitSearch() {
    if (this.searchInput && this.searchInput !== "") {
    this.companyService.searchForCompany(this.searchInput)
      .subscribe(
        response => { this.processSearch(response) },
        error => { console.log(error) }
      );
    }
  }

  // TODO: add the whole company info object to the array and update the ngFor and company-summary.component
  processSearch(data: any) {
    this.searchInput = this.searchInput.toUpperCase();
    
    let company = data.find((companyInfo)  => {
      return companyInfo.symbol === this.searchInput;
    });

    if (company && !this.isFollowingCompany(company.symbol)) {
      this.companiesFollowed.unshift(company.symbol);
    } else {
      this.setSearchErrorMessage();
      console.log("Error: no symbol found");
    }

    this.searchInput = null;
  }

  isFollowingCompany(symbol: string) {
    return this.companiesFollowed.indexOf(symbol) != -1 ? true : false;
  }

  /**
   * Show an error message if aa symbol searched if not found. 
   * The message disappear after two second.
   */
  setSearchErrorMessage() {
    this.searchErrorMessage = this.searchErrorMessageText;
    
    setTimeout(() => {
      this.searchErrorMessage = null;
    }, 2000); 
  }
}
