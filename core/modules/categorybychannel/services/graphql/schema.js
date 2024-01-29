import { gql } from '@apollo/client';

export const getCategoryByChannelList = gql`
    query getCategoryByChannelList($pageSize: Int!, $currentPage: Int!, $filter: CategoryByChannelFilterInput, $sort: CategoryByChannelSortInput) {
        getCategoryByChannelList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                channel_code
                name
                path
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

export const vendorCategoryUpload = gql`
    mutation vendorCategoryUpload($binary: String!, $channelCode: String!) {
        vendorCategoryUpload(binary: $binary, channelCode: $channelCode) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export default {
    getCategoryByChannelList,
    vendorCategoryUpload,
    downloadSampleCsv,
};
