import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth/auth.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      user: new FormGroup({
        username: new FormControl(
          null,
          Validators.compose([Validators.required])
        ),
        password: new FormControl(null, Validators.required)
      })
    });
    this.isLoading = false;
  }

  async submit() {
    this.isLoading = true;

    try {
      let response = await this.authService.login(this.loginForm.value);
    } catch (err) {
      console.log(err);
    }

    this.isLoading = false;
  }
}
