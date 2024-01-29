import { gql } from '@apollo/client';

export const getSalesOrderReport = gql`
query getSalesOrderReport($input: SalesOrderReportInput!) {
    getSalesOrderReport(input: $input) {
      orders_count
      period
      total_canceled_amount
      total_discount_amount
      total_discount_amount_actual
      total_income_amount
      total_invoiced_amount
      total_paid_amount
      total_profit_amount
      total_qty_invoiced
      total_qty_ordered
      total_refunded_amount
      total_revenue_amount
      total_shipping_amount
      total_shipping_amount_actual
      total_tax_amount
      total_tax_amount_actual
    }
  }  
`;

export const generateSalesOrderReport = gql`
mutation generateSalesOrderReport($input: GenerateSalerOrderInput!) {
    generateSalesOrderReport(input: $input)
  }
  
`;

export default {
    getSalesOrderReport,
    generateSalesOrderReport,
};
