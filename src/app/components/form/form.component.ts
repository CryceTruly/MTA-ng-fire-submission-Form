import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as validUrl from 'valid-url';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  private submissionsCollection: AngularFirestoreCollection<any>;
  isSubmitting: boolean;
  submitted: boolean;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.isSubmitting = false;
    this.submitted = false;
  }

  ngOnInit() {
    this.submissionsCollection = this.afs.collection('submissions');
    this.myForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
      track: ['', Validators.required],
      githubURL: [''],
      screenshots: ['', [Validators.required, this.isValidURL]]

    });

    this.changeUserTrack('Android');

  }
  onSubmit(data) {
    this.isSubmitting = true;
    this.submissionsCollection.add(data).then(res => {
      this.submitted = true;
    }).catch(_ => {
    }).finally(() => {
      this.isSubmitting = false;
    });
  }

  changeUserTrack(choice: string) {
    const githubControl = this.myForm.get('githubURL');
    if (choice === 'Android') {
      githubControl.setValidators([Validators.required, this.isValidURL]);

    } else {
      githubControl.clearValidators();
    }

    githubControl.updateValueAndValidity();

  }

  isValidURL(control: FormControl): { [key: string]: boolean } | null {
    if (control.value.length > 1 && !validUrl.isHttpUri(control.value)) {
      return { isValid: true };
    }
    return null;
  }
}
