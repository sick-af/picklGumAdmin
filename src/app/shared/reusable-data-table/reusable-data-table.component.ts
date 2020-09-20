import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SweetAlertService } from "src/app/_services/utils/sweet-alert.service";

@Component({
  selector: "app-reusable-data-table",
  templateUrl: "./reusable-data-table.component.html",
  styleUrls: ["./reusable-data-table.component.scss"],
})
export class ReusableDataTableComponent implements OnInit {
  @Input()
  title: any;

  private data: any = [];
  public elementsPage = [];
  public originalData: any = [];

  @Input("data")
  public set value(val) {
    this.data = val;
    this.originalData = val;
    this.elementsInPage();
  }

  filteredData = [];

  @Input()
  isLoading: any;

  @Input()
  cols: any;

  @Input()
  disableAdd: any;

  @Input()
  disableEdit: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  public numberOfCols = 4;

  // add pagination and search
  public searchValue = "";
  public totalPages = 1;
  public pageNumber = 1;
  public pageSize = 10;
  public count = 0;

  constructor(private swalService: SweetAlertService) {}

  ngOnInit() {}

  calculateNumberOfCols() {
    var number = 5;
    this.cols.forEach((element) => {
      if (element["visible"] != null) {
        number += 1;
      }
    });

    return number;
  }

  async elementsInPage() {
    if (this.data) this.count = this.data.length;
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

  async delete(id: any) {
    let response = await this.swalService.triggerAlert();
    if (response.value) this.onDelete.emit(id);
  }
}
