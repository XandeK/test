import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  reviewList: any = [];
  constructor(private CategoryService: CategoryService, private router:Router) {
    this.CategoryService.getAllReviews().subscribe(data => {
      this.reviewList = data;
      console.log(this.reviewList);
    });
  }

  ngOnInit() {

  }

  approve(id: string) {
    this.CategoryService.approveRejectReviews(id, true).subscribe((results: any) => {
      if (results.result === 'OK') {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/feedback']);
      });
      }
    });
  }

  reject(id: string) {
    this.CategoryService.approveRejectReviews(id, false).subscribe((results: any) => {
      if (results.result === 'OK') {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/feedback']);
      });
      }
    });
  }

}
