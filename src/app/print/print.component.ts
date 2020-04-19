import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  printObject: any;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.printObject = this.categoryService.getPrintItemDetails();
    console.log(this.printObject);
  }
  onPrint(){
    window.print();
}
}
