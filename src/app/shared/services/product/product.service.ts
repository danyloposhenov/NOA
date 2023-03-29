import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { ICategoryRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productCollection!: CollectionReference<DocumentData>

  constructor(public afs: Firestore) {
    this.productCollection = collection(this.afs, 'products')
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const productDocumentRef = doc(this.afs, `products/${id}`);
    return docData(productDocumentRef, { idField: 'id' });
  }

  update(category: ICategoryRequest, id: string) {
    const productDocumentRef = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentRef, { ...category });
  }

  create(category: ICategoryRequest) {
    return addDoc(this.productCollection, category);
  }

  delete(id: string) {
    const productDocumentRef = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentRef);
  }
}
