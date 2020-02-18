import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  },
  {
    path: "dashboard",
    // canActivate: [AuthGuard],
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
