import { gql } from '@apollo/client';

export const createStockTransfer = gql`
    mutation createStockTransfer($input: StockTransferInput!) {
        createStockTransfer(input: $input) {
            created_at
            entity_id
        }
    }
`;

export const updateStockTransfer = gql`
    mutation updateStockTransfer($id: Int!, $input: StockTransferInput!) {
        updateStockTransfer(id: $id, input: $input) {
            created_at
            entity_id
        }
    }
`;

export const getStockTransferList = gql`
    query getStockTransferList($pageSize: Int!, $currentPage: Int!, $filter: StockTransferFilterInput, $sort: StockTransferSortInput) {
        getStockTransferList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                source_loc_code
                source_loc_name
                target_loc_code
                target_loc_name
                status
                created_by
                created_at
                confirmed_by
                confirmed_at
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

export const getStockTransferById = gql`
    query getStockTransferById($id: Int!) {
        getStockTransferById(id: $id) {
            confirmed_at
            confirmed_by
            created_at
            created_by
            entity_id
            increment_id
            source_loc_code
            source_loc_name
            status
            target_loc_code
            target_loc_name
            reason
            items {
                sku
                product_name
                source_id
                target_id
                source_qty
                transfer_qty
            }
        }
    }
`;

export const uploadStockTransfer = gql`
    mutation uploadStockTransfer($binary: String!) {
        uploadStockTransfer(input: { binary: $binary })
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const getUploadStockTransferList = gql`
    query getUploadStockTransferList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: UploadStockTransferFilterInput
        $sort: UploadStockTransferSortInput
    ) {
        getUploadStockTransferList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                created_at
                created_by
                filename
                url
            }
            page_info {
                current_page
            }
            total_count
        }
    }
`;

export const getUploadStockTransferItems = gql`
    query getUploadStockTransferItems($id: Int!) {
        getUploadStockTransferItems(id: $id) {
            entity_id
            error_messages
            quantity
            sku
            source_location_code
            stock_transfer_increment_id
            target_location_code
            upload_id
        }
    }
`;

export default {
    getStockTransferList,
    getStockTransferById,
    uploadStockTransfer,
    downloadSampleCsv,
    createStockTransfer,
    getUploadStockTransferItems,
};
