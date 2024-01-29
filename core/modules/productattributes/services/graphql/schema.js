/* eslint-disable max-len */
import { gql } from '@apollo/client';

export const getConfigurableAttributes = gql`
    query getConfigurableAttributes($pageSize: Int, $currentPage: Int, $filter: ConfigurableAttributeFilterInput, $sort: ConfigurableAttributeSortInput) {
        getConfigurableAttributes(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                attribute_id
                attribute_code
                frontend_label
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

export const getConfigurableAttributeByIds = gql`
    query getConfigurableAttributeByIds($attribute_ids: [Int]) {
        getConfigurableAttributeByIds(attribute_ids: $attribute_ids) {
            attribute_id
            frontend_label
            frontend_input
            attribute_code
            attribute_options{
                label
                value
            }
        }
    }
`;

export const saveProductAttribute = gql`
    mutation saveProductAttribute(
        $input: ProductAttributeInput!
    ) {
        saveProductAttribute(
            input: $input
        ) {
            attribute_id
            frontend_label
            frontend_input
            attribute_code
            attribute_options{
                label
                value
            }
        }
    }
`;

export const deleteConfigurableAttributes = gql`
    mutation deleteConfigurableAttributes($id: [Int]!) {
        deleteConfigurableAttributes(id: $id)
    }
`;

export default {
    getConfigurableAttributes,
    getConfigurableAttributeByIds,
    saveProductAttribute,
    deleteConfigurableAttributes,
};
