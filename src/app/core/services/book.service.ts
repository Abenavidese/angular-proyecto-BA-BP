// src/app/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Book {
  title: string;
  author: string;
  genre: string;
  description: string;
  cover_i: number;
  shortDescription?: string; // Agregamos shortDescription aquí
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`).pipe(
      map((response: any) => response.docs.map((doc: any) => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
        genre: doc.subject ? doc.subject.join(', ') : 'N/A',
        description: doc.first_sentence ? doc.first_sentence.join(' ') : 'No description available',
        cover_i: doc.cover_i,
        
      })))
    );
  }

  getCoverUrl(cover_i: number): string {
    return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'assets/default-cover.jpg';
  }
}