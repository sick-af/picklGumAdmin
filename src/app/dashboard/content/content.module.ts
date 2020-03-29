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
import { AdminsComponent } from "./admins/admins.component";
import { AddAdminComponent } from "./admins/add-admin/add-admin.component";
import { PartnerTypesComponent } from "./partners/partner-types/partner-types.component";
import { AddPartnerTypeComponent } from "./partners/partner-types/add-partner-type/add-partner-type.component";
import { ProjectTypesComponent } from "./projects/project-types/project-types.component";
import { AddProjectTypeComponent } from "./projects/project-types/add-project-type/add-project-type.component";
import { AddPartnerComponent } from "./partners/add-partner/add-partner.component";
import { AddProjectComponent } from "./projects/add-project/add-project.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CareersComponent } from './careers/careers.component';
import { AddCareerComponent } from './careers/add-career/add-career.component';

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    PartnersComponent,
    ProjectsComponent,
    ProductsComponent,
    AddProductComponent,
    AdminsComponent,
    AddAdminComponent,
    PartnerTypesComponent,
    AddPartnerTypeComponent,
    ProjectTypesComponent,
    AddProjectTypeComponent,
    AddPartnerComponent,
    AddProjectComponent,
    AboutUsComponent,
    CarouselComponent,
    CareersComponent,
    AddCareerComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ContentModule {}
