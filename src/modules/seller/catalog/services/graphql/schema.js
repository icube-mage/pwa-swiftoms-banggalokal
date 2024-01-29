import { gql } from '@apollo/client';

export const getSellerProducts = gql`
    query getSellerProducts($pageSize: Int!, $currentPage: Int!, $filter: SellerProductFilterInput, $sort: SellerProductSortInput, $search: String) {
        getSellerProducts(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                brand
                category_id
                description
                dimension_package_height
                dimension_package_length
                dimension_package_width
                entity_id
                images {
                    file
                    id
                    position
                    types
                    url
                }
                name
                price
                price_formatted
                shipping_method {
                    entity_id
                    provider
                    service
                }
                sku
                vendor_sku
                status
                updated_at
                location_stock {
                    location {
                        loc_name
                    }
                    stock
                }
                weight
                approval_status
                etalase_ids
                channels {
                    code
                    name
                    logo
                }
                variants {
                    sku
                    vendor_sku
                    name
                    channels {
                        code
                        name
                        logo
                    }
                    price_formatted
                    images {
                        url
                    }
                    channel_price {
                        channel_code
                        price
                        price_formatted
                    }
                }
                channel_code
                channel_price {
                    channel_code
                    price
                    price_formatted
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const getCategoryList = gql`
    query getCategoryList($filter: CategoryFilterInput) {
        getCategoryList(filter: $filter) {
            id
            name
            description
            level
            is_active
            children {
                id
                name
                description
                level
                is_active
                children {
                    id
                    name
                    description
                    level
                    is_active
                    children {
                        id
                        name
                        description
                        level
                        is_active
                    }
                }
            }
        }
    }
`;

export const updateSellerProductStatus = gql`
    mutation updateSellerProductStatus($input: [SellerUpdateStatusInput]!) {
        updateSellerProductStatus(input: $input)
    }
`;

export const deleteMultitenantProductByIds = gql`
    mutation deleteMultitenantProductByIds($ids: [Int]!) {
        deleteMultitenantProductByIds(ids: $ids)
    }
`;

export const getStoreShippingMethod = gql`
    {
        getStoreShippingMethod {
            entity_id
            provider
            service
        }
    }
`;

export const createSellerProduct = gql`
    mutation createSellerProduct($input: SellerProductInput!) {
        createSellerProduct(input: $input)
    }
`;

export const getSellerProduct = gql`
    query getSellerProduct($id: Int!) {
        getSellerProduct(id: $id) {
            brand
            category_id
            description
            dimension_package_height
            dimension_package_length
            dimension_package_width
            entity_id
            images {
                file
                id
                position
                types
                url
            }
            etalase_ids
            name
            price
            shipping_method {
                entity_id
                provider
                service
            }
            sku
            vendor_sku
            short_description
            status
            stock
            weight
            minimum_order_quantity
        }
    }
`;

export const updateSellerProduct = gql`
    mutation updateSellerProduct($id: Int!, $input: SellerProductInput!) {
        updateSellerProduct(id: $id, input: $input)
    }
`;

export const downloadProductXlsxTemplate = gql`
    query downloadProductXlsxTemplate($type: ProductXlsxTemplateType!) {
        downloadProductXlsxTemplate(type: $type)
    }
`;

export const uploadSellerProductXlsx = gql`
    mutation uploadSellerProductXlsx($input: SellerUploadProductXlsxInput!) {
        uploadSellerProductXlsx(input: $input)
    }
`;

export const getVoltwigActivity = gql`
    query getVoltwigActivity($title: String!) {
        getVoltwigActivity(title: $title) {
            activity
            percent
            rows_error
            rows_found
            rows_processed
            rows_success
        }
    }
`;

export const getActivity = gql`
    query getActivity($code: String!, $by_session: Boolean!) {
        getActivity(code: $code, by_session: $by_session) {
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
            run_by_name
            attachment
            error_message
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig($path: String!) {
        getStoreConfig(path: $path)
    }
`;

export const getSellerVariantAttributes = gql`
    query getSellerVariantAttributes {
        getSellerVariantAttributes {
            attribute_id
            attribute_code
            frontend_label
            attribute_options {
                label
                value
            }
            vendor_id
        }
    }
`;

export const getSellerProductVariantItems = gql`
    query getSellerProductVariantItems($id: Int!) {
        getSellerProductVariantItems(id: $id) {
            attributes {
                attribute_code
                attribute_id
                attribute_options {
                    label
                    value
                }
                attribute_value
                backend_type
                frontend_input
                frontend_label
                is_required
            }
            entity_id
            images {
                file
                id
                position
                types
                url
            }
            name
            price
            sku
            vendor_sku
            status
            type_id
            weight
            stock
        }
    }
`;

export const getSellerEtalaseList = gql`
    query getSellerEtalaseList($filter: SellerEtalaseFilterInput) {
        getSellerEtalaseList(filter: $filter) {
            items {
                entity_id
                name
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const moveSellerProductEtalase = gql`
    mutation moveSellerProductEtalase($id: Int!, $product_ids: [Int]!) {
        moveSellerProductEtalase(id: $id, product_ids: $product_ids)
    }
`;

export const getSellerChannelList = gql`
    query getSellerChannelList {
        getSellerChannelList(
            pageSize: 20
            currentPage: 1
        ) {
            items {
                image_url
                brand_name
                channel_id
                channel_code
                channel_name
                marketplace_code
                marketplace {
                    marketplace_name
                }
                channel_capability {
                    can_create_product
                }
            }
        }
    }
`;

export const getSellerChannelListPushProduct = gql`
    query getSellerChannelListPushProduct {
        getSellerChannelList(
            filter: { status: { eq: "1" }, can_create_product: { eq: "1" } }
            pageSize: 100
            currentPage: 1
        ) {
            items {
                image_url
                brand_name
                channel_id
                channel_code
                channel_name
                marketplace_code
                marketplace {
                    marketplace_name
                }
                channel_capability {
                    can_create_product
                }
            }
        }
    }
`;

export const getActivityItemChannel = gql`
    query getActivty($activity_code: String!) {
        getActivity(code: $activity_code, by_session: false) {
            started_at
            finished_at
            snapshot_at
            data_processed
            data_total
            run_status
        }
    }
`;

export const getSellerProductsCount = gql`
    query getSellerProducts($status: String) {
        getSellerProducts(filter: { status: { eq: $status } }) {
            total_count
        }
    }
`;

export const getSellerProductsCountFailed = gql`
    query getSellerProductSyncStatusList($status: [String]!) {
        getSellerProductSyncStatusList(filter: { status: { in: $status } }) {
            total_count
        }
    }
`;

export const getSellerProductsCountAll = gql`
    query getSellerProducts {
        getSellerProducts {
            total_count
        }
    }
`;

export const getSellerProductsFailed = gql`
    query getSellerProductSyncStatusListFailed(
        $pageSize: Int!
        $currentPage: Int!
        $filter: SellerProductSyncStatusFilterInput
        $sort: SellerProductSyncStatusSortInput
        $search: String
    ) {
        getSellerProductSyncStatusList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            total_count
            items {
                name
                sku
                vendor_sku
                message
                message_format
                entity_id
                channel {
                    name
                    logo
                }
                channel_code
                updated_at
                status {
                    code
                    label
                }
            }
        }
    }
`;

export const exportSellerProduct = gql`
    query exportSelerProduct($status: Boolean) {
        exportSelerProduct(filter: { status: $status }) {
            message
            success
        }
    }
`;

export const exportSellerProductAll = gql`
    query exportSelerProduct {
        exportSelerProduct {
            message
            success
        }
    }
`;

export const getSellerChannelProduct = gql`
    query getSellerProductOnly($id: Int!) {
        getSellerProduct(id: $id) {
            channels {
                code
                name
                logo
            }
        }
    }
`;

export const getSellerChannelProductData = gql`
    query getSellerChannelProduct($id: Int!, $channel_code: String!) {
        getSellerChannelProduct(id: $id, channel_code: $channel_code) {
            entity_id
            name
            sku
            vendor_sku
            weight
            description
            package_height
            package_length
            package_width
            price
            price_formatted
            category_id
            images
            variant_items {
                entity_id
                images
                name
                price
                price_formatted
                sku
                vendor_sku
                attributes {
                    attribute_id
                    attribute_code
                    frontend_label
                    attribute_options {
                        label
                        value
                    }
                }
            }
            channel {
                channel_code
                channel_capability {
                    can_create_product
                }
                marketplace {
                    marketplace_code
                }
            }
            category_attributes {
                attribute_id
                attribute_name
                attribute_value
            }
        }
    }
`;

export const saveSellerChannelProduct = gql`
    mutation saveSellerChannelProduct($id: Int!, $input: [ChannelProductAttributeInput]!) {
        saveSellerChannelProduct(id: $id, input: $input)
    }
`;

export const getProductCategoryList = gql`
    query getProductCategoryList($category_search: String, $marketplace_filter: ProductCategoryFilterInput) {
        getProductCategoryList(search: $category_search, filter: $marketplace_filter, pageSize: 2000) {
            items {
                entity_id
                marketplace_category_id
                marketplace_category_parent_id
                marketplace_category_name
            }
        }
    }
`;

export const deleteSellerChannelProduct = gql`
    mutation deleteSellerChannelProduct($id: Int!, $channel_code: String!) {
        deleteSellerChannelProduct(id: $id, channel_code: $channel_code)
    }
`;

export const getProductCategoryListAttribute = gql`
    query getMarketplaceProductAttributeList($category_id: String, $marketplace_code: String) {
        getMarketplaceProductAttributeList(
            filter: {
                marketplace_code: { eq: $marketplace_code }
                category_id: { eq: $category_id }
            }
        ) {
            items {
                entity_id
                attribute_id
                attribute_code
                marketplace_attribute_name
                marketplace_attribute_type
                marketplace_input_type
                marketplace_options
                is_mandatory
                is_variant_attribute
            }
        }
    }
`;

export const pullSellerProduct = gql`
    mutation pullSellerProduct($channel_id: [Int]) {
        pullSellerProduct(channel_id: $channel_id)
    }
`;

export const pushSellerProduct = gql`
    mutation pushSellerProduct($channel_ids: [Int]) {
        pushSellerProduct(channel_id: $channel_ids)
    }
`;

export const retryPushSellerProduct = gql`
    mutation retryPushSellerProduct($sku: String!, $channel_code: String!) {
        retryPushSellerProduct(sku: $sku, channel_code: $channel_code)
    }
`;

export const getMarketplaceProductLimitation = gql`
    query getMarketplaceProductLimitation($pageSize: Int, $currentPage: Int, $filter: MarketplaceProductLimitationFilterInput) {
        getMarketplaceProductLimitation(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {
            items {
                id
                attribute
                limitation
                marketplace_code
            }
        }
    }
`;

export const getSellerChannelListFetchProduct = gql`
    query getSellerChannelListFetchProduct {
        getSellerChannelList(
            filter: { status: { eq: "1" }, can_fetch_product: { eq: "1" } }
            pageSize: 100
            currentPage: 1
        ) {
            items {
                image_url
                brand_name
                channel_id
                channel_code
                channel_name
                marketplace_code
                marketplace {
                    marketplace_name
                }
                channel_capability {
                    can_create_product
                }
            }
        }
    }
`;

export default {
    getSellerProducts,
    getCategoryList,
    updateSellerProductStatus,
    deleteMultitenantProductByIds,
    getStoreShippingMethod,
    createSellerProduct,
    getSellerProduct,
    updateSellerProduct,
    downloadProductXlsxTemplate,
    uploadSellerProductXlsx,
    getVoltwigActivity,
    getActivity,
    getStoreConfig,
    getSellerVariantAttributes,
    getSellerProductVariantItems,
    getSellerEtalaseList,
    moveSellerProductEtalase,
    getSellerChannelList,
    getSellerChannelListPushProduct,
    getActivityItemChannel,
    getSellerProductsCount,
    getSellerProductsCountAll,
    exportSellerProduct,
    exportSellerProductAll,
    getSellerChannelProduct,
    getSellerChannelProductData,
    saveSellerChannelProduct,
    getProductCategoryList,
    deleteSellerChannelProduct,
    pullSellerProduct,
    pushSellerProduct,
    getSellerProductsCountFailed,
    getSellerProductsFailed,
    retryPushSellerProduct,
    getMarketplaceProductLimitation,
    getSellerChannelListFetchProduct,
};
