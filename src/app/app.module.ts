import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ListViewAllModule } from "@syncfusion/ej2-angular-lists";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ListViewAllModule, ButtonModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
