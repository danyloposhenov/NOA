import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, DocumentData } from '@firebase/firestore';
import { ICategoryRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAll() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const categoryDocumentRef = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentRef, { idField: 'id' });
  }

  update(category: ICategoryRequest, id: string) {
    const categoryDocumentRef = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentRef, { ...category });
  }

  create(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  delete(id: string) {
    const categoryDocumentRef = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentRef);
  }
}
