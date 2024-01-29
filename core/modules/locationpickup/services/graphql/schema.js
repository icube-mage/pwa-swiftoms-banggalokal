import { gql } from '@apollo/client';

export const getLocationPickupList = gql`
    query getLocationPickupList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: LocationPickupFilterInput
        $sort: LocationPickupSortInput
        $search: String
    ) {
        getLocationPickupList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                loc_id
                loc_name
                pickup_charge
                pickup_description
                pickup_fulfillment_time
                pickup_id
                pickup_name
                pickup_phone
                pickup_type
                status
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

export const getLocationPickupById = gql`
    query getLocationPickupById($id: Int!) {
        getLocationPickupById(id: $id) {
            loc_id
            loc_name
            pickup_charge
            pickup_description
            pickup_fulfillment_time
            pickup_id
            pickup_name
            pickup_phone
            pickup_type
            rtp_email_template
            status
        }
    }
`;

export const saveLocationPickup = gql`
    mutation saveLocationPickup($input: LocationPickupInput!) {
        saveLocationPickup(input: $input) {
            loc_id
            loc_name
            pickup_charge
            pickup_description
            pickup_fulfillment_time
            pickup_id
            pickup_name
            pickup_phone
            pickup_type
            rtp_email_template
            status
        }
    }
`;

export const deleteLocationPickup = gql`
    mutation deleteLocationPickup($id: Int!) {
        deleteLocationPickup(id: $id)
    }
`;

export default {
    getLocationPickupList,
    getLocationPickupById,
    saveLocationPickup,
    deleteLocationPickup,
};
