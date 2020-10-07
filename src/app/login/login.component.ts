import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loginError$ = this.auth.error$;
  processing$ = this.auth.processing$;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

   async login() {
    this.auth.clearError();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      await this.auth.login(email, password);
    }
  }

}
