import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    constructor(private firestore: AngularFirestore) {}

  getBooks(): Observable<any[]> {
    return this.firestore.collection('books').valueChanges({ idField: 'id' });
  }

  getBookById(id: string): Observable<any> {
    return this.firestore.collection('books').doc(id).valueChanges();
  }

  updateBook(id: string, data: any): Promise<void> {
    return this.firestore.collection('books').doc(id).update(data);
  }
}
