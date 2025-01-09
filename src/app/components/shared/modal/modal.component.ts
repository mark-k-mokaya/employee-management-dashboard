import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  modalType = input.required<string>();
  constructor() {}

  ngOnInit() {
    console.log(this.modalType());
  }
}
