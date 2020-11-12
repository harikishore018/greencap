import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { AuthComponent } from './authentication/auth/auth.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
// import { HomeComponent } from './home/home.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path:'profile' , component:ProfileComponent ,canActivate: [AuthGuard] },
  { path:'auth', component: AuthComponent },
  { path:'doctor/:doctorId',component:DoctorprofileComponent},
  { path:'appointment/:doctorId',component:BookAppointmentComponent},
  { path:'searchresults',component: SearchResultsComponent },
  { path:'pay',component:PaymentComponent },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  // { path:'home',component:HomeComponent },
  { path:'dashboard',component:PatientDashboardComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
