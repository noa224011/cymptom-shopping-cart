import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CartComponent } from './cart/cart.component';
import { CymptomIconComponent } from './cymptom-icon/cymptom-icon.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    SideBarComponent,
    CartComponent,
    CymptomIconComponent,
    CartIconComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
