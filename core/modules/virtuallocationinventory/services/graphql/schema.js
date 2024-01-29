import { gql } from '@apollo/client';

export const getVirtualLocationList = gql`
    query getVirtualLocationList($pageSize: Int!, $currentPage: Int!, $filter: VirtualLocationFilterInput, $sort: VirtualLocationSortInput) {
        getVirtualLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                vl_id
                parent_label {
                    label
                }
                virtual_label {
                    label
                }
                percentage
                priority
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

export const getVirtualLocationById = gql`
    query getVirtualLocationById($id: Int!) {
        getVirtualLocationById(id: $id) {
            vl_id
            parent_label {
                loc_code
                label
            }
            virtual_label {
                loc_code
                label
            }
            percentage
            priority
        }
    }
`;

export const createVirtualLocation = gql`
    mutation createVirtualLocation($parent_location: String!, $virtual_location: String!, $percentage: Int!, $priority: Int!) {
        createVirtualLocation(
            input: { parent_location: $parent_location, virtual_location: $virtual_location, percentage: $percentage, priority: $priority }
        ) {
            parent_location
            virtual_location
            percentage
            priority
        }
    }
`;

export const updateVirtualLocation = gql`
    mutation updateVirtualLocation($id: Int!, $parent_location: String!, $virtual_location: String!, $percentage: Int!, $priority: Int!) {
        updateVirtualLocation(
            id: $id
            input: { parent_location: $parent_location, virtual_location: $virtual_location, percentage: $percentage, priority: $priority }
        ) {
            parent_location
            virtual_location
            percentage
            priority
        }
    }
`;

export const deleteVirtualLocation = gql`
    mutation deleteVirtualLocation($id: Int!) {
        deleteVirtualLocation(id: $id)
    }
`;

export default {
    getVirtualLocationList,
    getVirtualLocationById,
    createVirtualLocation,
    updateVirtualLocation,
    deleteVirtualLocation,
};
