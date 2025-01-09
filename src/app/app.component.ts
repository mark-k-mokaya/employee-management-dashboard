import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ModalComponent } from "./components/shared/modal/modal.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ModalComponent],
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent {
  // title = 'employee-manager';
}
