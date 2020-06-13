import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
    @Input() public type: string;
    @Input() public dismiss: string;

    public dismissAlert(element: Element): void {
        element.parentElement.removeChild(element);
    }

    constructor() { }

    public ngOnInit(): void {
    }

}
