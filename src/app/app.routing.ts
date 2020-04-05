import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { OrderRecordsComponent } from './order-records/order-records.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const appRoutes: Routes = [
{ path: 'sideNav', component: SideNavComponent },
{ path: 'login', component: LoginComponent },
{ path: 'orderRecords', component: OrderRecordsComponent },
{ path: 'productListing/:categoryName', component: ProductListingComponent },
{ path: 'productCategory', component: ProductCategoryComponent },
{ path: 'blogPage', component: BlogPageComponent },
{ path: 'feedback', component: FeedbackComponent },
{ path: 'changePassword', component: ChangePasswordComponent },

{ path: '', component: LoginComponent, pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);