import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actionName = 'label';

  hasFoo = true;
  classExprString = 'bold color-blue background-color-green';
  classExprObject = {
    bold: true,
    'color-blue': false,
    'background-color-green': false,
  };
  classExprArray = ['bold', 'color-blue'];

  widthPx = '150px';
  width = '150';
  styleExprString = 'width: 150px; height: 150px';
  styleExprObject = {
    width: '150px',
    height: '150px',
  };

  isSpecial = true;
  color = 'red';
  classExpr = 'bold color-blue';
  styleExpr = 'font-weight: bold; color: blue;';

  isBig = true;
  red = 'red';

  colorBlueClass = 'blue';
  colorRedStyle = 'color: red;';
}
