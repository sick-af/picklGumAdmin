import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PartnersComponent } from "./partners/partners.component";
import { ContentComponent } from "./content.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProductsComponent } from "./products/products.component";
import { AddProductComponent } from "./products/add-product/add-product.component";
import { AdminsComponent } from "./admins/admins.component";
import { AddAdminComponent } from "./admins/add-admin/add-admin.component";
import { PartnerTypesComponent } from "./partners/partner-types/partner-types.component";
import { AddPartnerTypeComponent } from "./partners/partner-types/add-partner-type/add-partner-type.component";
import { ProjectTypesComponent } from "./projects/project-types/project-types.component";
import { AddProjectTypeComponent } from "./projects/project-types/add-project-type/add-project-type.component";

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "admins",
        component: AdminsComponent
      },
      {
        path: "admins/add",
        component: AddAdminComponent
      },
      {
        path: "admins/:id",
        component: AddAdminComponent
      },
      {
        path: "projects",
        component: ProjectsComponent
      },
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "products/add",
        component: AddProductComponent
      },
      {
        path: "products/:id",
        component: AddProductComponent
      },
      {
        path: "partners",
        component: PartnersComponent
      },
      {
        path: "partner-types",
        component: PartnerTypesComponent
      },
      {
        path: "partner-types/add",
        component: AddPartnerTypeComponent
      },
      {
        path: "partner-types/:id",
        component: AddPartnerTypeComponent
      },

      {
        path: "project-types",
        component: ProjectTypesComponent
      },
      {
        path: "project-types/add",
        component: AddProjectTypeComponent
      },
      {
        path: "project-types/:id",
        component: AddProjectTypeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
