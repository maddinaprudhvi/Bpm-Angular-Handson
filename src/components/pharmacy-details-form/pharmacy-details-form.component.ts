import { Component, OnInit } from "@angular/core";
import { GetDoctorDetailsService } from "src/app/get-doctor-details.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { GetPharmacyDetailsService } from "src/getPharmacyDetails.service";

@Component({
  selector: "app-pharmacy-details-form",
  templateUrl: "./pharmacy-details-form.component.html",
  styleUrls: ["./pharmacy-details-form.component.css"]
})
export class PharmacyDetailsFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  error: string;
  genders$ = [{ name: "Male" }, { name: "Female" }, { name: "Others" }];
  specialities$ = [
    { name: "Cardiologist" },
    { name: "Gynecology" },
    { name: "Children health" },
    { name: "Diabetologist" },
    { name: "Dietician" },
    { name: "Female" },
    { name: "Neurology" },
    { name: "Nephrology" },
    { name: "Psychiatry" },
    { name: "Vascular Surgery" }
  ];
  constructor(
    private getPharmacyDetailsService: GetDoctorDetailsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      pharmacyName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNo: ["", [Validators.required, Validators.minLength(10)]],
      city: ["", [Validators.required]],
      zipCode: ["", [Validators.required, Validators.minLength(6)]],
      address: ["", [Validators.required]]
    });
  }
  get forms() {
    return this.registerForm.controls;
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }
  save(formValues) {
    console.log("Pharmachy details form :", formValues);
    this.submitted = true;
    //validation check
    if (this.registerForm.invalid) {
      console.log("invalid form");
      return;
    }
    //any post call link..
    this.getPharmacyDetailsService.savePharmachy(formValues).subscribe(
      data => {
        if (data == "success") {
          console.log("router works");
          this.close(formValues);
        }
      },
      error => {
        this.error = error.message;
      }
    );
  }
  close(content) {
    this.modalService.dismissAll(content);
  }
}
