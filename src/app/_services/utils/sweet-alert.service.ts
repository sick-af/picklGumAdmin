import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root"
})
export class SweetAlertService {
  constructor() {}

  async triggerEmailForm() {
    return await Swal.fire({
      title: 'Email',
      html: `<input type="text" id="subject" class="swal2-input" placeholder="Subject">
      <textarea type="text" id="body" class="swal2-input" placeholder="Body">`,
      confirmButtonText: 'Send Email',
      focusConfirm: false,
      preConfirm: () => {
        const subject = (<HTMLInputElement>Swal.getPopup().querySelector('#subject')).value;
        const body = (<HTMLInputElement>Swal.getPopup().querySelector('#body')).value;
        if (!subject || !body) {
          Swal.showValidationMessage(`Please enter subject and body`)
        }
        return { subject: subject, body: body }
      }
    })
  }

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
