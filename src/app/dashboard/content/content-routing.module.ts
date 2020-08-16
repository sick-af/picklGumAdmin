import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContentComponent } from "./content.component";
import { AdminsComponent } from "./admins/admins.component";
import { AddAdminComponent } from "./admins/add-admin/add-admin.component";
import { DesignsComponent } from './designs/designs.component';
import { ArtistsComponent } from './artists/artists.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {
        path: "",
        redirectTo: "admins",
        pathMatch: "full"
      },
      // {
      //   path: "home",
      //   component: HomeComponent
      // },
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
        path: "designs",
        component: DesignsComponent
      },
      {
        path: "artists",
        component: ArtistsComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
