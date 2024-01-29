/* eslint-disable import/prefer-default-export */
export const optionsPickPack = (t) => [
    {
        aclCode: 'header_pick_pack',
        key: 'pickpack',
        label: t('menu:Pick_And_Pack'),
        children: [
            {
                aclCode: 'pick_by_wave_list',
                key: 'wavelist',
                label: t('menu:Pick_List'),
                url: '/pickpack/wavelist',
            },
            {
                aclCode: 'pick_by_wave_create',
                key: 'wavecreate',
                label: t('menu:Create_Pick_by_Wave'),
                url: '/pickpack/wavecreate',
            },
            {
                aclCode: 'pick_by_wave_packlist',
                key: 'wavepack',
                label: t('menu:Pack_List'),
                url: '/pickpack/wavepack',
            },
            {
                aclCode: 'pick_by_batch_list',
                key: 'batchlist',
                label: t('menu:Batch_List'),
                url: '/pickpack/batchlist',
            },
            {
                aclCode: 'pick_by_batch_create',
                key: 'batchcreate',
                label: t('menu:Create_Pick_By_Batch'),
                url: '/pickpack/batchcreate',
            },
            {
                aclCode: 'pick_by_batch_packlist',
                key: 'batchpack',
                label: t('menu:Pack_List'),
                url: '/pickpack/batchpack',
            },
        ],
    },
];
