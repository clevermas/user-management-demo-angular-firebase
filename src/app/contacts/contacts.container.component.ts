import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CONTACTS_COLLECTION } from '../core/contacts/contacts.collection';

@Component({
  selector: 'app-contacts.container',
  templateUrl: './contacts.container.component.html',
  styleUrls: ['./contacts.container.component.scss']
})
export class ContactsContainerComponent implements OnInit {

  contacts$ = this.firestore.collection(CONTACTS_COLLECTION).valueChanges();

  constructor(private auth: AuthService, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
