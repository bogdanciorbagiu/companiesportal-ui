import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company.service';
import { CompanyOverview } from 'src/app/models/ui-models/company.overview.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit {
  symbol: string | null | undefined;
  companyOverview: CompanyOverview = {
    symbol: '',
    assetType: '',
    name: '',
    description: '',
    CIK: '',
    exchange: '',
    currency: '',
    country: '',
    sector: '',
    industry: '',
    address: '',
    fiscalYearEnd: '',
    latestQuarter: '',
    marketCapitalization: '',
    BITDA: '',
    PERatio: '',
    PEGRatio: '',
    BookValue: '',
    DividendPerShare: '',
    DividendYield: '',
    EPS: '',
    RevenuePerShareTTM: '',
    ProfitMargin: '',
    OperatingMarginTTM: '',
    ReturnOnAssetsTTM: '',
    ReturnOnEquityTTM: '',
    RevenueTTM: '',
    GrossProfitTTM: '',
    DilutedEPSTTM: '',
    QuarterlyEarningsGrowthYOY: '',
    QuarterlyRevenueGrowthYOY: '',
    AnalystTargetPrice: '',
    TrailingPE: '',
    ForwardPE: '',
    PriceToSalesRatioTTM: '',
    PriceToBookRatio: '',
    EVToRevenue: '',
    EVToEBITDA: '',
    Beta: '',
    _52WeekHigh: '',
    _52WeekLow: '',
    _50DayMovingAverage: '',
    _200DayMovingAverage: '',
    SharesOutstanding: '',
    DividendDate: '',
    ExDividendDate: ''
  };

  constructor(private readonly route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService) { this.symbol = '';}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.symbol = params.get('id');
        console.log('ID FROM ROUTE: ' + params.get('id'));
        this.companyService.getCompanyOverview(this.symbol)
          .subscribe(
            (successResponse) => {
              this.companyOverview = successResponse;
              console.log(this.companyOverview);
              console.log(this.companyOverview.symbol);
            }
          );
      }

    );
  }

}
