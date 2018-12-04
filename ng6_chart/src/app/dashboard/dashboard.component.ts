import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Chart } from 'chart.js';
import { CcmtsService } from '../ccmts.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  chart = []; // This will hold our chart info
  loadingChart : boolean = false;
  monthDays :number = 30;

  constructor(private route: ActivatedRoute,
              private _ccmts: CcmtsService) { }

  chartTitle : string = 'upstreamBar';
  xLabel : string = 'Date';
  yLabel : string = 'number';
  // y-axis range (Hi/Lo),
  yMin : number = 150;
  yMax : number = 350;

  ngOnInit() {

      const id = +this.route.snapshot.paramMap.get('id');
      if (id != 0) {
        this.monthDays = id;
      }
      this.loadingChart = true;
  /*
    this._ccmts.dailyChart()
      .subscribe(res => {
        console.log(res)

        this.loadingChart = false;

        let _x = res['x'];
		let _y = res['y'];
		let _yy = _y * 100;

        this.xLabel = res['xlabel'];
        this.yLabel = res['ylabel'];
        this.chartTitle = res['title'];
        this.yMin = res['yrange'][0];
		this.yMax = res['yrange'][1];

		// draw chart at context 'canvas'
		this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: _x,
            datasets: [
              { 
                data: _y,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: _yy,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            "title": {
              display: true,
              text: this.chartTitle,
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                    autoSkip: false,
                    maxRotation: 30,
                    minRotation: 30
                },
                scaleLabel: {
                    display: true,
                    labelString: this.xLabel
                },
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: this.yLabel
                },
                ticks: {
                    suggestedMin: this.yMin,
                    suggestedMax: this.yMax,
                    // min: this.yMin,
                    // max: this.yMax,
                }
              }],
            }
          }

        });
	});
	*/

  }

}
