import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-contacts.container',
  templateUrl: './contacts.container.component.html',
  styleUrls: ['./contacts.container.component.scss']
})
export class ContactsContainerComponent implements OnInit {

  contacts$ = this.firestore.collection('contacts').valueChanges();

  auth$ = this.afAuth.authState;

  constructor(private auth: AuthService, private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
