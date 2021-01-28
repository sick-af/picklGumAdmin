import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth/auth.service";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.required),
    });
    this.isLoading = false;
  }

  async submit() {
    this.isLoading = true;

    this.authService
      .login(this.loginForm.value)
      .then((res) => {
        this.isLoading = false;
        this.utilsService.handleSuccess("You've successfully logged in");
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        this.isLoading = false;
        this.utilsService.forwardErrorMessage("Wrong credentials");
      });
  }
}
