import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{AngularFireModule}from'@angular/fire/compat' ;
import{AngularFireStorageModule}from '@angular/fire/compat/storage';
import{AngularFirestore, AngularFirestoreModule}from '@angular/fire/compat/firestore'
import { environment } from './environments/environment';
import { SellComponent } from './components/sell/sell.component';
import { BossService } from './services/boss.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { BuyComponent } from './components/buy/buy.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { MylistComponent } from './components/mylist/mylist.component';
@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    BuyComponent,
    WelcomeComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WishlistComponent,
    PurchasesComponent,
    FeedbacksComponent,
    MylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    provideAuth(() => getAuth()),
    HttpClientModule,
    provideStorage(()=>getStorage())
  ],
  providers: [
    provideClientHydration(),
    BossService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
