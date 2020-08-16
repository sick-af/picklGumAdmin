import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContentRoutingModule } from "./content-routing.module";
import { ContentComponent } from "./content.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AdminsComponent } from "./admins/admins.component";
import { AddAdminComponent } from "./admins/add-admin/add-admin.component";
import { DesignsComponent } from './designs/designs.component';
import { ArtistsComponent } from './artists/artists.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule } from '@angular/router';
import { SaveButtonComponent } from 'src/app/shared/save-button/save-button.component';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    AdminsComponent,
    AddAdminComponent,
    DesignsComponent,
    ArtistsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ]
})
export class ContentModule {}
