import Chart from 'chart.js';
import { ViewChild, Component, ElementRef, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms';

import { DocsisFile }         from '../docsis-file';
import { CcmtsService }  from '../ccmts.service';

@Component({
    selector: 'app-chartjs',
    templateUrl: './chartjs.component.html',
    styleUrls: [ './chartjs.component.css' ]
})

export class ChartjsComponent implements OnInit {
    // @ViewChild('upstream') upstreamline: ElementRef;
    // @ViewChild('upstreamdonut') upstreamdonut: ElementRef;
    
    // @ViewChild('downstream')      downstreamline : ElementRef;
    // @ViewChild('downstreamdonut') downstreamdonut: ElementRef;

    loadingChartDownstream : boolean = true; 
    loadingChartUpstream   : boolean = true;
    

    @Input() periodDays : number = 7;

    // FIXME, those File may not useful
    @Input() docsisUpStreamFile: DocsisFile;
    docsisDownStreamFile : DocsisFile;
    dashboardFile : DocsisFile;

    private dataSetIndex: number =0;
    private index : number= 0;

    data_lines : any = {};
    line_options : any = {};

    chartLineUpstream : Chart = null;
    chartBarUpstream : Chart = null;
    chartLineDownstream : Chart = null;
    chartBarDownstream : Chart = null;

    constructor(
      private route: ActivatedRoute,
      private ccmtsService: CcmtsService,
      private location: Location
    ) {}

    ngOnInit() {
        this.getDocsisUpStreamFile(1);   // upstream File
        this.getDocsisDownStreamFile(2);   // downstream File
        this.demoChart();

        console.log(this.periodDays);
    }

    items = new FormControl();
    itemList = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6'];

    getDocsisUpStreamFile(id : number): void {
      // const id = +this.route.snapshot.paramMap.get('id');

      // id, week: 1; month: 3; 3-month: 7
      let usId : number= Math.floor((this.periodDays / 30)*2) + 1;

      this.loadingChartUpstream = true;

      this.ccmtsService.getDocsisFile(usId)   
        .subscribe(res => {
 
           console.log(res);

           // this.docsisUpStreamFile = res;
           // data_lines for chartLineUpstream

           let _x = res['x'];
           let _y = res['y'];
           let _yy = _y * 100;

            var xLabel = res['xlabel'];
            var yLabel = res['ylabel'];
            var chartTitle = res['title'];
            var yMin = res['yrange'][0];
            var yMax = res['yrange'][1];

           this.data_lines = {
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
            };

            this.line_options = {
              legend: {
                display: false
              },
              "title": {
                display: true,
                text: chartTitle,
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
                        labelString: xLabel
                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                    ticks: {
                        suggestedMin: yMin,
                        suggestedMax: yMax,
                        // min: this.yMin,
                        // max: this.yMax,
                    }
                  }],
              }
            };

          // chart start HERE ?
          // 'upstreamLine' from html canvas's id for context
          if (this.chartLineUpstream != null) { 
              this.chartLineUpstream.destroy();
          }
          this.chartLineUpstream = new Chart('upstreamLine', {
               // The type of chart we want to create
               "type": 'line',
               "data": this.data_lines,
               "options": {
                    legend: {
                      display: false
                    },
                    "title": {
                      display: true,
                      text: chartTitle,
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
                              labelString: xLabel
                          },
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: yLabel
                          },
                          ticks: {
                              suggestedMin: yMin,
                              suggestedMax: yMax,
                              // min: this.yMin,
                              // max: this.yMax,
                          }
                        }],
                    },
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                     },

                    // onClick: this.chartClickedFunction.bind(this),
                    // function(e)
                    onClick: (e, element) => {
                      // use lamda to keep this as parent.
                      // var element = this.getElementAtEvent(e);
                      if (element.length) {
                         // how to find activeElement for _datasetIndex? 
                         console.log(element);
                         this.dataSetIndex = element[0]["_datasetIndex"];
                         this.index = element[0]["_index"];

                         console.log(this.dataSetIndex, this.index);
                         var clickedData = [this.dataSetIndex, this.index];
                         this.getClickedChart(usId, clickedData);
                      }
                    },
                }
            });

            this.loadingChartUpstream = false;

        });
    }

    getDocsisDownStreamFile(id : number): void {
      // const id = +this.route.snapshot.paramMap.get('id');
      // id = 2
      // id, week: 2; month: 4; 3-month: 8
      let dsId : number = Math.floor((this.periodDays / 30)*2) + 2;
      this.loadingChartDownstream = true;

      this.ccmtsService.getDocsisFile(dsId)
        .subscribe(res => {
 
           console.log(res);

           this.docsisDownStreamFile = res;
           // data_lines for chartLineUpstream

           let _x = res['x'];
           let _y = res['y'];
           let _yy = _y * 100;

            var xLabel = res['xlabel'];
            var yLabel = res['ylabel'];
            var chartTitle = res['title'];
            var yMin = res['yrange'][0];
            var yMax = res['yrange'][1];

           this.data_lines = {
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
            };

            this.line_options = {
              legend: {
                display: false
              },
              "title": {
                display: true,
                text: chartTitle,
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
                        labelString: xLabel
                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                    ticks: {
                        suggestedMin: yMin,
                        suggestedMax: yMax,
                        // min: this.yMin,
                        // max: this.yMax,
                    }
                  }],
              }
            };

          // chart start HERE ?
          // 'upstreamLine' from html canvas's id for context
          if (this.chartLineDownstream != null) { 
              this.chartLineDownstream.destroy();
          }
          this.chartLineDownstream = new Chart('downstreamLine', {
               // The type of chart we want to create
               "type": 'line',
               "data": this.data_lines,
               "options": {
                    legend: {
                      display: false
                    },
                    "title": {
                      display: true,
                      text: chartTitle,
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
                              labelString: xLabel
                          },
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: yLabel
                          },
                          ticks: {
                              suggestedMin: yMin,
                              suggestedMax: yMax,
                              // min: this.yMin,
                              // max: this.yMax,
                          }
                        }],
                    },
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                     },

                    // onClick: this.chartClickedFunction.bind(this),
                    // function(e)
                    onClick: (e, element) => {
                      // use lamda to keep this as parent.
                      // var element = this.getElementAtEvent(e);
                      if (element.length) {
                         // how to find activeElement for _datasetIndex? 
                         console.log(element);
                         this.dataSetIndex = element[0]["_datasetIndex"];
                         this.index = element[0]["_index"];

                         console.log(this.dataSetIndex, this.index);
                         var clickedData = [this.dataSetIndex, this.index];
                         this.getClickedDownstreamChart(dsId, clickedData);
                      }
                    },
                }
            });

          this.loadingChartDownstream = false;

        });
    }

    getChartData(): void {
      const id = +this.route.snapshot.paramMap.get('name');
      this.ccmtsService.getDocsisFile(id)
        .subscribe(docsisFile => this.dashboardFile = docsisFile);
    }

    goBack(): void {
      this.location.back();
    }

/*
    // common chart function
    // ctx:  chart context
    // res:  Oberservalbe result from _http    
    chartFunction(ctx, chartType, res) : Chart {

           let _x = res['x'];
           let _y = res['y'];
           let _yy = _y * 100;

            var xLabel = res['xlabel'];
            var yLabel = res['ylabel'];
            var chartTitle = res['title'];
            var yMin = res['yrange'][0];
            var yMax = res['yrange'][1];

            let barDatas = {
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
            };

            let barOptions = {
              legend: {
                display: false
              },
              "title": {
                display: true,
                text: chartTitle,
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
                        labelString: xLabel
                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                    ticks: {
                        suggestedMin: yMin,
                        suggestedMax: yMax,
                        // min: this.yMin,
                        // max: this.yMax,
                    }
                  }],
              }
            };

          // chart start HERE ?
          // 'upstreamLine' from html canvas's id for context
          newChart : Chart;
          return ( new Chart(ctx, {
               // The type of chart we want to create
               "type": chartType,
               "data": barDatas,
               "options": {
                    legend: {
                      display: false
                    },
                    "title": {
                      display: true,
                      text: chartTitle,
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
                              labelString: xLabel
                          },
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: yLabel
                          },
                          ticks: {
                              suggestedMin: yMin,
                              suggestedMax: yMax,
                              // min: this.yMin,
                              // max: this.yMax,
                          }
                        }],
                    },
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                     },

                    // onClick: this.chartClickedFunction.bind(this),
                    // function(e)
                    onClick: (e, element) => {
                      // use lamda to keep this as parent.
                      // var element = this.getElementAtEvent(e);
                      if (element.length) {
                         // how to find activeElement for _datasetIndex? 
                         console.log(element);
                         this.dataSetIndex = element[0]["_datasetIndex"];
                         this.index = element[0]["_index"];

                         console.log(this.dataSetIndex, this.index);
                         var clickedData = [this.dataSetIndex, this.index];
                         this.getClickedChart(dsId, clickedData);
                      }
                    },
                }
            }) );

        // return newChart;
    )}
*/

    getClickedChart(id, data): void {
       console.log(data);
       //this.loadingChart = true;

        // upstream id, week: 1; month: 3; 3-month: 7
        // downstream id, week: 2; month: 4; 3-month: 8

       this.ccmtsService.getDocsisFileClicked(id, data[1])
         .subscribe(res => {
 
           console.log(res);

           // this.docsisFile = res;
           // data_lines for chartLineUpstream
           //this.chartBarUpstream = this.chartFunction('upstreamBar', 'bar', res);
           
           //this.loadingChart = false;

           
           let _x = res['x'];
           let _y = res['y'];
           let _yy = _y * 100;

            var xLabel = res['xlabel'];
            var yLabel = res['ylabel'];
            var chartTitle = res['title'];
            var yMin = res['yrange'][0];
            var yMax = res['yrange'][1];

            let barDatas = {
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
            };

            let barOptions = {
              legend: {
                display: false
              },
              "title": {
                display: true,
                text: chartTitle,
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
                        labelString: xLabel
                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                    ticks: {
                        suggestedMin: yMin,
                        suggestedMax: yMax,
                        // min: this.yMin,
                        // max: this.yMax,
                    }
                  }],
              }
            };

          // chart start HERE ?
          // 'upstreamLine' from html canvas's id for context
          
          if(this.chartBarUpstream != null) {
              this.chartBarUpstream.destroy();
          }

          this.chartBarUpstream = new Chart('upstreamBar', {
               // The type of chart we want to create
               "type": 'bar',
               "data": barDatas,
               "options": {
                    legend: {
                      display: false
                    },
                    "title": {
                      display: true,
                      text: chartTitle,
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
                              labelString: xLabel
                          },
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: yLabel
                          },
                          ticks: {
                              suggestedMin: yMin,
                              suggestedMax: yMax,
                              // min: this.yMin,
                              // max: this.yMax,
                          }
                        }],
                    },
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                     },

                     /* 
                     NO click at bar chart!!!
                    // onClick: this.chartClickedFunction.bind(this),
                    // function(e)
                    onClick: (e, element) => {
                      // use lamda to keep this as parent.
                      // var element = this.getElementAtEvent(e);
                      if (element.length) {
                         // how to find activeElement for _datasetIndex? 
                         console.log(element);
                         this.dataSetIndex = element[0]["_datasetIndex"];
                         this.index = element[0]["_index"];

                         console.log(this.dataSetIndex, this.index);
                         var clickedData = [this.dataSetIndex, this.index];
                         this.getClickedChart(usId, clickedData);
                      }
                    },
                    */
                }
            });
            
        });

    }

    getClickedDownstreamChart(id, data): void {
       console.log(data);
       //this.loadingChart = true;

       // id = 2
       // id, week: 2; month: 4; 3-month: 8

       this.ccmtsService.getDocsisFileClicked(id, data[1])
         .subscribe(res => {
 
           console.log(res);

           // this.docsisFile = res;
           // data_lines for chartLineUpstream
           //this.chartBarUpstream = this.chartFunction('upstreamBar', 'bar', res);
           
           //this.loadingChart = false;

           
           let _x = res['x'];
           let _y = res['y'];
           let _yy = _y * 100;

            var xLabel = res['xlabel'];
            var yLabel = res['ylabel'];
            var chartTitle = res['title'];
            var yMin = res['yrange'][0];
            var yMax = res['yrange'][1];

            let barDatas = {
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
            };

            let barOptions = {
              legend: {
                display: false
              },
              "title": {
                display: true,
                text: chartTitle,
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
                        labelString: xLabel
                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                    ticks: {
                        suggestedMin: yMin,
                        suggestedMax: yMax,
                        // min: this.yMin,
                        // max: this.yMax,
                    }
                  }],
              }
            };

          // chart start HERE ?
          // 'upstreamLine' from html canvas's id for context
          
          if(this.chartBarDownstream != null) {
              this.chartBarDownstream.destroy();
          }

          this.chartBarDownstream = new Chart('downstreamBar', {
               // The type of chart we want to create
               "type": 'bar',
               "data": barDatas,
               "options": {
                    legend: {
                      display: false
                    },
                    "title": {
                      display: true,
                      text: chartTitle,
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
                              labelString: xLabel
                          },
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: yLabel
                          },
                          ticks: {
                              suggestedMin: yMin,
                              suggestedMax: yMax,
                              // min: this.yMin,
                              // max: this.yMax,
                          }
                        }],
                    },
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                     },

                     /* 
                     NO click at bar chart!!!
                    // onClick: this.chartClickedFunction.bind(this),
                    // function(e)
                    onClick: (e, element) => {
                      // use lamda to keep this as parent.
                      // var element = this.getElementAtEvent(e);
                      if (element.length) {
                         // how to find activeElement for _datasetIndex? 
                         console.log(element);
                         this.dataSetIndex = element[0]["_datasetIndex"];
                         this.index = element[0]["_index"];

                         console.log(this.dataSetIndex, this.index);
                         var clickedData = [this.dataSetIndex, this.index];
                         this.getClickedChart(clickedData);
                      }
                    },
                    */
                }
            });
            
        });

    }

    // 4 charts start from HERE

    // FIXME, data_List will get by AJAX.
    //        also get "labels"  
    //        see below data_lines
    private data_list = [ [0, 10, 5, 2, 20, 30, 45],
                      [0, 1, 15, 2, 30, 10, 40],
                      [10, 21, 5, 2, 10, 40, 30],
                    ];

    demoChart(): void {
        // let donutCtx = this.upstreamdonut.nativeElement.getContext('2d');
        // let lineCtx = this.upstreamline.nativeElement.getContext('2d');

        // let downstreamDonutCtx = this.downstreamdonut.nativeElement.getContext('2d');
        // let downstreamLineCtx = this.downstreamline.nativeElement.getContext('2d');


        var data = {
            labels: [
                "Value A",
                "Value B",
                "Value C"
            ],
            datasets: [
                {
                    "data": [0, 0, 0],   // Example data
                    "backgroundColor": [
                        "#1fc8f8",
                        "#76a346",
                        "#3fa346"
                    ]
                }]
        };

        
        /*
        var data_sets = [];
        var red_color = 155;
        var blue_color = 99;

        this.data_list.forEach( (dataItem, index) => {
            red_color = (red_color+90) % 255;
            blue_color = (blue_color + 30) % 255;            
            data_sets.push ( 
                    {
                    label: "My First dataset"+index,
                    // backgroundColor: 'rgb(255, 99, 132)',
                    // borderColor: 'rgb( 255, 99, 132)',
                    borderColor: `rgb( ${red_color}, ${blue_color}, 132)`,
                    data: dataItem,
                    fill: false
                    } );
        });

        var data_lines = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: data_sets
            };
        */

        /*
        var chartDonutUpstream = new Chart(
            donutCtx,
        */
        this.chartBarUpstream = new Chart('upstreamBar', 
            {
                "type": 'bar',
                "data": data,
                "options": {
                    "title": {
                             display: true,
                             text: 'click above line chart'
                            },
                    /*
                    scales: {
                              yAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'rate'
                                }
                              }],
                              xAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'Date'
                                }
                              }]
                            },
                    */     
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                    }
                }
            }
        );
        
       
        this.chartBarDownstream = new Chart('downstreamBar',
            {
                "type": 'bar',
                "data": data,
                "options": {
                    "title": {
                             display: true,
                             text: 'click above line chart'
                            },
                    /*
                    scales: {
                              yAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'rate'
                                }
                              }],
                              xAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'Date'
                                }
                              }]
                            },
                    */
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                    }
                }
            }
        );
        
        /*
        var chartLine = new Chart(
            downstreamLineCtx, 
            {
               // The type of chart we want to create
               "type": 'line',
               "data": {
                      labels: ["January", "February", "March", "April", "May", "June", "July"],
                      xAxisID: "date",
                      yAxisID: "traffic",
                      datasets: [{
                          label: "My First dataset",
                          backgroundColor: 'rgb(255, 99, 132)',
                          borderColor: 'rgb(255, 99, 132)',
                          data: [0, 10, 5, 2, 20, 30, 45],
                      }]
                  },
               "options": { 
                    "title": {
                             display: true,
                             text: 'downstream'
                            },
                    scales: {
                              yAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'probability'
                                }
                              }],
                              xAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'month'
                                }
                              }]
                            },     
               }
            }
        );
        */
    }
}


