import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  images: any;
  categories = ["electronics", "abc", "xyz"];

  addProductForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    category: ["electronics", [Validators.required]],
    image: [null, [Validators.required]],
    featured: [false, [Validators.required]]
  })

  get name() {
    return this.addProductForm.get("name");
  }
  get description() {
    return this.addProductForm.get("description");
  }
  get price() {
    return this.addProductForm.get("price");
  }
  get category() {
    return this.addProductForm.get("category");
  }
  get image() {
    return this.addProductForm.get("image");
  }


  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.addProductForm.controls["image"].setValue(this.images)
    }
  }

  addProduct() {
    if (this.name?.valid && this.description?.valid && this.price?.valid && this.category?.valid && this.image?.valid) {

      console.log(this.addProductForm.value);
      const formData = new FormData();
      Object.entries(this.addProductForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }
      );
    } else {
      alert("Details are invalid");
    }
  }
}
