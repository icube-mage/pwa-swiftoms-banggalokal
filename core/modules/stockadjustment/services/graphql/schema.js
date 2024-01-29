import { gql } from '@apollo/client';

export const getStockAdjustmentList = gql`
    query getStockAdjustmentList($pageSize: Int!, $currentPage: Int!, $filter: StockAdjustmentFilterInput, $sort: StockAdjustmentSortInput) {
        getStockAdjustmentList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                loc_name
                created_by
                created_at
                status
                status_label
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getStockAdjustmentById = gql`
    query getStockAdjustmentById($id: Int!) {
        getStockAdjustmentById(id: $id) {
            increment_id
            entity_id
            loc_code
            loc_name
            reason
            status
            items {
                entity_id
                sku
                new_qty
                old_qty
                change_qty
            }
        }
    }
`;

export const addStockAdjustment = gql`
    mutation addStockAdjustment($input: AddStockAdjustmentInput!) {
        addStockAdjustment(input: $input) {
            entity_id
            loc_code
            loc_name
            reason
            items {
                sku
                new_qty
                old_qty
            }
        }
    }
`;

export const csvToArrayOfObject = gql`
    mutation csvToArrayOfObject($binary: String!) {
        csvToArrayOfObject(binary: $binary) {
            headers
            rows {
                columns {
                    header
                    value
                }
            }
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export default {
    getStockAdjustmentList,
    getStockAdjustmentById,
    addStockAdjustment,
    csvToArrayOfObject,
    downloadSampleCsv,
};
