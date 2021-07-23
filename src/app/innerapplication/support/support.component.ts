import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  questionOne() {
    document.getElementById('one').style.display = 'block';
    document.getElementById('two').style.display = 'none';
    document.getElementById('three').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionTwo() {
    document.getElementById('two').style.display = 'block';
    document.getElementById('one').style.display = 'none';
    document.getElementById('three').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionThree() {
    document.getElementById('three').style.display = 'block';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionFour() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'block';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionFive() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'block';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionSix() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'block';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionSeven() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'block';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionEight() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'block';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'none';
  }

  questionNine() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'block';
    document.getElementById('ten').style.display = 'none';
  }

  questionTen() {
    document.getElementById('three').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('one').style.display = 'none';
    document.getElementById('four').style.display = 'none';
    document.getElementById('five').style.display = 'none';
    document.getElementById('six').style.display = 'none';
    document.getElementById('seven').style.display = 'none';
    document.getElementById('eight').style.display = 'none';
    document.getElementById('nine').style.display = 'none';
    document.getElementById('ten').style.display = 'block';
  }


}
