import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/_services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  username: String;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.admin.username;
  }

  async logout() {
    await this.authService.logout();
    window.location.href = "/";
  }
}
