import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { DesignsService } from "src/app/_services/db/designs.service";
import * as $ from "jquery";
import { ReasonsService } from "src/app/_services/db/reasons.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-designs",
  templateUrl: "./designs.component.html",
  styleUrls: ["./designs.component.scss"],
})
export class DesignsComponent implements OnInit {
  public isLoading = false;
  public data;
  public reasons;
  public cols = [{ value: "title", title: "Name", visible: true }];
  // add pagination and search
  filteredData = [];

  public originalData: any = [];
  public elementsPage = [];
  public searchValue = "";
  public totalPages = 1;
  public pageNumber = 1;
  public pageSize = 10;
  public count = 0;
  public activeIdx;
  public selectedReason;
  public selectedDesigns = [];

  constructor(
    private utilService: UtilsService,
    private designService: DesignsService,
    private reasonService: ReasonsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetch();
    this.fetchReasons();
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  redirect(url) {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src='${url}' />`;
  }
  handleSelection(checked, idx) {
    let design = this.data[idx];
    if (checked) this.selectedDesigns.push({ design: design, idx: idx });
    else this.selectedDesigns.splice(idx, 1);
  }
  async fetchReasons() {
    this.reasons = await this.reasonService.fetchReasons();
    if (this.reasons.length) this.selectedReason = this.reasons[0].text;
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.designService.getDesigns();
      this.data = response;
      this.originalData = response;
      this.elementsInPage();
    } catch (error) {
      this.utilService.forwardErrorMessage(error);
    }
    this.isLoading = false;
  }

  async approve() {
    this.isLoading = true;
    let responses = [];
    let uploadToDrive = [];
    this.selectedDesigns.forEach((design) => {
      let res = this.designService.approve(design.design.id);
      let uploadRes = this.designService.upload({
        designrequest: design.design,
      });
      uploadToDrive.push(uploadRes);
      responses.push(res);
    });
    try {
      Promise.all([uploadToDrive, responses]);
      this.utilService.handleSuccess("Designs approved successfully");
    } catch (error) {
      this.utilService.forwardErrorMessage("failed to approve designs");
    }
    this.isLoading = false;
  }

  async handleReject(idx) {
    this.activeIdx = idx;
  }
  async reject() {
    let design = this.data[this.activeIdx];
    try {
      await this.designService.reject(design.id, this.selectedReason);
      this.utilService.handleSuccess("Design rejected successfully");
    } catch (error) {
      this.utilService.forwardErrorMessage("failed to reject design");
    }
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
