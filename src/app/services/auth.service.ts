import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnChanges {
  public signedIn!: Observable<any>;
  public user$!: any;
  uid: number = 0;

  constructor(
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.signedIn = new Observable((subscriber) => {
      this.afAuth.onAuthStateChanged(subscriber);
    });

    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null){
        this.user$ = auth;
      }
    })

    const users = this.firestore.collection<User>('users').valueChanges();
    users.forEach(usersData => {
      usersData.forEach(u => {
        if(u.email === this.user$.email){
          this.user$.id = u.uid;
        }
      })
    });
  }

  ngOnChanges(): void {
    const users = this.firestore.collection<User>('users').valueChanges();
    users.forEach(usersData => {
      usersData.forEach(u => {
        if(u.email === this.user$.email){
          this.user$.id = u.uid;
        }
      })
    });
  }

  getAuthStatus() {
    return this.afAuth.currentUser !== null;
  }

  async getUser() {
    return await this.afAuth.currentUser;
  }

  getUserFromDatabase(){
    let userRes: any;
    const users = this.firestore.collection<User>('users').valueChanges();
    users.forEach(usersData => {
      usersData.forEach(u => {
        if(u.email === this.user$.email){
          userRes = u;
          return userRes;
        }
      })
    });
  }

  get isLoggedIn(): boolean {
    let user = null;
    let item = localStorage.getItem('user');
    if(item !== null){
      user = JSON.parse(item);
    }
    return user !== null;
  }

  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log("Signed in!");
      });
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.log('Sign out failed', error);
      return false;
    }
  }

  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log("Signed up!");
      });

      
    const users = this.firestore.collection<User>('users').valueChanges();
    users.forEach(usersData => {
      usersData.forEach(user => {
        if(Number(user.uid) > this.uid){
          this.uid = Number(user.uid);
        }
      })
    });
    this.uid = Math.floor(100000 * Math.random());
    let uidString = this.uid.toString();
    let newUser = {
      uid: uidString,
      email: email
    }
    this.firestore.collection('users').doc(newUser.uid).set(newUser);
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.id}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        client: true
      }
    };
    return userRef.set(data, { merge: true });
  }
}
