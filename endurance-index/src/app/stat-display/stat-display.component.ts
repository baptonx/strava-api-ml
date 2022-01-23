import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { StravaDataService } from '../strava-data.service';

@Component({
  selector: 'app-stat-display',
  templateUrl: './stat-display.component.html',
  styleUrls: ['./stat-display.component.css'],
})
export class StatDisplayComponent implements AfterViewInit {
  public activities: Array<Activity>;
  constructor(private stravaDataService: StravaDataService) {
    this.activities = new Array<Activity>();
  }

  ngAfterViewInit(): void {
    this.getStats();
  }

  getStats(): void {
    this.stravaDataService.refreshToken().subscribe((token) => {
      console.log(token);
      this.stravaDataService.access_token = token.access_token;
      this.stravaDataService.getActivities().subscribe((activities) => {
        activities.forEach((activity) => {
          let act = new Activity(activity);
          act.computeEnduranceIndex();
          act.computeRunningEconomy();
          this.activities.push(act);
        });
        console.log(this.activities);
      });
    });
  }

  // createChart(): void {
  //   let Highcharts = require('highcharts');
  //   // Load module after Highcharts is loaded
  //   require('highcharts/modules/exporting')(Highcharts);
  //   // Create the chart
  //   Highcharts.chart('container', {
  //     /*Highcharts options*/
  //   });
  // }
}
