import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  productName: FormControl;
  productDescription: FormControl;
  productPrice: FormControl;
  productNormalPrice: FormControl;
  productAgentPrice: FormControl;
  productDegree: FormControl;
  modalRef: BsModalRef;
  result: any = [];
  catName: any = [];
  CategoryService: any;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    const categoryName = this.route.snapshot.params.categoryName;
    this.catName = this.route.snapshot.params.categoryName;
    this.categoryService.getCategoryProduct(categoryName).subscribe(data => {
      this.result = data;
    });
    this.productName = new FormControl('');
    this.productDescription = new FormControl('');
    this.productNormalPrice = new FormControl('');
    this.productAgentPrice = new FormControl('');
    this.productDegree = new FormControl('');
  }

  openCatModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.CategoryService.addNewCategory({
      name: this.productName.value,
      description: this.productName.value,
      category: this.route.snapshot.params.categoryName,
      price: '0',
      standard_price: this.productNormalPrice,
      agent_price: this.productAgentPrice,
      degreeType: this.productDegree,
      image: [],
      discount: {
        isDiscount: false,
        price: ''
      }
    }).subscribe((response: any) => {
      if (response.result === 'OK') {
        this.modalRef.hide();
      }
    });
  }
}