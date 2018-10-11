import { Component, OnInit } from '@angular/core';

import { QuoteService } from './quote.service';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;

  @LocalStorage()
  num: number;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
  }
}
