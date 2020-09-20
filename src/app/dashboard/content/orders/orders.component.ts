import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { OrdersService } from "src/app/_services/db/orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  public isLoading = false;
  public data;
  public cols = [
    { value: "name", title: "id", visible: true },
    { value: "total_price", title: "Total Price", visible: true },
  ];
  filteredData = [];
  public originalData: any = [];
  public elementsPage = [];
  public searchValue = "";
  public totalPages = 1;
  public pageNumber = 1;
  public pageSize = 10;
  public count = 0;
  public activeIdx;

  constructor(
    private utilService: UtilsService,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.orderService.getOrders();
      this.data = response["result"];

      console.log(this.data);

      this.originalData = response;
      this.elementsInPage();
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to fetch the orders");
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
  async fullfill(order_idx, item_idx) {
    try {
      let order = this.data[order_idx];
      let item = order.line_items[item_idx];
      let res = await this.orderService.fullfill(order.id, {
        line_items: [
          {
            id: item.id,
            quantity: 1,
          },
        ],
      });
      this.utilService.handleSuccess("Item fulfilled successfully!");
    } catch (error) {}
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
