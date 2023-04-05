import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, updateDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject <boolean>;

  public orderCollection!: CollectionReference<DocumentData>
  public userCollection!: CollectionReference<DocumentData>

  constructor(public afs: Firestore) {
    this.orderCollection = collection(this.afs, 'orders')
    this.userCollection = collection(this.afs, 'users')
  }

  getOrdersForUser(id: string) {
    const categoryDocumentRef = doc(this.afs, `users/${id}`);
    return docData(categoryDocumentRef, { idField: 'id' });
  }

  getAllOrders() {
    return collectionData(this.orderCollection, { idField: 'id' });
  }

  updateUserOrders(user: any, id: string) {
    const productDocumentRef = doc(this.afs, `users/${id}`);
    return updateDoc(productDocumentRef, { ...user });
  }

  createOrder(order: any) {
    return addDoc(this.orderCollection, order);
  }

}
