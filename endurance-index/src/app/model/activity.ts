import { Athlete } from './athlete';

export class Activity {
  public resource_state: number;
  public athlete: Athlete;
  public name: string;
  public distance: number;
  public moving_time: number;
  public elapsed_time: number;
  public total_elevation_gain: number;
  public type: string;
  public id: number;
  public start_date: string;

  public average_speed: number;
  public average_heartrate: number;

  public endurance_index: number;
  public running_economy: number;

  constructor(act: Activity) {
    this.resource_state = act.resource_state;
    this.athlete = act.athlete;
    this.name = act.name;
    this.distance = act.distance;
    this.moving_time = act.moving_time;
    this.elapsed_time = act.elapsed_time;
    this.total_elevation_gain = act.total_elevation_gain;
    this.type = act.type;
    this.id = act.id;
    this.average_speed = act.average_speed;
    this.average_heartrate = act.average_heartrate;
    this.endurance_index = act.endurance_index;
    this.running_economy = act.running_economy;
    this.start_date = act.start_date;
  }

  computeEnduranceIndex(): void {
    this.endurance_index = this.round(
      ((this.average_speed * 3.6) / this.average_heartrate) * 100
    );
  }
  private round(n: number, precision = 0.01) {
    var result = Math.round(n / precision) * precision;
    return result;
  }
  computeRunningEconomy(): void {
    const total_beats = ((this.average_heartrate - 49) * this.moving_time) / 60;
    const workPerKm = total_beats / (this.distance * 1000);
    this.running_economy = 1 / (workPerKm * 10);
  }
}
