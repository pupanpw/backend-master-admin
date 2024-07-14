import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const buffer = {
      id: 13643,
      sales_order_no: 'GTSOPCG2300565',
      init_id: 'IN-EX-SO-2024-000',
    };

    const converJsonToBuffer = Buffer.from(JSON.stringify(buffer));
    console.log();
    const decodedBuffer = JSON.parse(converJsonToBuffer.toString());
    console.log(decodedBuffer, 'decodedBuffer');
    const result = [
      {
        id: 1541,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Sales Order',
        stage_ref_id: 'Do9SOPCG2300083',
      },
      {
        id: 1542,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Export Finance Memo',
        stage_ref_id: 'MMP2300014',
      },
      {
        id: 1543,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Plan Load',
        stage_ref_id: null,
      },
      {
        id: 1545,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Export Finance Memo',
        stage_ref_id: 'MMP2300015',
      },
      {
        id: 1546,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Plan Load',
        plan_load_id: 1546,
        stage_ref_id: null,
      },
      {
        id: 1547,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Plan Load',
        plan_load_id: 1547,
        stage_ref_id: null,
      },
      {
        id: 1548,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Credit Requisition',
        plan_load_id: 1546,
        stage_ref_id: null,
      },
      {
        id: 1549,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Plan Load',
        plan_load_id: 1549,
        stage_ref_id: null,
      },

      {
        id: 1554,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Credit Requisition',
        plan_load_id: 1549,
        stage_ref_id: null,
      },

      {
        id: 1556,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Tax Rebate',
        stage_ref_id: null,
      },
      {
        id: 1557,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Tax Rebate',
        stage_ref_id: null,
      },

      {
        id: 1559,
        init_id: 'IN-EX-SO-2023-000097',
        stage: 'Export Finance Memo',
        stage_ref_id: 'MMP2300015',
      },
    ];

    const primarySort = [
      'Sales Order',
      'Export Finance Memo',
      'Select Bank',
      'Forward Contract',
      'Plan Load',
      'Tax Rebate',
    ];

    const response = result.reduce((acc, item) => {
      if (item.stage === 'Credit Requisition') {
        const planLoadIndex = acc.findIndex(
          (e) =>
            e.stage === 'Plan Load' && e.plan_load_id === item.plan_load_id,
        );

        if (planLoadIndex !== -1) {
          if (!acc[planLoadIndex].children) {
            acc[planLoadIndex].children = [];
          }
          acc[planLoadIndex].children.push(item);
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    response.sort((a, b) => {
      const stageA = primarySort.indexOf(a.stage);
      const stageB = primarySort.indexOf(b.stage);

      if (stageA === stageB) {
        return 0;
      }

      if (stageA < stageB) {
        return -1;
      }

      if (stageA > stageB) {
        return 1;
      }

      return 0;
    });

    response.filter((item) => item.stage !== 'Credit Requisition');
    console.table(response);
    response.forEach((init) => {
      this.parseMetaDataToJSON(init);
    });
    return response;
  }
  private parseMetaDataToJSON(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === 'meta_data') {
          try {
            obj[key] = JSON.parse(obj[key]);
          } catch (error) {
            console.error('Error parsing meta_data:', error);
          }
        } else {
          this.parseMetaDataToJSON(obj[key]);
        }
      }
    }
  }
}
