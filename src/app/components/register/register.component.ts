import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  name : string = '';
  phone_num : string = '';
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.name == '') {
      alert('Please enter your name');
      return;
    }
    if(this.phone_num == '') {
      alert('Please enter your phone Number');
      return;
    }
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }


    this.auth.register(this.email,this.password , this.name, this.phone_num);
    this.name = '';
    this.phone_num='';
    this.email = '';
    this.password ='';

}

}
