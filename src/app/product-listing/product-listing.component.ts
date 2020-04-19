import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  form: FormGroup;
  modalRef: BsModalRef;
  result: any = [];
  catName: any = [];
  images: string[] = [];
  CategoryService: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const categoryName = this.route.snapshot.params.categoryName;
    this.catName = this.route.snapshot.params.categoryName;
    this.categoryService.getCategoryProduct(categoryName).subscribe(data => {
      this.result = data;
    });
    this.form = this.formBuilder.group({
      productName: [null, Validators.required],
      productDescription: [null, Validators.required],
      productPrice: [null, Validators.required],
      productStandardPrice: [null, Validators.required],
      productAgentPrice: [null, Validators.required],
      productDegreeType: [null, Validators.required],
      productDiscount: [false],
      productDiscountPrice: [null]
    })
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      let files = fileInput.target.files
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onload = (event: any) => {
          this.images.push(event.target.result);
        }
      }
    }
  }

  openCatModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async closeModal() {
    console.log('Form Values:', this.form);
    const requestBody = {
      name: this.form.get('productName').value,
      description: this.form.get('productDescription').value,
      category: this.catName,
      price: this.form.get('productPrice').value,
      standard_price: this.form.get('productStandardPrice').value,
      agent_price: this.form.get('productAgentPrice').value,
      degreeType: this.form.get('productDegreeType').value,
      image: this.images,
      discount: {
        isDiscount: this.form.get('productDiscount').value,
        price: this.form.get('productDiscountPrice').value
      }
    }
    console.log('Request Body:', requestBody);
    try {
      await this.categoryService.addNewProduct(requestBody);
      this.modalRef.hide();
    } catch(error) {
      console.log(error);
    }
  }
}