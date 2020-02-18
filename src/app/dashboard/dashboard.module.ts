import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./content/home/home.component";

@NgModule({
  declarations: [SidebarComponent, DashboardComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
