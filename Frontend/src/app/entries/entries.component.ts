import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '../Services/entry.service';
import { Entry } from '../Data/Entry';
import { User } from '../Data/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})

/*
  Show the users dream
  Option to update/delete a dream
*/
export class EntriesComponent implements OnInit {
  user: User;
  errorMessage: any;
  entries: Entry[] = [];
  pagedEntries: Entry[] = [];
  pages: number[];
  pageSize = 5;
  currentPage = 1;
  totalPages: number;

  constructor(
    private router: Router,
    private entryService: EntryService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'));
    this.findAllEntries();
  }
  goToEntryForm(): void {
    this.router.navigate(['/dreams']);
  }
  goToPage(page: number) {
    this.currentPage = page;
    if (this.currentPage <= 0) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePages();
  }
  

  findAllEntries(): void {
    this.entryService.findAllEntries(this.user).subscribe({
      next: (data) => {
        this.entries = data;
        this.updatePages();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
    });
  }

  updatePages() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEntries = this.entries.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.entries.length / this.pageSize);
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  deleteEntry(id:number):void{
    this.entries = this.entries.filter(e => e.id !== id);
    this.updatePages();
    this.entryService.deleteEntry(id).subscribe({
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
    });
  }
  updateEntry(entry:Entry):void{
    this.router.navigate(['/dreams'], { state: { entry: entry } });
  }
}
