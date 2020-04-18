import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from '../category.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-records',
  templateUrl: './order-records.component.html',
  styleUrls: ['./order-records.component.css']
})
export class OrderRecordsComponent implements OnInit {

  editModalRef: BsModalRef;
  updateStatus: FormControl;
  orderList: any = [];
  constructor(private CategoryService: CategoryService, private modalService: BsModalService, private router:Router) {
    this.CategoryService.getAllOrders().subscribe(orderList => {
      this.orderList = orderList;
      console.log(this.orderList);
    });
  }


  ngOnInit() {
    this.updateStatus = new FormControl('Delivering');
  }

  editModalOpen(template: TemplateRef<any>, id: string) {
    this.editModalRef = this.modalService.show(template);
    this.editModalRef.content = {
      id: id
    }
  }

  closeUpdateModal() {
    this.CategoryService.updateOrderStatus(this.editModalRef.content.id, this.updateStatus.value).subscribe((results: any) => {
      if (results.result === 'OK') {
        this.updateStatus.patchValue("Delivering");
        this.editModalRef.hide();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['orderRecords']);
      });
      }
    });
  }

}
