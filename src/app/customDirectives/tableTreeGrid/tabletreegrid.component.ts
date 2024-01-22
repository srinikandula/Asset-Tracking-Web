import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'app-tabletreegrid',
    templateUrl: 'tabletreegrid.html',
})

export class TabletreegridComponent implements OnInit {

    @Input() treeData: Array<any> = [];
    @Input() tableTreeParams: object = {};
    @Input() colDefs: Array<any> = [];
    @Input() expandOn: object = {};
    @Input() onSelect: '';
    @Input() onClick: '';
    @Input() initialSelection: '';
    @Input() treeControl: '';
    @Input() expandTo: '';

    ngOnInit(): void {
        console.log(this.treeData);
    }
}
