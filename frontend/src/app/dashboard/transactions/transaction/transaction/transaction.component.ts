import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @Input() transactions!: any;

  constructor() {}

  ngOnInit(): void {}
}