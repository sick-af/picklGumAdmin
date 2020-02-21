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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
