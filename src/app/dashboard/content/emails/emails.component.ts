import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ArtistsService } from "src/app/_services/db/artists.service";
import * as $ from "jquery";
import { SweetAlertService } from "src/app/_services/utils/sweet-alert.service";

@Component({
  selector: "app-emails",
  templateUrl: "./emails.component.html",
  styleUrls: ["./emails.component.scss"],
})
export class EmailsComponent implements OnInit {
  public isLoading = false;
  public data;
  public cols = [
    { value: "first_name", title: "Name", visible: true },
    { value: "last_name", title: "Last Name", visible: true },
    { value: "email", title: "Email", visible: true },
    { value: "phone_number", title: "Phone", visible: true },
  ];
  filteredData = [];
  public amount;
  public originalData: any = [];
  public elementsPage = [];
  public searchValue = "";
  public totalPages = 1;
  public pageNumber = 1;
  public pageSize = 10;
  public count = 0;
  public activeIdx;
  public result = {};
  public allSelected = false;
  public selectedArtists = [];

  constructor(
    private utilService: UtilsService,
    private artistService: ArtistsService,
    private swalService: SweetAlertService
  ) {}

  ngOnInit() {
    this.fetch();
  }
  async fetch() {
    this.isLoading = true;
    try {
      let response: any = await this.artistService.getAllArtists();
      response.forEach(element => {
        element.selected = false
      });
      console.log(response);
      this.data = response;
      this.originalData = response;
      this.elementsInPage();
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to fetch the artists");
    }
    this.isLoading = false;
  }
  async elementsInPage() {
    this.count = this.data.length;
    this.totalPages = Math.ceil(this.count / this.pageSize);
    var start = (this.pageNumber - 1) * this.pageSize;
    var end = this.pageNumber * this.pageSize;

    if (end > this.count) {
      end = this.count;
    }

    this.elementsPage = this.data.slice(start, end);
  }

  handleSelection(checked, idx) {
    this.elementsPage[idx].checked = checked;   
    this.checkselectedArtists()
  }
  handleSelectAll(){
    this.allSelected = !this.allSelected
    this.originalData.forEach(element => {
      element.selected = this.allSelected
    });
    this.checkselectedArtists()
  }

  checkselectedArtists(){    
    this.selectedArtists = []
    this.originalData.forEach(element => {
      if(element.selected) this.selectedArtists.push(element.email)
    });
    console.log(this.selectedArtists);
    
  }

  nextPage() {
    this.pageNumber += 1;
    this.elementsInPage();
  }

  triggerSearch() {
    this.pageNumber = 1;
    this.elementsInPage();
  }

  previousPage() {
    this.pageNumber -= 1;
    this.elementsInPage();
  }

  async openPopup(){
    let response = await this.swalService.triggerEmailForm();
    this.sendEmail(response.value.subject, response.value.body)
  }

  async sendEmail(subject, body){    
    const email = {
      subject: subject,
      body: body,
      receivers: this.selectedArtists.toString()
    }
    let response = await this.artistService.sendEmail(email);
    if(response) this.utilService.handleSuccess("Emails sent successfully!")
  }

  search() {
    this.filteredData = this.originalData;
    let searchValue = this.searchValue.toLowerCase();
    this.filteredData = this.filteredData.filter((element) => {
      return this.cols.some((key) => {
        if (key["secondary_value"]) {
          if (
            element[key["value"]][key["secondary_value"]] != null &&
            element[key["value"]][key["secondary_value"]]
              .toString()
              .toLowerCase()
              .includes(searchValue)
          ) {
            return true;
          }
        } else {
          if (
            element[key["value"]] != null &&
            element[key["value"]].toString().toLowerCase().includes(searchValue)
          ) {
            return true;
          }
        }
        return false;
      });
    });
    this.data = this.filteredData;

    this.elementsInPage();
  }
}
