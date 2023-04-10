import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { ILogin } from '../../interfaces/account/account.interface';
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>();

  private authCollection!: CollectionReference<DocumentData>;

  constructor ( private afs: Firestore ) {
    this.authCollection = collection(this.afs, 'users');
  }

  loginFirebase(credential: ILogin) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, credential.email, credential.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  updateUser(user: User, id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(userDocumentReference, { ...user });
  }
}
