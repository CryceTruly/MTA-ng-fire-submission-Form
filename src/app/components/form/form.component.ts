import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  private submissionsCollection: AngularFirestoreCollection<any>;
  isSubmitting: boolean;
  submitted:boolean;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.isSubmitting = false;
    this.submitted=false;
  }

  ngOnInit() {
    this.submissionsCollection = this.afs.collection('submissions');

    this.myForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: [''],
      track: ['', Validators.required],
      githubURL: [''],
      screenshots: ['', Validators.required]

    });

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

}
