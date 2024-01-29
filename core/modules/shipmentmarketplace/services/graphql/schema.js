import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
    query getStoreShipmentList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput,
    ){
        getStoreShipmentList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                increment_id
                channel_order_increment_id
                channel_shipping_label
                marketplace_order_number
                allocation_status
                channel_order_date
                status{
                    value
                    label
                }
                marketplace_order_status
                port
                track_number
                channel{
                    channel_name
                }
                loc_code
                shipping_name
                shipping_email
                shipping_telephone
                channel_order_date
                location {
                    loc_name
                }
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

export const getStoreShipmentById = gql`
    query getStoreShipmentById(
        $id: Int!
    ){
        getStoreShipmentById(
            id: $id
        ){
            entity_id
            increment_id
            channel_order_increment_id
            channel{
                channel_name
                channel_code
                image_url
            }
            marketplace_order_number
            status {
                label
                value
            }
            marketplace_order_status
            marketplace_code
            allocation_status
            channel_order_date
            location{
                loc_name
            }
            awb_source
            customer_name
            shipping_telephone
            shipping_email
            updated_at
            track_number
            all_track{
                created_at
                title
                track_number
            }
            shipping_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                country_name
                telephone
            }
            pickup_info {
                name
                loc_details
                vehicle_number
                vehicle_desc
                notes
            }
            order_item {
                entity_id
                base_price
                name
                qty_shipped
                row_total
                sku
                parent_item_id
            }
            channel_shipping_label
            subtotal
            status_history {
                created_at
                status
                comment
            }
        }
    }
`;

export const confirmMarketplaceShipment = gql`
    mutation confirmMarketplaceShipment(
        $id: [Int!],
    ){
        confirmMarketplaceShipment(
            id: $id
        )
    }
`;

export const cantFulfillShipment = gql`
    mutation cantFulfillShipment(
        $id: [Int!],
    ){
        cantFulfillShipment(
            id: $id
        )
    }
`;

export const pickShipment = gql`
    mutation pickShipment(
        $id: [Int!],
    ){
        pickShipment(
            id: $id
        )
    }
`;

export const canceledMarketplaceShipment = gql`
    mutation canceledMarketplaceShipment(
        $id: Int!,
        $cancel_reason_id: String,
    ){
        canceledMarketplaceShipment(
            id: $id
            cancel_reason_id: $cancel_reason_id,
        )
    }
`;

export const packShipment = gql`
    mutation packShipment(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const shippedMarketplaceShipment = gql`
    mutation shippedMarketplaceShipment(
        $id: Int!,
        $track_number: String!,
    ){
        shippedMarketplaceShipment(
            id: $id,
            track_number: $track_number,
        )
    }
`;

export const deliveredShipment = gql`
    mutation deliveredShipment(
        $id: [Int!],
    ){
        deliveredShipment(
            id: $id
        )
    }
`;

export const exportStoreShipmentToCsv = gql`
    query exportStoreShipmentToCsv(
        $type: String!,
        $with_items: Boolean,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput,
    ){
        exportStoreShipmentToCsv(
            type: $type,
            with_items: $with_items,
            filter: $filter,
            sort: $sort,
        )
    }
`;

export const saveShipmentNotes = gql`
    mutation saveShipmentNotes(
        $id: Int!,
        $notes: String!,
    ){
        saveShipmentNotes(
            id: $id,
            notes: $notes,
        )
    }
`;

export const getCourierOption = gql`
    query{
        getCourierOption{
            label
            value
        }
    }
`;

export const getMarketplaceCancelReason = gql`
query getMarketplaceCancelReason($code: String) {
    getMarketplaceCancelReason(code: $code) {
      label
      value
    }
  }
  
`;

export const bulkShippedMarketplaceShipment = gql`
    mutation bulkShippedMarketplaceShipment(
        $binary: String!,
    ){
        bulkShippedMarketplaceShipment(
            input: {
                binary: $binary,
            }
        ){
            is_success
            attachment_url
        }
    }
`;

export const bulkConfirmedMarketplaceShipment = gql`
    mutation bulkConfirmedMarketplaceShipment(
        $binary: String!,
    ){
        bulkConfirmedMarketplaceShipment(
            input: {
                binary: $binary,
            }
        ){
            is_success
            attachment_url
        }
    }
`;

export const getExportStatusHistory = gql`
query getExportStatusHistory($id: [Int!]!) {
    getExportStatusHistory(id: $id)
  }
`;

export const getActivity = gql`
    query getActivity($code: String!){
        getActivity(code: $code, by_session: true){
        activity_id
        activity_code
        run_status
        data_total
        data_processed
        started_at
        snapshot_at
        finished_at
        run_by
        run_type
        attachment
        error_message
        }
    }
`;

export const getShipmentStatusByType = gql`
    query{
        getShipmentStatusByType(type: "marketplace"){
            label
            value
        }
    }
`;

export const getStoreConfig = gql`
  query getStoreConfig($path: String!){
    getStoreConfig(path: $path)
  }
`;

export const bulkPortCodeUpload = gql`
    mutation bulkPortCodeUpload(
        $binary: String!,
    ){
        bulkPortCodeUpload(
            input: {
                binary: $binary,
            }
        ){
            is_success
            attachment_url
        }
    }
`;

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmMarketplaceShipment,
    cantFulfillShipment,
    pickShipment,
    canceledMarketplaceShipment,
    packShipment,
    shippedMarketplaceShipment,
    deliveredShipment,
    exportStoreShipmentToCsv,
    saveShipmentNotes,
    getCourierOption,
    getMarketplaceCancelReason,
    bulkShippedMarketplaceShipment,
    bulkConfirmedMarketplaceShipment,
    getExportStatusHistory,
    getActivity,
    getShipmentStatusByType,
    getStoreConfig,
    bulkPortCodeUpload,
};
