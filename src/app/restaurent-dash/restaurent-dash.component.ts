import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';


@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup

  restaurentModelObj: RestaurentData = new RestaurentData;

  allRestaurentData: any;

  showAdd!:boolean;
  showBtn!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();

  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }
  // Subscribe the data
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurents records added successfully");

      // clear fill form data 0 
      let ref = document.getElementById("clear");
      ref?.click();

      this.formValue.reset();
      this.getAllData(); // When u post any data
    },
    err =>{
      alert("something went wrong");
    }
    )
  }

//  Get All Data
getAllData(){
  this.api.getRestaurent().subscribe(res =>{
    this.allRestaurentData = res;
  })
}

// delete Records
deleteResto(data:any){
  this.api.deleteRestaurent(data.id).subscribe(res=>{
    alert("Restaurents records are deleted");
    this.getAllData(); //For refreshing the page
  })
}

// Edit Records
onEditResto(data:any){
  this.showAdd=false;
    this.showBtn=true;
  this.restaurentModelObj.id = data.id;
 this.formValue.controls['name'].setValue(data.name);
 this.formValue.controls['email'].setValue(data.email);
 this.formValue.controls['mobile'].setValue(data.mobile);
 this.formValue.controls['address'].setValue(data.address);
 this.formValue.controls['services'].setValue(data.services);
}


// Update Records
updateResto(){
  this.restaurentModelObj.name = this.formValue.value.name;
  this.restaurentModelObj.email = this.formValue.value.email;
  this.restaurentModelObj.mobile = this.formValue.value.mobile;
  this.restaurentModelObj.address = this.formValue.value.address;
  this.restaurentModelObj.services = this.formValue.value.services;

 this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
   alert("Records updates successfully");
   // clear fill form data 0 
   let ref = document.getElementById("clear");
   ref?.click();

   this.formValue.reset();
   this.getAllData(); // When u post any data
 })

}

}
