/* eslint-disable import/prefer-default-export */
import ProductMasterUpload from '@modules/vendorbulktools/pages/tutorialupload/components/productMasterUpload';
import BaseTutorialUpload from '@root/core/modules/vendorbulktools/pages/tutorialupload/components/baseTutorialUpload';

export const tutorialOptions = [
    {
        name: 'Product Upload Master',
        code: 'product_upload_master',
        sample: 'vendor_product',
        component: <ProductMasterUpload />,
    },
    {
        name: 'Configurable Product',
        code: 'product_upload_configurable',
        sample: 'vendor_product_configurable',
        excel_image_url: '/assets/img/configurable-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Bundle Product',
        code: 'product_upload_bundle',
        sample: 'vendor_product_bundle',
        excel_image_url: '/assets/img/bundle-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Grouped Product',
        code: 'product_upload_grouped',
        sample: 'vendor_product_grouped',
        excel_image_url: '/assets/img/group-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Price Product',
        code: 'product_upload_price',
        sample: 'vendor_product_configurable',
        excel_image_url: '/assets/img/price-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Product Price By Location',
        code: 'product_upload_price_by_location',
        sample: 'vendor_product_price_location',
        excel_image_url: '/assets/img/price-location-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Product Image',
        code: 'product_image_upload',
        sample: 'vendor_product_image',
        excel_image_url: '/assets/img/product-image-excel.png',
        component: <BaseTutorialUpload />,
    },
    {
        name: 'Product Simplify',
        code: 'product_simplify_upload',
        sample: 'vendor_product_simplify',
        component: <ProductMasterUpload />,
    },
    {
        name: 'Assign Product Category',
        code: 'assign_product_category_upload',
        sample: 'vendor_category_assignation',
        excel_image_url: '/assets/img/categoryassign-excel.png',
        component: <BaseTutorialUpload />,
    },
];
