import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './timepicker-component.css';

let value: Date;

export class Range extends SampleBase<{}, {}> {
  private endObject: TimePickerComponent;
  private startObject: TimePickerComponent;
  private checkObj: CheckBoxComponent;
  private isStartTimeChange: Boolean = true;
  private endTimeInput: HTMLInputElement
  
  public rendereComplete():void{
    this.endTimeInput = document.getElementById('maxtimepick') as HTMLInputElement;
  }
  
  public changeTime(): void {
    this.isStartTimeChange = false;
    if (this.checkObj.checked) {
      this.startObject.value = new Date('9/6/2017 9:00');
      this.endObject.enabled = true;
      this.endObject.value = new Date('9/6/2017 18:00');
      this.startObject.readonly = true;
      this.endObject.readonly = true;
    } else {
      this.endObject.value = null;
      this.startObject.value = null;
      this.endTimeInput.value = '';
      this.startObject.readonly = false;
      this.endObject.readonly = false;
      this.endObject.enabled = false;
    }
  }
  public onEnableEndTime(args: any): void {
    if (this.isStartTimeChange) {
      this.endObject.enabled = true;
      this.endObject.value = null;
      this.endTimeInput.value = '';
      value = new Date(args.value);
      value.setMinutes(value.getMinutes() + this.endObject.step);
      this.endObject.min = value;
    }else{
      this.isStartTimeChange = true;
    }
  }

  render() {
    return (
      <div className='control-pane range'>
        <div className='control-section'>
          <div className='timepicker-control-section range'>
            <TimePickerComponent id="mintimepick" placeholder='Start Time' ref={(mintimepick) => { this.startObject = mintimepick }} change={this.onEnableEndTime.bind(this)}></TimePickerComponent>
          </div>
          <div className='timepicker-control-section range'>
            <TimePickerComponent id="maxtimepick" enabled={false} placeholder='End Time' ref={(maxtimepick) => { this.endObject = maxtimepick }} ></TimePickerComponent>
          </div>
          <div className='timepicker-control-section range'>
            <CheckBoxComponent id="checkbox" ref={(checkbox) => { this.checkObj = checkbox }} label="Business Hours" change={this.changeTime.bind(this)}></CheckBoxComponent>
          </div>
        </div>
        <div id='description'>
          <p>Time Range sample illustrates the appointment time selection scenario with the start and end time option. Here, two TimePicker
              components are used to select the start and end time.</p>
          <p>Before the start time selection, the end time TimePicker is in disable state. When the start time is selected, then you
              will be able to select the end time or else, need to select the entire business hours 9:00 to 18:00 from the <code>Business Hours</code>        option. Once the options are checked, both the TimePicker components goes to readonly state.
          </p>
          <p>More information about time range restriction can be found in the  <a target='_blank'
            href='http://ej2.syncfusion.com/react/documentation/timepicker/time-range.html'>documentation</a>  section.</p>
        </div>
      </div>
    )
  }
}