import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CartComponent } from './cart/cart.component';
import { CymptomIconComponent } from './cymptom-icon/cymptom-icon.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { MailIconComponent } from './mail-icon/mail-icon.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    SideBarComponent,
    CartComponent,
    CymptomIconComponent,
    CartIconComponent,
    MailIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
