import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root"
})
export class SweetAlertService {
  constructor() {}

  async triggerAlert() {
    return await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this file!",
      showCancelButton: true,
      confirmButtonColor: "rgb(198, 3, 3) ",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    });
  }
}
