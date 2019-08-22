import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      feedback: [''],
      track: ['', Validators.required],
      githubURL: [''],
      screenshots: ['', Validators.required]

    });

  }
  onSubmit(data) {
    console.log(data);
  }

}
