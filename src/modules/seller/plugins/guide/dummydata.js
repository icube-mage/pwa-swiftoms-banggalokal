import { useTranslation } from '@i18n';

const DummyResponse = () => {
    const { t } = useTranslation(['guide']);

    const response = {
        HOMEPAGE: {
            data: [
                {
                    element: '#guide-catalog',
                    title: `${t('guide:homepage_title_a')}`,
                    intro: `${t('guide:homepage_step_a')}`,
                    position: 'right',
                },
                {
                    element: '#guide-sales',
                    title: `${t('guide:homepage_title_b')}`,
                    intro: `${t('guide:homepage_step_b')}`,
                    position: 'right',
                },
                {
                    element: '#guide-boxcard',
                    title: `${t('guide:homepage_title_c')}`,
                    intro: `${t('guide:homepage_step_c')}`,
                    position: 'right',
                },
            ],
        },
        ORDER: {
            data: [
                {
                    element: '#namaID',
                    title: 'text title here',
                    intro: 'Anda dapat berbelanja berdasarkan kategori produk, atau berbelanja berdasarkan distributor.',
                    position: 'bottom',
                },
                {
                    element: '#namaID',
                    title: 'text title here',
                    intro: 'Atau gunakan kolom pencarian untuk mencari produk dengan kata kunci.',
                    position: 'right',
                },
            ],
        },
        SEARCH: {
            data: [
                {
                    element: 'div[class*="xsDown"] #guide-search',
                    hint: `${t('guide:hint_search')}`,
                    hintPosition: 'middle-middle',
                },
                {
                    element: 'div[class*="smUp"] #guide-search-mobile',
                    hint: `${t('guide:hint_search')}`,
                    hintPosition: 'middle-middle',
                },
            ],
        },
    };

    return response;
};

export default DummyResponse;
