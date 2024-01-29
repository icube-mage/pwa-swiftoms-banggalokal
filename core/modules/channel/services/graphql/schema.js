import { gql } from '@apollo/client';

export const getChannelList = gql`
    query getChannelList($pageSize: Int, $currentPage: Int!, $filter: ChannelFilterInput, $sort: ChannelSortInput, $search: String) {
        getChannelList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                channel_id
                channel_code
                channel_name
                channel_url
                token
                framework
                rule_type
                use_customer_review
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

export const getChannelById = gql`
    query getChannelById($id: Int!) {
        getChannelById(id: $id) {
            auto_confirm_shipment
            auto_order_reallocation
            channel_code
            channel_id
            channel_name
            channel_url
            credentials {
                data_type
                store_detail_id
                type
                updatable
                value
              }
            delta_stock_url
            end_point
            framework
            location_list
            notes
            release_stock
            rule_type
            token
            use_customer_review
            marketplace_code
            virtual_stock {
                vs_id
                vs_name
            }
            store_detail_id
            virtual_stock_list
            webhook_creditmemo
            webhook_invoice
            webhook_rma_refund
            webhook_rma_replacement
            webhook_rma_status_change
            webhook_shipment_complete
            webhook_vendor_salesrule
            send_shipment
            split_shipment_capability
            is_multiseller
            is_auto_create_product
        }
    }
`;

export const createChannel = gql`
    mutation createChannel($input: ChannelInput!) {
        createChannel(input: $input) {
            channel_id
            channel_code
            channel_name
            notes
            channel_url
            token
            end_point
            delta_stock_url
            framework
            rule_type
            virtual_stock {
                vs_id
                vs_name
            }
            webhook_shipment_complete
            webhook_invoice
            webhook_rma_refund
            webhook_creditmemo
            auto_confirm_shipment
            use_customer_review
            release_stock
            webhook_vendor_salesrule
            send_shipment
            auto_order_reallocation
            split_shipment_capability
            is_multiseller
        }
    }
`;

export const updateChannel = gql`
    mutation updateChannel(
        $id: Int!
        $input: ChannelInput!
    ) {
        updateChannel(
            id: $id
            input: $input
        ) {
            channel_id
            channel_code
            channel_name
            notes
            channel_url
            credentials {
                data_type
                id
                store_detail_id
                type
                updatable
                value
              }
            token
            end_point
            delta_stock_url
            framework
            rule_type
            virtual_stock {
                vs_id
                vs_name
            }
            webhook_shipment_complete
            webhook_invoice
            webhook_rma_refund
            webhook_creditmemo
            auto_confirm_shipment
            release_stock
            webhook_vendor_salesrule
            send_shipment
            auto_order_reallocation
            use_customer_review
            split_shipment_capability
            is_multiseller
        }
    }
`;

export const getVirtualStockList = gql`
    query getVirtualStockList($filter: VirtualStockFilterInput, $pageSize: Int!, $currentPage: Int!) {
        getVirtualStockList(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                vs_id
                vs_name
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

export const getShipmentStatus = gql`
    query getShipmentStatus {
        getShipmentStatus {
            label
            value
        }
    }
`;

export const getReleaseStockOptions = gql`
    query getReleaseStockOptions {
        getReleaseStockOptions {
            label
            value
        }
    }
`;

export const deleteChannel = gql`
    mutation deleteChannel($id: Int!) {
        deleteChannel(id: $id)
    }
`;

export const multideleteChannel = gql`
    mutation multideleteChannel($id: [Int!]!) {
        multideleteChannel(id: $id)
    }
`;

export const getChannelFrameworkOptions = gql`
    query {
        getChannelFrameworkOptions {
            value
            label
        }
    }
`;

export const getChannelRuleTypeOptions = gql`
    query {
        getChannelRuleTypeOptions {
            value
            label
        }
    }
`;

export default {
    getChannelList,
    getChannelById,
    createChannel,
    updateChannel,
    getVirtualStockList,
    getShipmentStatus,
    getReleaseStockOptions,
    deleteChannel,
    multideleteChannel,
    getChannelFrameworkOptions,
    getChannelRuleTypeOptions,
};
