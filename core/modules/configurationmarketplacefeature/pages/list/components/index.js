/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import Table from '@common_table';
import Header from '@modules/configurationmarketplacefeature/pages/list/components/Header';
import Button from '@common_button';

const MarketplaceListContent = (props) => {
    const { data, addFeatures, setSelectedFeature, t } = props;
    const marketplaceFeatureList = data.getMarketplaceFeatureList;

    const [checkedState, setCheckedState] = useState(
        marketplaceFeatureList.map((feature) => feature.value.length !== 0 && feature.value !== 'false'),
    );

    const columns = [
        { field: 'label', headerName: t('marketplacefeatureconfiguration:Marketplace_Feature') },
        { field: 'code', headerName: t('marketplacefeatureconfiguration:Marketplace_Feature_Code') },
        { field: 'action', headerName: t('marketplacefeatureconfiguration:Action') },
    ];

    const handleChecked = (idx) => {
        const updatedCheckedState = checkedState.map((item, index) => (index === idx ? !item : item));
        setCheckedState(updatedCheckedState);

        const selectedFeatures = marketplaceFeatureList
            .filter((feature, idxList) => updatedCheckedState[idxList] && !feature?.is_default_disabled)
            .map((feature) => feature.name);
        setSelectedFeature(selectedFeatures);
    };

    React.useEffect(() => {
        handleChecked();
    }, []);

    const rows = marketplaceFeatureList.map((feature, idx) => ({
        ...feature,
        action: (
            <input
                type="checkbox"
                id={`feature-${idx}`}
                name={idx}
                value={idx}
                checked={checkedState?.[idx]}
                disabled={feature?.is_default_disabled}
                onChange={() => handleChecked(idx)}
            />
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table rows={rows} count={rows.length} getRows={() => {}} columns={columns} hideActions hideFilters hideColumns hideFooter />
            <Button style={{ margin: '20px 0px' }} onClick={() => addFeatures()}>
                {t('marketplacefeatureconfiguration:Add_Features')}
            </Button>
        </>
    );
};

export default MarketplaceListContent;
