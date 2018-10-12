import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';

import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';
import { ContractService } from '@app/contract.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-overview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  title = 'Donut Chart';

  private width: number;
  private height: number;

  private svg: any; // TODO replace all `any` by the right type

  private radius: number;

  private arc: any;
  private pie: any;
  private color: any;

  private g: any;

  constructor(private authenticationService: AuthenticationService, private contractService: ContractService) {}

  ngOnInit() {
    var POPULATION = [
      { age: '<5', population: 2704659 },
      { age: '5-13', population: 4499890 },
      { age: '14-17', population: 2159981 },
      { age: '18-24', population: 3853788 },
      { age: '25-44', population: 14106543 },
      { age: '45-64', population: 8819342 },
      { age: '≥65', population: 612463 }
    ];

    this.initSvg();
    this.drawChart(POPULATION);
  }

  private initSvg() {
    this.svg = d3.select('svg');

    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3Scale
      .scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    this.arc = d3Shape
      .arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);

    this.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => d.population);

    this.svg = d3
      .select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawChart(data: any[]) {
    let g = this.svg
      .selectAll('.arc')
      .data(this.pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.age));

    g.append('text')
      .attr('transform', (d: any) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.age);
  }
}
