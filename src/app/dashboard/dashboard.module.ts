import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [SidebarComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
