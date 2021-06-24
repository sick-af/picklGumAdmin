import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContentComponent } from "./content.component";
import { AdminsComponent } from "./admins/admins.component";
import { AddAdminComponent } from "./admins/add-admin/add-admin.component";
import { DesignsComponent } from "./designs/designs.component";
import { ArtistsComponent } from "./artists/artists.component";
import { OrdersComponent } from "./orders/orders.component";
import { CategoryComponent } from "./category/category.component";
import { AddComponent } from "./category/add-category/add.component";
import { ReasonsComponent } from "./reasons/reasons.component";
import { AddReasonComponent } from "./reasons/add-reason/add-reason.component";
import { ModesComponent } from "./modes/modes.component";
import { AddModeComponent } from "./modes/add-mode/add-mode.component";
import { VariantsComponent } from "./variants/variants.component";
import { AddVariantComponent } from "./variants/add-variant/add-variant.component";
import { EmailsComponent } from "./emails/emails.component";

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {
        path: "",
        redirectTo: "designs",
        pathMatch: "full",
      },
      // {
      //   path: "home",
      //   component: HomeComponent
      // },
      {
        path: "admins",
        component: AdminsComponent,
      },
      {
        path: "admins/add",
        component: AddAdminComponent,
      },
      {
        path: "admins/:id",
        component: AddAdminComponent,
      },

      {
        path: "designs",
        component: DesignsComponent,
      },
      {
        path: "artists",
        component: ArtistsComponent,
      },
      {
        path: "emails",
        component: EmailsComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "categories",
        component: CategoryComponent,
      },
      {
        path: "categories/add",
        component: AddComponent,
      },
      {
        path: "categories/:id",
        component: AddComponent,
      },
      {
        path: "reasons",
        component: ReasonsComponent,
      },
      {
        path: "reasons/add",
        component: AddReasonComponent,
      },
      {
        path: "reasons/:id",
        component: AddReasonComponent,
      },
      {
        path: "modes",
        component: ModesComponent,
      },
      {
        path: "modes/add",
        component: AddModeComponent,
      },
      {
        path: "modes/:id",
        component: AddModeComponent,
      },
      {
        path: "variants",
        component: VariantsComponent,
      },
      {
        path: "variants/add",
        component: AddVariantComponent,
      },
      {
        path: "variants/:id",
        component: AddVariantComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
