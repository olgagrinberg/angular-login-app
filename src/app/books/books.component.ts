// src/app/books/books.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  cover: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      genre: "Classic Fiction",
      rating: 4.2,
      description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
      cover: "https://via.placeholder.com/120x180/4a90e2/ffffff?text=Gatsby"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      genre: "Fiction",
      rating: 4.5,
      description: "A gripping tale of racial injustice and loss of innocence in the American South.",
      cover: "https://via.placeholder.com/120x180/e74c3c/ffffff?text=Mockingbird"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genre: "Dystopian Fiction",
      rating: 4.4,
      description: "A dystopian social science fiction novel about totalitarianism and surveillance.",
      cover: "https://via.placeholder.com/120x180/2c3e50/ffffff?text=1984"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      genre: "Romance",
      rating: 4.3,
      description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
      cover: "https://via.placeholder.com/120x180/9b59b6/ffffff?text=Pride"
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      genre: "Coming-of-age Fiction",
      rating: 3.8,
      description: "A controversial novel about teenage rebellion and alienation in post-war America.",
      cover: "https://via.placeholder.com/120x180/f39c12/ffffff?text=Catcher"
    },
    {
      id: 6,
      title: "Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      genre: "Fantasy",
      rating: 4.6,
      description: "An epic high-fantasy novel about the quest to destroy the One Ring.",
      cover: "https://via.placeholder.com/120x180/27ae60/ffffff?text=LOTR"
    }
  ];

  username = '';
  searchTerm = '';
  selectedGenre = '';
  filteredBooks: Book[] = [];
  genres: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is authenticated
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.username = localStorage.getItem('username') || 'User';
    this.filteredBooks = this.books;
    this.genres = [...new Set(this.books.map(book => book.genre))];
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenre = !this.selectedGenre || book.genre === this.selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }

  onSearchChange() {
    this.filterBooks();
  }

  onGenreChange() {
    this.filterBooks();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedGenre = '';
    this.filteredBooks = this.books;
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars;
  }
}
