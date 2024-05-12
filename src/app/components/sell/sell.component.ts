import { Component } from '@angular/core';
import{BossService}from '../../services/boss.service'
import { Cars } from '../../interface/cars';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {

  constructor(private service:BossService,private router:Router) { }

  imageUrl: string | null = null;

   url: any;

	 msg = "";

   public Filesss!:File ;

   fileSelected: boolean = false;

   CarsObj: Cars= {
    id: '',
    brand: '',
    model: '',
    price: '',
    year: '',
    kilometer:'',
    transmission:'',
    phone_number:'',
    location:'',
    image_url:'',
   
    
  };
    id:any= '';
    brand:string= '';
    model:string= '';
    price:string='' ;
    year:string='' ;
    kilometer:string='';
    transmission:string='';
    phone_number:string='';
    location:string='';
    image_url:string='';

    ////------------------------ Display the image in the form -------------------------////

   selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
		this.fileSelected = event.target.files.length > 0;
		const file: File = event.target.files[0];
          if (file) {
      this.Filesss = file;
    }
	}
  /////------------------ upload the image in firebase ---------------------------////////

  uploadimage()
	{		
		if(this.fileSelected)
			{
        if(this.brand==''||this.model==''||this.price==''||this.year==''||this.kilometer==''||this.transmission==''||this.phone_number==''||this.location=='')
          {setTimeout(() => {				
            alert("Please Fill All The Fields First :");
            }, 100);
          return
        } 
        else
        { 
				setTimeout(() => {			
					alert(' The Phote is Saved Press Submit To Submit The Data : ');
		  }, 1000);						
			this.service.uploadImage(this.Filesss).then((url: string) => {
        this.imageUrl = url;
        this.CarsObj.image_url = url;
        console.log('Image uploaded successfully! URL:', this.image_url);
      }).catch((error) => {
        alert('Failed to upload image'+''+ error);
      });
    }
	}
	else{
		alert("Please Choose Image :");
	}
}

///--------------------- reset Form-------------------------/////

resetForm() {
 this.id= '';
 this.brand= '';
 this.model= '';
 this.price = '';
 this.year = '';
 this.kilometer = '';
 this.transmission='';
 this.phone_number = '';
 this.location='';
 this.image_url='';
}

///////------------------- add student in firebase ------------------------------///////

addCar()
 {
    if(this.brand==''||this.model==''||this.price==''||this.year==''||this.kilometer==''||this.transmission==''||this.phone_number==''||this.location=='',this.CarsObj.image_url=='')
      {setTimeout(() => {				
        alert("Please Fill All The Fields And Press Save Photo After Upload :");
        }, 100);
      return
    } 
    else if(this.fileSelected)
    { 
  this.CarsObj.id = '';
  this.CarsObj.brand = this.brand;
  this.CarsObj.model = this.model;
  this.CarsObj.price = this.price;
  this.CarsObj.kilometer = this.kilometer;
  this.CarsObj.transmission = this.transmission;
  this.CarsObj.phone_number = this.phone_number;
  this.CarsObj.location = this.location;
  this.CarsObj.year = this.year;
  this.service.addCar(this.CarsObj);
      setTimeout(() => {			
        alert("Added Successfully :")
      }, 800);  
  this.resetForm();
  this.reloadPage();
  
      }
      else {
        alert("Please Choose Image :");
      }
  }
  
  reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
}
