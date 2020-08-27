import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { UserFileService } from '../../services/user-file/user-file.service';

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
  searchResults: any[] = null;

  constructor(
    private companyService: CompanyService,
    private userFileService: UserFileService
  ) { }

  ngOnInit(): void {
    this.companiesFollowed = ["fb", "amzn"];


    // TEST:
    this.userFileService.getFile();
    
  }

  followCompany(symbol: string) {
    if (symbol && symbol != "" && !this.isFollowingCompany(symbol)) {
      this.companiesFollowed.unshift(symbol);
    }
  }

  searchSymbol() {
    if (this.searchInput != "") {
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
    } else {
      this.searchResults = null;
    }
  }

  processSearchResult(data) {
    if (!data || data.length === 0) {
      this.setSearchError(true);
      return;
    }

    this.searchResults = data.map(company => company.symbol);
    console.log(this.searchResults);

    this.setSearchError(false);
  }

  /**
   * Handles search error.
   * If there is an error: show message to warn user and reset search result.
   */
  setSearchError(showMessage) {
    if (showMessage) {
      this.searchErrorMessage = this.searchErrorMessageText;
      this.searchResults = null;
    } else {
      this.searchErrorMessage = null;
    }
  }

  /**
   * HELPER FUNCTIONS
   */

  isFollowingCompany(symbol: string) {
    return this.companiesFollowed.indexOf(symbol) != -1 ? true : false;
  }

  
  
}
