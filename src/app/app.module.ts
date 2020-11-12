import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptorService } from './authentication/auth.interceptor';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { PaymentComponent } from './payment/payment.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
// import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SearchResultsComponent,
    DoctorprofileComponent,
    BookAppointmentComponent,
    PaymentComponent,
    PatientDashboardComponent
    // HomeComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MomentDateAdapter,
    MatNativeDateModule,
    MatMomentDateModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatDatepickerModule,
    OrderModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[],
  providers: [ {provide : HTTP_INTERCEPTORS ,useClass : AuthInterceptorService, multi:true}
                // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
