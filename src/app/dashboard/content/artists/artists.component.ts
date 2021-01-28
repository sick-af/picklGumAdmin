import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ArtistsService } from "src/app/_services/db/artists.service";
import * as $ from "jquery";
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: "app-artists",
  templateUrl: "./artists.component.html",
  styleUrls: ["./artists.component.scss"],
})
export class ArtistsComponent implements OnInit {
  public isLoading = false;
  public data;
  public cols = [
    { value: "first_name", title: "Name", visible: true },
    { value: "bank_account_number", title: "Bank info", visible: true },
    { value: "balance_due", title: "Balance Due", visible: true },
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

  constructor(
    private utilService: UtilsService,
    private artistService: ArtistsService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async upload(e) {
    console.log(e.target.files[0]);
    const file: File = e.target.files[0];
    const reader = new FileReader();
    let image;
    reader.addEventListener("load", (event: any) => {
      image = new ImageSnippet(event.target.result, file);
      this.result["image"] = image.src;
    });

    reader.readAsDataURL(file);
  }
  async handlePayment(idx) {
    let amount = $(`#${idx}`).val();
    let designer = this.data[idx];
    if (!amount)
      return this.utilService.forwardErrorMessage("Amount cannot be empty");
    this.result["balance_due"] = designer.balance_due - amount;
    this.result["designer_id"] = designer.id;
    this.isLoading = true;
    try {
      let res = await this.artistService.pay(this.result);
      designer.balance_due = res["balance_due"];
      this.utilService.handleSuccess(`Artist has been payed successfully!`);
    } catch (error) {
      this.utilService.forwardErrorMessage(`Failed to pay artist!`);
    }
    this.isLoading = false;
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.artistService.getArtists();
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
