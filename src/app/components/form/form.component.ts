import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      fistName: ['', Validators.required]
    });

  }

}
