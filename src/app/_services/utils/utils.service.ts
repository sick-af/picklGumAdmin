import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  private toastObj = new BehaviorSubject(null);
  toastObjValue = this.toastObj.asObservable();

  constructor() {}

  public getErrorsHTML(err: any) {
    const errorsArr = err.error && err.errors ? err.error.errors : [];
    let errorsHTML = `<ol>`;
    errorsArr.forEach(singleError => {
      errorsHTML += `<li>${singleError.userMessage}</li>`;
      errorsHTML += `<li>${singleError.userMessage}</li>`;
      errorsHTML += `<li>${singleError.userMessage}</li>`;
    });
    errorsHTML += `</ol>`;
    return errorsHTML;
  }

  public handleGeneralError(err: any) {
    this.toastObj.next({
      message:
        err.error.message +
        (err.error.userMessage ? ": " + err.error.userMessage : ""),
      errorFlag: 1
    });
  }

  public forwardErrorMessage(message: any) {
    this.toastObj.next({ message: message, errorFlag: 1 });
  }

  public handleSuccess(message: string) {
    this.toastObj.next({ message: message, errorFlag: 0 });
  }
}
