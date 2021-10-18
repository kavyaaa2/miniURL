import { Component, OnInit } from '@angular/core';
import { urlData } from '../modal';
import { UrlshortenService } from '../urlshorten.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalLinks=0;
  totalClicks=0;

  linkData:Array<urlData> = [];

  chartData: any[] | undefined=[];
  view: [number, number] = [790, 300];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Short url';
  showYAxisLabel = true;
  yAxisLabel = 'No. of Clicks';

  constructor(private urlService:UrlshortenService) { 
    this.urlService.getAll().subscribe((data)=>{
      
      let arr = []
      for(let i =0;i<data.length;i++){
        arr.push({
          name: data[i].shorturl,
          value: data[i].clicks
        })
      }
      this.chartData = arr
      console.log(this.chartData)
      Object.assign(this.linkData, this.chartData)
    })
  }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(){
    this.urlService.getAll().subscribe((data)=>{
      data.forEach((temp)=>{
        this.totalLinks +=1;
        this.totalClicks += temp.clicks;
      })
    })
  }


  

  

}
