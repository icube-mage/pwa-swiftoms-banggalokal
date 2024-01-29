/* eslint-disable max-len */
import { gql } from '@apollo/client';

export const getInventoryAuditTrailList = gql`
    query getInventoryAuditTrailList($pageSize: Int!, $currentPage: Int!, $filter: InventoryAuditTrailFilterInput, $sort: InventoryAuditTrailSortInput) {
        getInventoryAuditTrailList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                created_at
                sku
                location
                loc_name
                table_name
                table_parent_id
                old_data {
                    qty_buffer
                    qty_incoming
                    qty_reserved
                    qty_saleable
                    qty_total
                    source_id
                }
                new_data {
                    qty_buffer
                    qty_incoming
                    qty_reserved
                    qty_saleable
                    qty_total
                    source_id
                }
                user
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

export const getInventoryAuditTrailEventOptions = gql`
    query getInventoryAuditTrailEventOptions{
        getInventoryAuditTrailEventOptions{
            label
            value
        }
    }
`;

export default {
    getInventoryAuditTrailList,
    getInventoryAuditTrailEventOptions,
};
