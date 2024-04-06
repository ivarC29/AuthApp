import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ValidatorsService } from '../../services';
import { User, UserRegister } from '../../interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  private fb                = inject( FormBuilder );
  private authService       = inject( AuthService );
  private validatorService  = inject( ValidatorsService );
  private router            = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email:      ['', [ Validators.required, Validators.email ]],
    name:       ['', [ Validators.required, Validators.minLength(2) ]],
    password:   ['', [ Validators.required, Validators.minLength(6) ]],
    password2:  ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  onRegister() {
    const { password2, ...user } = this.myForm.value;

    this.authService.register( user )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ( message ) => {
          Swal.fire('Error', message, 'error' )
        }
      });

  }

}
