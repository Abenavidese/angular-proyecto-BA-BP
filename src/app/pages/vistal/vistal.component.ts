import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
import { Book, BookService } from '../../core/services/book.service';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vistal',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './vistal.component.html',
  styleUrl: './vistal.component.scss'
})
export default class VistalComponent implements OnInit {
  
  books: (Book & { showDetails: boolean; coverUrl: string })[] = [];
  query: string = 'programming'; // Puedes cambiar esto para probar con diferentes consultas

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.searchBooks();
  }

  searchBooks(): void {
    this.bookService.searchBooks(this.query).subscribe((data: Book[]) => {
      this.books = data.map(book => ({
        ...book,
        showDetails: false,
        coverUrl: this.bookService.getCoverUrl(book.cover_i),
        shortDescription: this.getShortDescription(book.description, 50)
      }));
    });
  }
  
  toggleDetails(book: Book & { showDetails: boolean }): void {
    book.showDetails = !book.showDetails;
  }
  
  getShortDescription(description: string, wordLimit: number): string {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  }

  


}
