import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';
import { UserType } from '@app/user-type.enum';

import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';
import { ContractService } from '@app/contract.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

class Chart {
  width: number;
  height: number;
  svg: any;
  radius: number;
  arc: any;
  pie: any;
  color: any;
  g: any;
}

@Component({
  selector: 'app-overview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  title = 'Donut Chart';
  contracts: IContract[] = [];

  private username: string;
  private userType: UserType = undefined;

  constructor(private authenticationService: AuthenticationService, private contractService: ContractService) {}

  ngOnInit() {
    this.username = this.authenticationService.credentials.username;
    this.userType = this.authenticationService.getUserType(this.username);

    var allContracts = this.contractService.getAllContracts();
    var allContractsChartData = this.extractChartData(allContracts);
    this.drawChart('#allContractsSVG', allContractsChartData);

    var myContracts = this.contractService.getMyContracts(
      this.authenticationService.credentials.username,
      this.userType
    );
    var myContractsChartData = this.extractChartData(myContracts);
    this.drawChart('#myContractsSVG', myContractsChartData);
  }

  private extractChartData(contracts: IContract[]) {
    var data: any = [];
    for (let contract of contracts) {
      var entry: any = data.find((c: any) => c.status == contract.status);
      if (typeof entry === 'undefined') {
        data.push({ status: contract.status, value: 1 });
      } else {
        entry.value++;
      }

      console.log(data);
    }

    return data;
  }

  private initSvg(domSelector: string) {
    //var domSelector = '#allContractsSVG';
    var chart = new Chart();
    chart.svg = d3.select(domSelector);

    chart.width = +chart.svg.attr('width');
    chart.height = +chart.svg.attr('height');
    chart.radius = Math.min(chart.width, chart.height) / 2;

    chart.color = d3Scale
      .scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    chart.arc = d3Shape
      .arc()
      .outerRadius(chart.radius - 0)
      .innerRadius(chart.radius - chart.radius / 2);

    chart.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => d.value);

    chart.svg = d3
      .select(domSelector)
      .append('g')
      .attr('transform', 'translate(' + chart.width / 2 + ',' + chart.height / 2 + ')');

    return chart;
  }

  private drawChart(domSelector: string, data: any[]) {
    var chart = this.initSvg(domSelector);
    let g = chart.svg
      .selectAll('.arc')
      .data(chart.pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', chart.arc)
      .style('fill', (d: any) => chart.color(d.data.value));

    g.append('text')
      .attr('transform', (d: any) => 'translate(' + chart.arc.centroid(d) + ')')
      .attr('dy', '.45em')
      .text((d: any) => d.data.status);
  }
}
