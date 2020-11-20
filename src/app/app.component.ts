import { Component, ViewChild } from "@angular/core";
import { enableRipple } from "@syncfusion/ej2-base";
import { DataManager, Query, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { ListViewComponent } from "@syncfusion/ej2-angular-lists";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
enableRipple(true);

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public fields: Object;
  public firstListData: any;
  secondListData: any;
  constructor() {
    this.firstListData = [
      { text: "Hennessey Venom", id: "list-01" },
      { text: "Bugatti Chiron", id: "list-02" },
      { text: "Bugatti Veyron Super Sport", id: "list-03" },
      { text: "SSC Ultimate Aero", id: "list-04" },
      { text: "Koenigsegg CCR", id: "list-05" },
      { text: "McLaren F1", id: "list-06" }
    ];

    this.secondListData = [
      { text: "Aston Martin One- 77", id: "list-07" },
      { text: "Jaguar XJ220", id: "list-08" },
      { text: "McLaren P1", id: "list-09" },
      { text: "Ferrari LaFerrari", id: "list-10" }
    ];

    this.fields = { text: "text", id: "id" };
  }
  @ViewChild("list1") firstListObj: ListViewComponent;
  @ViewChild("list2") secondListObj: ListViewComponent;
  @ViewChild("btn1") firstBtnObj: ButtonComponent;
  @ViewChild("btn2") secondBtnObj: ButtonComponent;
  @ViewChild("btn3") thirdBtnObj: ButtonComponent;
  @ViewChild("btn4") fourthBtnObj: ButtonComponent;
  @ViewChild("textbox") textboxEle: any;
  @ViewChild("text") textEle: any;
  ngAfterViewInit() {
    this.firstListData = (this.firstListObj as any).dataSource.slice();
    this.secondListData = (this.secondListObj as any).dataSource.slice();
  }
  //Here, all list items are moved to the second list on clicking move all button
  firstbtnclick() {
    (this.secondListObj as any).dataSource = Array.prototype.concat.call(
      (this.firstListObj as any).dataSource,
      (this.secondListObj as any).dataSource
    );
    this.updateFirstListData();
    (this.firstListObj as any).removeMultipleItems(
      (this.firstListObj as any).liCollection
    );
    this.firstListData = this.firstListData.concat(
      (this.firstListObj as any).dataSource
    );
    this.secondListData = (this.secondListObj as any).dataSource.slice();
    (this.firstBtnObj as any).disabled = true;
    this.onFirstKeyUp();
    this.setButtonState();
  }

  //Here, the selected list items are moved to the second list on clicking move button
  secondbtnclick() {
    let e = (this.firstListObj as any).getSelectedItems();
    (this.secondListObj as any).dataSource = Array.prototype.concat.call(
      (this.secondListObj as any).dataSource,
      e.data
    );
    (this.firstListObj as any).removeItem(e.item);
    this.firstListData = (this.firstListObj as any).dataSource;
    this.secondListData = (this.secondListObj as any).dataSource.slice();
    this.onFirstKeyUp();
    (this.secondListObj as any).disabled = true;
    this.setButtonState();
  }

  //Here, the selected list items are moved to the first list on clicking move button
  thirdbtnclick() {
    let e = (this.secondListObj as any).getSelectedItems();
    (this.firstListObj as any).dataSource = Array.prototype.concat.call(
      (this.firstListObj as any).dataSource,
      e.data
    );
    (this.secondListObj as any).removeItem(e.item);
    this.secondListData = (this.secondListObj as any).dataSource;
    this.firstListData = (this.firstListObj as any).dataSource.slice();
    this.onSecondKeyUp();
    (this.thirdBtnObj as any).disabled = true;
    this.setButtonState();
  }

  //Here, all list items are moved to the first list on clicking move all button
  fourthbtnclick() {
    (this.firstListObj as any).dataSource = Array.prototype.concat.call(
      (this.firstListObj as any).dataSource,
      (this.secondListObj as any).dataSource
    );
    this.updateSecondListData();
    (this.secondListObj as any).removeMultipleItems(
      (this.secondListObj as any).liCollection
    );
    this.secondListData = this.secondListData.concat(
      (this.secondListObj as any).dataSource
    );
    this.firstListData = (this.firstListObj as any).dataSource.slice();
    this.onSecondKeyUp();
    this.setButtonState();
  }

  //Here, the ListView data source is updated to the first list
  updateFirstListData() {
    Array.prototype.forEach.call(
      (this.firstListObj as any).liCollection,
      list => {
        this.firstListData.forEach((data, index) => {
          if (list.innerText.trim() === data.text) {
            delete this.firstListData[index];
          }
        });
      }
    );
    this.textboxEle.nativeElement.value = "";
    let ds = [];
    this.firstListData.forEach(data => {
      ds.push(data);
    });
    this.firstListData = ds;
  }

  //Here, the ListView dataSource is updated for the second list
  updateSecondListData() {
    Array.prototype.forEach.call(
      (this.secondListObj as any).liCollection,
      list => {
        this.secondListData.forEach((data, index) => {
          if (list.innerText.trim() === data.text) {
            delete this.secondListData[index];
          }
        });
      }
    );
    this.textEle.nativeElement.value = "";
    let ds = [];
    this.secondListData.forEach(data => {
      ds.push(data);
    });
    this.secondListData = ds;
  }
  onFirstListSelect() {
    (this.secondBtnObj as any).disabled = false;
  }
  onSecondListSelect() {
    (this.thirdBtnObj as any).disabled = false;
  }

  //Here, filtering is handled using the dataManager for the first list
  onFirstKeyUp(e) {
    let value = this.textboxEle.nativeElement.value;
    let data = new DataManager(this.firstListData).executeLocal(
      new Query().where("text", "startswith", value, true)
    );
    if (!value) {
      (this.firstListObj as any).dataSource = this.firstListData.slice();
    } else {
      (this.firstListObj as any).dataSource = data;
    }
  }
  //Here, filtering is handled using the dataManager for the second list
  onSecondKeyUp(e) {
    let value = this.textEle.nativeElement.value;
    let data = new DataManager(this.secondListData).executeLocal(
      new Query().where("text", "startswith", value, true)
    );
    if (!value) {
      (this.secondListObj as any).dataSource = this.secondListData.slice();
    } else {
      (this.secondListObj as any).dataSource = data;
    }
  }

  //Here, the state of the button is changed
  setButtonState() {
    if ((this.firstListObj as any).dataSource.length) {
      (this.firstBtnObj as any).disabled = false;
    } else {
      (this.firstBtnObj as any).disabled = true;
      (this.secondBtnObj as any).disabled = true;
    }

    if ((this.secondListObj as any).dataSource.length) {
      (this.fourthBtnObj as any).disabled = false;
    } else {
      (this.fourthBtnObj as any).disabled = true;
      (this.thirdBtnObj as any).disabled = true;
    }
  }
}
