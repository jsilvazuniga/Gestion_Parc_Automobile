import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/security/authentication.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor(private _router: Router,
              private _authenticationCoreService : AuthenticationService) { }

  ngOnInit(): void {


    if (this._authenticationCoreService.isAuthorized()) {
      this._router.navigate(['/Gestion']);
    }

  }

}
