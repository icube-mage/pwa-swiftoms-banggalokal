/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-await-in-loop */
/* eslint-disable array-callback-return */
import React from 'react';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@common_button/index';
import Checkbox from '@common_checkbox/index';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import FormChannel from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannel/index';
import { BLACK, WHITE } from '@theme_color';
import { conversionKilogramToGram, isValidJSON } from '@helper_text';

const createVariantData = (dataAttribute, menuVariant) => {
    const variants = [];
    let variant_table = null;
    const image_exist = [];

    if (dataAttribute !== undefined) {
        dataAttribute?.forEach((data) => {
            const { attributes } = data;
            attributes?.forEach((att) => {
                const variant = menuVariant.find((menu) => menu.attribute_id === att.attribute_id);
                const choosen = variant?.attribute_options?.find((o) => o.value === att.attribute_value);
                if (choosen) {
                    if (!variants.find((vr) => vr.attribute_id === variant.attribute_id)) {
                        variants.push({ ...variant, attribute_choosen: [{ ...choosen, image: data.images?.[0]?.url || '' }] });
                    } else {
                        const idxExist = variants.findIndex((vr) => vr.attribute_id === variant.attribute_id);
                        if (idxExist >= 0) {
                            const existChoosen = variants[idxExist].attribute_choosen.find((opt) => opt.value === choosen.value);
                            if (!existChoosen) {
                                variants[idxExist] = {
                                    ...variants[idxExist],
                                    attribute_choosen: [
                                        ...variants[idxExist].attribute_choosen,
                                        { ...choosen, image: data.images?.[0]?.url || '' },
                                    ],
                                };
                            }
                        }
                    }
                }
            });
        });

        variant_table = dataAttribute?.map((data) => {
            let objReturn = {
                id: data?.entity_id,
                price: new Intl.NumberFormat('en-US').format(data?.price),
                sku: data?.vendor_sku,
                skuDefault: data?.sku,
                weight: data?.weight,
                status: data?.status === 1,
                image: data.images?.[0]?.url || '',
            };
            image_exist.push(data.images?.[0]);
            const combinedType = data.attributes?.map((att) => {
                const option = menuVariant?.find((menu) => menu.attribute_id === att.attribute_id)?.attribute_options;
                const selected = option?.find((o) => o.value === att.attribute_value);
                return selected?.label;
            });

            objReturn.combined_key = [...combinedType].sort().join('-');

            const mappedType = [];
            data.attributes?.forEach((att) => {
                const option = menuVariant?.find((menu) => menu.attribute_id === att.attribute_id)?.attribute_options;
                const selected = option?.find((o) => o.value === att.attribute_value)?.label;
                mappedType.push([att.attribute_code || att.attribute_label?.toLowerCase().replaceAll(' ', '_'), selected]);
            });
            objReturn = {
                ...objReturn,
                ...Object.fromEntries(mappedType),
            };

            return objReturn;
        });
    }

    return { variants, variant_table, image_exist };
};

const StoreTab = ({ listDataChannel, setListDataChannelGroup }) => {
    const onClickItemList = ({ key, listDataChannel }) => {
        const tempListDataChannel = {};
        for (const tempListIndex in listDataChannel) {
            const tempListItem = listDataChannel[tempListIndex];
            tempListDataChannel[tempListIndex] = {
                ...tempListItem,
                status: tempListIndex === key,
            };
        }
        setListDataChannelGroup(tempListDataChannel);
    };

    if (listDataChannel === null) return null;
    return (
        <ul>
            {
                Object.keys(listDataChannel)?.map((item, index) => {
                    const channelItem = listDataChannel[item];
                    const channelIcon = channelItem?.icon;
                    const channelStatus = channelItem?.status ?? false;
                    return (
                        <li key={`channel-list-item-${index}`}>
                            <button
                                type="button"
                                className={clsx({ active: channelStatus })}
                                onClick={() => onClickItemList({
                                    index, key: item, listDataChannel, item: channelItem,
                                })}
                            >
                                <img src={channelIcon} alt="icon marketplace" />
                                <span>{channelItem?.name}</span>
                            </button>
                        </li>
                    );
                })
            }
        </ul>
    );
};

const StoreTabContent = ({ radio, listDataChannel, setListDataChannelGroup }) => {
    const onClickItemListContent = ({ channel, listDataChannel }) => {
        const tempListDataChannel = {};
        for (const tempListIndex in listDataChannel) {
            const tempListItem = listDataChannel[tempListIndex];
            const tempListItemStore = tempListItem.stores;
            const tempStores = [];
            for (const tempListStoreIndex in tempListItemStore) {
                const tempListStoreItem = tempListItemStore[tempListStoreIndex];
                if (tempListStoreItem.code === channel.code) {
                    tempStores.push({
                        ...tempListStoreItem,
                        checked: !tempListStoreItem?.checked,
                    });
                } else {
                    tempStores.push(tempListStoreItem);
                }
            }
            tempListDataChannel[tempListIndex] = {
                ...tempListItem,
                stores: tempStores,
            };
        }

        setListDataChannelGroup(tempListDataChannel);
    };

    const onClickItemListContentRadio = ({ e, listDataChannel }) => {
        const selectedValue = e.target.value;
        const getSelectedValue = isValidJSON(selectedValue) ? JSON.parse(selectedValue) : null;

        const tempListDataChannel = {};
        for (const tempListIndex in listDataChannel) {
            const tempListItem = listDataChannel[tempListIndex];
            const tempListItemStore = tempListItem.stores;
            const tempStores = [];
            for (const tempListStoreIndex in tempListItemStore) {
                const tempListStoreItem = tempListItemStore[tempListStoreIndex];
                if (tempListStoreItem.code === getSelectedValue.code) {
                    tempStores.push({
                        ...tempListStoreItem,
                        checked: true,
                    });
                } else {
                    tempStores.push({
                        ...tempListStoreItem,
                        checked: false,
                    });
                }
            }
            tempListDataChannel[tempListIndex] = {
                ...tempListItem,
                stores: tempStores,
            };
        }
        setListDataChannelGroup(tempListDataChannel);
    };

    if (radio) {
        return listDataChannel && Object?.keys(listDataChannel)?.map((item, index) => {
            const channelItem = listDataChannel[item];
            const channelStatus = channelItem?.status ?? false;
            const channelStores = channelItem?.stores ?? [];
            if (!channelStatus) return null;
            return (
                <RadioGroup
                    aria-label="channel"
                    name="channel"
                    onChange={(e) => onClickItemListContentRadio({
                        e,
                        index,
                        key: item,
                        item: channelItem,
                        listDataChannel,
                    })}
                >
                    {
                        channelStores.map((channel, channelIndex) => {
                            const { is_can_create_product } = channel;
                            if (!is_can_create_product) return null;
                            return (
                                <FormControlLabel
                                    checked={channel?.checked ?? false}
                                    key={`channel-item-${channelIndex}`}
                                    disabled={channel?.disabled}
                                    value={JSON.stringify(channel)}
                                    control={<Radio />}
                                    label={channel?.name ?? '-'}
                                />
                            );
                        })
                    }
                </RadioGroup>
            );
        });
    }

    return listDataChannel && Object?.keys(listDataChannel)?.map((item, index) => {
        const channelItem = listDataChannel[item];
        const channelStatus = channelItem?.status ?? false;
        const channelStores = channelItem?.stores ?? [];
        if (!channelStatus) return null;
        return channelStores.map((channel, channelIndex) => (
            <div className="channel-item" key={`channel-item-${channelIndex}`}>
                <Checkbox
                    disabled={channel?.disabled}
                    label={channel?.name ?? '-'}
                    checked={channel?.checked ?? false}
                    setChecked={() => onClickItemListContent({
                        index,
                        key: item,
                        item: channelItem,
                        channel,
                        listDataChannel,
                    })}
                />
            </div>
        ));
    });
};

const FormAssignProductChannel = (props) => {
    const {
        t,
        isParentLoadingState,
        productId,
        listDataChannel,
        listDataChannelProduct,
        selectedChannel,
        setSelectedChannel,
        setLoadingFormAssign,
    } = props;
    const mount = React.useRef(null);
    const [listDataChannelGroup, setListDataChannelGroup] = React.useState(null);
    const [showFormChannel, setShowFormChannel] = React.useState(false);

    const { data, loading } = gqlService.getSellerProduct({ id: Number(productId) });
    const { data: dataAtt, loading: loadingAtt } = gqlService.getSellerProductVariantItems({ id: Number(productId) });
    const { data: dataVariant, loading: loadingVariant } = gqlService.getSellerVariantAttributes();
    const {
        variants: initVariants,
        variant_table: initVariantTable,
    } = createVariantData(dataAtt?.getSellerProductVariantItems, dataVariant?.getSellerVariantAttributes);
    const isLoading = isParentLoadingState || loading || loadingAtt || loadingVariant;

    const dataMasterProduct = {
        // form-information
        name: data?.getSellerProduct?.name ?? '',
        sku: data?.getSellerProduct?.sku ?? '',
        price: new Intl.NumberFormat('en-US').format(data?.getSellerProduct?.price ?? 0),
        images: data?.getSellerProduct?.images || [],
        description: data?.getSellerProduct?.description || '',
        // form-variants
        is_variant: !!initVariants?.length,
        variants: initVariants?.length ? initVariants : [{}],
        variant_table: initVariantTable,
        existing_variants: initVariantTable,
        weight: conversionKilogramToGram(data?.getSellerProduct?.weight) || 0,
        dimension_package_height: data?.getSellerProduct?.dimension_package_height || '',
        dimension_package_length: data?.getSellerProduct?.dimension_package_length || '',
        dimension_package_width: data?.getSellerProduct?.dimension_package_width || '',
        vendor_sku: data?.getSellerProduct?.vendor_sku || '',
        types: data?.getSellerProduct?.images?.[0]?.types || [],
    };

    const selectedStoreCount = React.useMemo(() => {
        let totalStore = 0;
        if (listDataChannelGroup !== null) {
            Object.keys(listDataChannelGroup)?.map((item) => {
                const channel = listDataChannelGroup[item];
                const channelStores = channel.stores;
                channelStores.map((store) => {
                    const isChecked = store?.checked ?? false;
                    if (isChecked) {
                        totalStore += 1;
                    }
                });
            });
        }
        return totalStore;
    }, [listDataChannelGroup]);

    const onGroupingListDataChannel = () => {
        const grouped = listDataChannel.reduce((result, item, index) => {
            if (!result[item.marketplace_code]) {
                result[item.marketplace_code] = {
                    index,
                    status: index === 0,
                    icon: item.image_url,
                    name: item?.marketplace?.marketplace_name ?? '-',
                    stores: [],
                };
            }

            const listChannelExist = listDataChannelProduct?.find((itemChannel) => itemChannel.code === item?.channel_code);
            const isChannelExist = !listChannelExist ? false : Object.keys(listChannelExist).length > 0;
            result[item.marketplace_code].icon = item.image_url;
            result[item.marketplace_code].stores.push({
                checked: false,
                disabled: isChannelExist,
                name: item.channel_name,
                code: item.channel_code,
                icon: item.image_url,
                marketplace_code: item.marketplace_code,
                is_can_create_product: item?.channel_capability?.can_create_product ?? true,
            });
            return result;
        }, {});

        const entries = Object.entries(grouped);
        entries.sort((a, b) => a[1].index - b[1].index);
        const sortedObject = Object.fromEntries(entries);
        setListDataChannelGroup(sortedObject);
    };

    const onSelectStore = () => {
        setShowFormChannel(true);
        Object.keys(listDataChannelGroup)?.map((item) => {
            const channel = listDataChannelGroup[item];
            const channelStores = channel.stores;
            channelStores.map((store) => {
                const isChecked = store?.checked ?? false;
                if (isChecked) {
                    setSelectedChannel(store);
                }
            });
        });
    };

    React.useEffect(() => {
        mount.current = true;
        if (mount.current) {
            onGroupingListDataChannel();
        }
        return () => {
            mount.current = false;
        };
    }, []);

    /**
    * ---------------------------------------------------- *
    * @dependency [isLoading]
    * @summary loading listener
    * ---------------------------------------------------- *
    */
    React.useEffect(() => {
        setLoadingFormAssign(isLoading);
    }, [isLoading]);

    if (isLoading) return null;

    if (showFormChannel) {
        return (
            <FormChannel
                {...props}
                isFormAssignProduct
                formAssignProductSelectedChannel={selectedChannel}
                formAssignProductDataMaster={dataMasterProduct}
                formAssignSetShowFormChannel={setShowFormChannel}
            />
        );
    }

    return (
        <div className="form-channel-product-assign">
            <div className="content">
                <div className="content-left">
                    <StoreTab
                        listDataChannel={listDataChannelGroup}
                        setListDataChannelGroup={setListDataChannelGroup}
                    />
                </div>
                <div className="content-right">
                    <StoreTabContent
                        radio
                        listDataChannel={listDataChannelGroup}
                        setListDataChannelGroup={setListDataChannelGroup}
                        setSelectedChannel={setSelectedChannel}
                    />
                </div>
            </div>
            <div className="footer">
                <div className="content-footer-button">
                    <Button
                        classic
                        bg="transparent"
                        border={0}
                        color={BLACK}
                        classicButtonLabel={t('common:selected_store', { storeCount: selectedStoreCount })}
                    />
                    <Button
                        classic
                        border={0}
                        color={WHITE}
                        classicButtonLabel={t('common:select_store')}
                        classicButtonOnClick={onSelectStore}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormAssignProductChannel;
