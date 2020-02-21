import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContentRoutingModule } from "./content-routing.module";
import { ContentComponent } from "./content.component";
import { HomeComponent } from "./home/home.component";
import { PartnersComponent } from "./partners/partners.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ProjectsComponent } from "./projects/projects.component";
import { ProductsComponent } from "./products/products.component";
import { AddProductComponent } from "./products/add-product/add-product.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    PartnersComponent,
    ProjectsComponent,
    ProductsComponent,
    AddProductComponent,
    AdminsComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ContentModule {}
