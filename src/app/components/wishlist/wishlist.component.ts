import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  userData$: Observable<any> = of(null); // Initialize with an observable

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.userData$ = this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          // User is authenticated, fetch Firestore data
          return this.fetchUserData(user.uid);
        } else {
          // User is not authenticated, return an empty observable
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        return of(null); // Return an empty observable on error
      })
    );

    this.userData$.subscribe(userData => {
      console.log('userData:', userData);
    });
  }

  fetchUserData(userId: string): Observable<any[]> {
    return this.firestore.collection(`users/${userId}/wishlist`).valueChanges();
  }
}
