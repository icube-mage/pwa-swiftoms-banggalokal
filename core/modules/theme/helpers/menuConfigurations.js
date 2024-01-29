/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
export const optionsConfigurations = (t) => [
    {
        aclCode: 'oms_lite_header_configurations',
        key: 'configurations',
        label: t('menu:Configurations'),
        children: [
            {
                aclCode: 'oms_lite_config_integrations',
                key: 'integrations',
                label: t('menu:Extension_Integrations'),
                url: '/configurations/integrations',
            },
            {
                aclCode: 'configuration_general',
                key: 'general',
                label: t('menu:General'),
                url: '/configurations/general',
            },
            {
                aclCode: 'configuration_product',
                key: 'product',
                label: t('menu:Product'),
                url: '/configurations/product',
            },
            {
                aclCode: 'configuration_inventory',
                key: 'inventory',
                label: t('menu:Inventory'),
                url: '/configurations/inventory',
            },
            {
                aclCode: 'configuration_price_location',
                key: 'configurationpricebylocation',
                label: t('menu:Price_By_Location'),
                url: '/configurations/pricebylocation',
            },
            {
                aclCode: 'configuration_order',
                key: 'order',
                label: t('menu:Order'),
                url: '/configurations/order',
            },
            {
                aclCode: 'configuration_invoice',
                key: 'configurationinvoice',
                label: t('menu:Invoice'),
                url: '/configurations/invoice',
            },
            {
                aclCode: 'oms_lite_config_shipments',
                key: 'shipments',
                label: t('menu:Shipment'),
                url: '/configurations/shipment',
            },
            {
                aclCode: 'configuration_rma',
                key: 'return',
                label: t('menu:Return'),
                url: '/configurations/return',
            },
            {
                aclCode: 'oms_lite_logistix_provider',
                key: 'logistixprovider',
                label: t('menu:Logistix_Provider'),
                url: '/configurations/logistixprovider',
            },
            {
                aclCode: 'pick_pack_configuration',
                key: 'pickpack',
                label: t('menu:Pick_Pack'),
                url: '/configurations/pickpack',
            },
            {
                aclCode: 'oms_lite_header_mpadapter',
                key: 'mpadapter',
                label: t('menu:Marketplace_Adapter'),
                url: '/configurations/mpadapter',
            },
            {
                aclCode: 'oms_lite_marketplace_feature',
                key: 'marketplacefeature',
                label: t('menu:Marketplace_Feature'),
                url: '/configurations/marketplacefeature',
            },
            {
                aclCode: 'configuration_region_mapping',
                key: 'regionmapping',
                label: t('menu:Region_Mapping'),
                url: '/configurations/regionmapping',
            },
            {
                aclCode: 'configuration_tax_rules',
                key: 'configurationtaxrules',
                label: t('menu:Tax_Rules'),
                url: '/configurations/taxrules',
            },
            {
                aclCode: 'acceptance_deadline',
                key: 'acceptancedeadline',
                label: t('menu:Acceptance_Deadline'),
                url: '/configurations/acceptancedeadline',
            },
            {
                aclCode: 'configuration_finance',
                key: 'configurationfinance',
                label: t('menu:Finance'),
                url: '/configurations/finance',
            },
            {
                aclCode: 'configuration_vendor_portal',
                key: 'configurationvendorportal',
                label: t('menu:Vendor'),
                url: '/configurations/vendorportal',
            },
            {
                aclCode: 'configuration_tada',
                key: 'configurationtada',
                label: t('menu:TADA'),
                url: '/configurations/tada',
            },
            {
                aclCode: 'configuration_user',
                key: 'configurationuser',
                label: t('menu:User'),
                url: '/configurations/configurationuser',
            },
            {
                aclCode: 'configuration_notification',
                key: 'notification',
                label: t('menu:Notification'),
                url: '/configurations/notification',
            },
            {
                aclCode: 'configuration_open_api',
                key: 'configurationopenapi',
                label: t('menu:Open_API'),
                url: '/configurations/openapi',
            },
            {
                aclCode: 'configuration_automation',
                key: 'configurationautomation',
                label: t('menu:Automation'),
                url: '/configurations/automation',
            },
            {
                aclCode: 'configuration_email_templates',
                key: 'configurationemailtemplates',
                label: t('menu:Email_Templates'),
                url: '/configurations/emailtemplates',
            },
            {
                aclCode: 'oms_lite_cancel_reason',
                key: 'cancelreason',
                label: t('menu:Cancel_Reason'),
                url: '/configurations/cancelreason',
            },
        ],
    },
];
