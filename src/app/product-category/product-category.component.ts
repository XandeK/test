import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  categoryName: FormControl;
  newCategoryname: FormControl;
  createModalRef: BsModalRef;
  updateModalRef: BsModalRef;
  categoryList: any = [];
  productList: any = [];
  constructor(private CategoryService: CategoryService, private router: Router, private modalService: BsModalService) {
    this.CategoryService.getAllCategory().subscribe(categoryListData => {
      this.categoryList = categoryListData;
      this.CategoryService.getAllProduct().subscribe(productListData => {
        this.productList = productListData;
      });
    });
    this.categoryName = new FormControl('');
    this.newCategoryname = new FormControl('');
  }

  CategoryProducts(categoryName: string) {
    this.router.navigate(['/productListing', categoryName]);
  }

  ngOnInit() {

  }

  openCreateCatModal(template: TemplateRef<any>) {
    this.createModalRef = this.modalService.show(template);
  }

  closeCreateModal() {
    this.CategoryService.addNewCategory(this.categoryName.value).subscribe((response: any) => {
      if (response.result === 'OK') {
        this.createModalRef.hide();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['productCategory']);
      });
      }
    });
  }

  openUpdateCatModal(id: string, template: TemplateRef<any>) {
    this.updateModalRef = this.modalService.show(template);
    this.updateModalRef.content = {id : id};
  }

  closeUpdateModal() {
    this.CategoryService.updateCategory(this.updateModalRef.content.id, this.newCategoryname.value).subscribe((response: any) => {
      if (response.result === 'OK') {
        this.updateModalRef.hide();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['productCategory']);
      }); 
      }
    });
  }

  deleteCategory(id: string) {
    this.CategoryService.deleteCategory(id).subscribe((results: any) => {
      if (results.result === 'OK') {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/productCategory']);
      });
      }
    })
  }

}
