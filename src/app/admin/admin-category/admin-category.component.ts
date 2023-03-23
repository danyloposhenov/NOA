import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public list = true;

  public categoryForm!: FormGroup;
  public adminCategories: Array<ICategoryResponse> = [];
  public editStatus = false;
  public currentID!: number | string;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      id: null,
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: null,
    })
  }

  loadCategory(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateFirebase(this.categoryForm.value, this.currentID as string).then(() => {
        this.loadCategory();
      })
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategory();
      })
    }
    this.list = true;
    this.editStatus = false;
    this.currentID = 0;
    this.categoryForm.reset();
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryService.getOneFirebase(category.id as string).subscribe(data => {
      console.log(data, 'firebase');
    })
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategory();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.categoryForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string) {
    return this.categoryForm.get(control)?.value
  }

  openList(): void {
    this.list = !this.list
  }
}
