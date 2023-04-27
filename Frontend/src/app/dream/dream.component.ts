import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Category } from '../Data/Category';
import { Entry } from '../Data/Entry';
import { CategoryService } from '../Services/category.service';
import { EntryService } from '../Services/entry.service';
import { NgForm } from '@angular/forms';
import { User } from '../Data/User';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-dream',
  templateUrl: './dream.component.html',
  styleUrls: ['./dream.component.css'],
})
export class DreamComponent implements OnInit {
  @ViewChild('entryForm', { static: true }) entryForm!: NgForm;
  _errorMessage: string = '';
  showCategoryInputText: boolean = false;
  showEntryForm: boolean = false;
  showChooseCategory: boolean = false;
  newCategoryInput: string = '';
  categories: Category[] = [];
  failedToAddEntry: boolean = false;
  update: boolean = false;
  entry: Entry = {
    id: 0,
    user: null,
    categories: [],
    description: '',
    date: new Date(),
    duration: -1,
    energyLevel: -1,
    stressLevel: -1,
  };
  user: User;
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _entryService: EntryService,
    private readonly cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllCategories();
    this.user = JSON.parse(this.cookie.get('user'));
    if (history.state.entry) {
      this.entry = history.state.entry;
      this.update = true;
    }
  }

  async findAllCategories(): Promise<void> {
    try {
      const categories = await this._categoryService
        .findAllCategories()
        .toPromise();
      this.categories = categories ?? [];
    } catch (err: any) {
      this._errorMessage = err.error.message;
      console.error(this._errorMessage);
    }
  }

  async addCategory(): Promise<void> {
    try {
      const category = { name: this.newCategoryInput, id: 0, entries: [] };
      const addedCategory = await this._categoryService
        .addCategory(category)
        .toPromise();
      if (addedCategory) this.categories = [...this.categories, addedCategory];
      this.newCategoryInput = '';
      this.hideCategoryForm();
    } catch (err: any) {
      this._errorMessage = err.error.message;
      console.error(this._errorMessage);
    }
  }
  async addEntry(): Promise<void> {
    try {
      if (this.update) {
        this.updateEntry();
        this.update = false;
      } else {
        if (this.user) this.entry.user = this.user;
        this.entry.date = new Date(this.entry.date.getTime() - (this.entry.date.getTimezoneOffset() * 60000));
        const addedEntry = await firstValueFrom(this._entryService.addEntry(this.entry));
        if (addedEntry) this.entry = addedEntry;
        this.entryForm.resetForm();
        this.failedToAddEntry = false;
      }
    } catch (err: any) {
      this.failedToAddEntry = true;
      this._errorMessage = err.error.message;
      console.error(this._errorMessage);
    }
    this.router.navigate(['/chart']);
  }
  updateEntry(): void {
    this._entryService.updateEntry(this.entry).subscribe({
      next: (data) => {
        this.entry = data;
      },
      error: (err) => {
        this._errorMessage = err.error.message;
        console.log(this._errorMessage);
      },
    });
  }
  showCategoryForm(): void {
    this.showCategoryInputText = !this.showCategoryInputText;
  }
  hideCategoryForm(): void {
    this.showCategoryInputText = false;
  }
  showEntryFormInput(): void {
    this.showEntryForm = !this.showEntryForm;
  }
  hideEntryFormInput(): void {
    this.showEntryForm = false;
  }
}
