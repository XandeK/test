import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IfStmt } from '@angular/compiler';


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

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    const categoryName = this.route.snapshot.params.categoryName;
    this.catName = this.route.snapshot.params.categoryName;
    this.categoryService.getCategoryProduct(categoryName).subscribe(data => {
      this.result = data;
    });
    this.form = this.formBuilder.group({
      productId: [null],
      productName: [null, Validators.required],
      productDescription: [null, Validators.required],
      productPrice: [null, Validators.required],
      productStandardPrice: [null, Validators.required],
      productAgentPrice: [null, Validators.required],
      productDegreeType: [null, Validators.required],
      productDiscount: [false],
      productDiscountPrice: [null],
      productImagesCount: [null]
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

  openCatModal(template: TemplateRef<any>, mode: string, id?: string) {
    if (mode === 'create') {
      this.form.reset();
      this.images = [];
      this.modalRef = this.modalService.show(template);
    } else {
      this.categoryService.getProduct(id).then((results: any) => {
        this.form.get('productId').patchValue(results._id);
        this.form.get('productName').patchValue(results.name);
        this.form.get('productDescription').patchValue(results.description);
        this.form.get('productPrice').patchValue(results.price);
        this.form.get('productStandardPrice').patchValue(results.standard_price);
        this.form.get('productAgentPrice').patchValue(results.agent_price);
        this.form.get('productDegreeType').patchValue(results.degreeType);
        this.form.get('productDiscount').patchValue(results.discount.isDiscount);
        this.form.get('productDiscountPrice').patchValue(results.discount.price);
        this.form.get('productImagesCount').patchValue(results.image.length);
        this.modalRef = this.modalService.show(template);
      });
    }
  }


  async closeModal() {
    console.log('Form Values:', this.form);
    if (this.form.get('productId').value) {
      // Update
      const requestBody = {
        id: this.form.get('productId').value,
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
        const results = await this.categoryService.updateProduct(requestBody);
        this.modalRef.hide();
        setTimeout(() => {
          this.categoryService.getCategoryProduct(this.route.snapshot.params.categoryName).subscribe(data => {
            this.result = data;
          });
        }, 500);
      } catch (error) {
        console.log(error);
      }
    } else {
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
        setTimeout(() => {
          this.categoryService.getCategoryProduct(this.route.snapshot.params.categoryName).subscribe(data => {
            this.result = data;
          });
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }

  }

  deleteProduct(results: any) {
    this.categoryService.deleteProduct(results._id).then((results: any) => {
      if (results.result === 'OK') {
        this.categoryService.getCategoryProduct(this.route.snapshot.params.categoryName).subscribe(data => {
          this.result = data;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['productListing', this.route.snapshot.params.categoryName]);
          });
        });
      }
    });
  }
}
