import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('drag', { static: true }) drag!: ElementRef;
  @ViewChild('bg', { static: true }) bg!: ElementRef;
  @ViewChild('text', { static: true }) text!: ElementRef;
  @ViewChild('btn', { static: true }) btn!: ElementRef;
  private success!: boolean;
  private distance!: number;

  constructor() {

  }

  move() {
    let oDrag = this.drag.nativeElement;
    let oBg = this.bg.nativeElement;
    let oText = this.text.nativeElement;
    let oBtn = this.btn.nativeElement;
    this.distance = oDrag.offsetWidth - oBtn.offsetWidth;
    this.success = false;
    oBtn.onmousedown = (event: any) => {
      oBg.style.transition = "";
      oBtn.style.transition = "";
      const e = event || window.event;
      const downX = e.clientX;

      document.onmousemove = (event: any) => {
        const eve = event || window.event;
        const moveX = eve.clientX;
        let offsetX = moveX - downX;

        if (offsetX > this.distance) {
          offsetX = this.distance;
        } else if (offsetX < 0) {
          offsetX = 0;
        }
        oBtn.style.left = `${offsetX}px`;
        oBg.style.width = `${offsetX}px`;

        if (offsetX == this.distance) {
          oText.innerHTML = "验证通过";
          oBtn.innerHTML = "&radic;";
          oText.style.color = "#FFF";
          oBtn.style.color = "rgb(39, 233, 21)";
          this.success = true;
          document.onmousemove = null;
          oBtn.onmousedown = null;
        }
      };
      document.onmouseup = () => {
        if (this.success) {
          return;
        } else {
          oBtn.style.left = 0;
          oBg.style.width = 0;
          oBg.style.transition = "width .5s ease";
          oBtn.style.transition = "left .5s ease";
        }
        document.onmousemove = null;
        oBtn.onmouseup = null;
      }
    };
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.move();
  }

}
