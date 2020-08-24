import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public token: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getToken();
  }

  private getToken() {
    this.token = localStorage.getItem('token');
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['login']);
    this.toastr.success('Você foi deslogado', 'Sucesso');
  }
}
