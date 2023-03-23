import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent {

  public list = true;

  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public editStatus = false;
  private currentID!: number | string;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
    this.initDiscountForm();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      date: new Date().toLocaleString().toString(),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: null
    })
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.updateFirebase(this.discountForm.value, this.currentID as string).then(() => {
        this.loadDiscounts();
      })
    } else {
      this.discountService.createFirebase(this.discountForm.value).then(() => {
        this.loadDiscounts();
      })
    }
    this.list = true;
    this.editStatus = false;
    this.discountForm.reset({date: new Date().toLocaleString().toString()});
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      date: discount.date,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.list = false;
    this.editStatus = true;
    this.currentID = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.deleteFirebase(discount.id as string).then(() => {
      this.loadDiscounts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
        this.discountForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string) {
    return this.discountForm.get(control)?.value
  }

  openList(): void {
    if (this.list) {
      this.list = false;
    } else {
      this.list = true
    }
  }

}
