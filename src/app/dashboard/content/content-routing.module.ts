import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PartnersComponent } from "./partners/partners.component";
import { ContentComponent } from "./content.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProductsComponent } from "./products/products.component";

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
        path: "projects",
        component: ProjectsComponent
      },
      {
        path: "products",
        component: ProductsComponent
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
