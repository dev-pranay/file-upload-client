import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetail } from '../classes/user-detail';
import { UserDetailService } from '../services/user-detail.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  private userDetail = new UserDetail();

  constructor(private userDetailService: UserDetailService) { }

  ngOnInit() {
  }

  selectFile(event: any) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      var size = event.target.files[0].size;
      if (size > 500000) {
        alert("size must not exceeds 0.5 MB");
        this.form.get('profileImage').setValue("");
      }
      else {
        this.selectedFiles = event.target.files;
      }
    } else {
      alert('invalid format!');
    }
  }

  // create the form object
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    profileImage: new FormControl('', Validators.required)
  });

  AdminForm(AdminInformation: any) {
    this.userDetail.name = this.FullName.value;
    this.userDetail.emailId = this.Email.value;

    console.log(AdminInformation);

    this.userDetailService.saveData(this.userDetail).subscribe(
      response => {
        let result = response;
        console.log(result);

        if (result > 0) {
          if (this.selectedFiles != null) {
            this.currentFileUpload = this.selectedFiles.item(0);
            console.log(this.currentFileUpload);

            this.userDetailService.uploadFile(this.currentFileUpload, result).subscribe(
              res => {
                let re = res;
                if (re > 0) {
                  alert("file upload successful");
                  this.form.reset();
                } else {
                  alert("error while uploading file details");
                }
              },
              err => {
                alert("error while uploading file details");
              }
            );
          }
        }
      },
      error => {
        console.log("error while saving data in the DB");
      }
    );
  }

  get FullName() {
    return this.form.get('fullName');
  }

  get Email() {
    return this.form.get('email');
  }

}
