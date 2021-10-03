import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() triggerRegister = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  showRegister(): void{
    this.triggerRegister.emit();
  }

}
