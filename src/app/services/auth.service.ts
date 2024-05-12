
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, addDoc ,setDoc,doc} from "firebase/firestore";
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';


const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router ) {}
  getCurrentUser() {
    return this.fireauth.authState; // Returns an observable of the current user
  }
  
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['welcome']);
        
      },err=> {
        alert("Incorrect Email or Password");
        this.router.navigate(['/login']);
      }
    );
  }

  
  // authService.ts

  register(email: string, password: string, name: string ,phone_num:string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        if (userCredential && userCredential.user) {
          // Add user's name during registration
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, {
            name, // Include the name in the user document
            phone_num,
            email,
            userId: userCredential.user.uid,
          });
  
          // Create user's wishlist collection inside their document
          const wishlistRef = collection(userDocRef, 'wishlist');
          await setDoc(doc(wishlistRef), {});
          const mylistRef = collection(userDocRef, 'mylist');
          await setDoc(doc(mylistRef), {});
          const purchasesRef = collection(userDocRef, 'purchases');
          await setDoc(doc(purchasesRef), {});
  
          alert('Registration successful');
          this.router.navigate(['']);
        } else {
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }
  


  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  
}