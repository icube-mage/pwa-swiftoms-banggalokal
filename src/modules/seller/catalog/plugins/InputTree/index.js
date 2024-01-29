/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from '@sellermodules/catalog/plugins/InputTree/style';
import useStylesInput from '@sellermodules/catalog/plugins/Input/style';
import TextField from '@common_textfield/index';
import Button from '@common_button/index';
import classNames from 'classnames';
import { BLACK, WHITE, PRIMARY } from '@theme_color';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinearProgress from '@material-ui/core/LinearProgress';

const InputTree = (props) => {
    const {
        t, label, labelKey, formik, name, placeholder, onSelectSearchChange, setIsDirty, treeData, treeLoading, setTreeData,
    } = props;
    const styles = useStyles();
    const stylesInput = useStylesInput();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedItemChildren, setSelectedItemChildren] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [breadcrumbSelectedValue, setBreadcrumbSelectedValue] = useState('');
    const isErrorCategory = formik.touched[name] && formik.errors[name];

    const padding = 30;
    const selectedLabel = formik.values[name] ? formik.values[name][labelKey] : placeholder;
    const isDisableSaveButton = selectedValue.length > 0 ? !!selectedValue[selectedValue.length - 1].children && selectedItemChildren.length : true;
    const isHasParent = selectedValue.length > 0 ? !!treeData.find((dt) => dt.key === selectedValue[0].key) : false;

    // handle close
    const handleClose = () => {
        setOpen(false);
        // set to no data
        setSelectedValue([]);
        setSelectedItemChildren([]);
        setSearch('');
        if (setTreeData) {
            setTreeData([]);
        }
    };

    // handle save
    const handleSave = () => {
        if (!isDisableSaveButton) {
            const finalValue = selectedValue[selectedValue.length - 1].value;
            if (finalValue) {
                formik.setFieldValue(name, finalValue);
            }
            handleClose();
        }
    };

    // handle select value in tree list
    const handleSelectItem = (value) => {
        if (value.tree === 0) {
            setSelectedValue([value]);
            if (value.children) {
                setSelectedItemChildren([value.children]);
            } else {
                setSelectedItemChildren([]);
            }
        } else {
            const sliceValue = selectedValue.slice(0, value.tree);
            setSelectedValue([...sliceValue, value]);

            const sliceItemChildren = selectedItemChildren.slice(0, value.tree);
            if (value.children) {
                setSelectedItemChildren([...sliceItemChildren, value.children]);
            } else {
                setSelectedItemChildren(sliceItemChildren);
            }
        }
    };

    // category item component
    const CategoryItem = ({ item, selected, tree = 0 }) => {
        const isSelected = selected[tree] ? selected[tree].key === item.key : false;
        const listItemStyle = isSelected ? styles.listItemSelected : styles.listItem;
        const iconColor = isSelected ? PRIMARY : BLACK;
        return (
            <ListItem
                key={`item-${item.key}`}
                classes={{ root: listItemStyle }}
                onClick={() => {
                    handleSelectItem(item);
                }}
            >
                <ListItemText primaryTypographyProps={{ class: styles.listItemText }} primary={`${item.name}`} />
                {item.children ? <ChevronRightIcon color={iconColor} /> : <></>}
            </ListItem>
        );
    };

    useEffect(() => {
        if (selectedValue.length > 0) {
            const arrValue = selectedValue.map((itm) => itm.name);
            const stringValue = arrValue.join(' > ');
            setBreadcrumbSelectedValue(stringValue);
        } else {
            setBreadcrumbSelectedValue('');
        }
    }, [selectedValue]);

    return (
        <>
            <div onClick={() => setOpen(true)} className={styles.btnSelectedLabel} aria-hidden="true">
                {selectedLabel}
            </div>
            {isErrorCategory && <span className={styles.spanErr}>{isErrorCategory}</span>}
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth styles={{ paper: styles.paper }}>
                <DialogContent className={styles.titleContainer}>
                    <div className={styles.titleWrapper}>
                        <DialogTitle classes={{ root: styles.titleLabel }}>{label}</DialogTitle>
                        <IconButton aria-label="close" className={styles.btnCLose} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={styles.titleWrapper}>
                        <TextField
                            value={search}
                            placeholder={placeholder}
                            className={classNames(stylesInput.textInput)}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                onSelectSearchChange({ e, name });
                                if (setIsDirty) setIsDirty(true);
                            }}
                        />
                    </div>
                    {treeLoading ? (
                        <div className={styles.loadingWrapper}>
                            <LinearProgress color="secondary" />
                        </div>
                    ) : (
                        <></>
                    )}
                </DialogContent>
                <div className={styles.treeListContainer}>
                    <DialogContent classes={{ root: treeData.length > 0 ? styles.dialogContent : styles.noDataContainer }}>
                        {treeData.length > 0 ? (
                            <List classes={{ root: styles.listContainer }}>
                                {treeData.map((item) => CategoryItem({ item, selected: selectedValue, tree: 0 }))}
                            </List>
                        ) : (
                            <div className={styles.noDataWrapper}>
                                {search.length < 3 ? t('common:searching_category') : treeLoading ? t('common:Loading') : t('common:No_data_found')}
                            </div>
                        )}

                        {isHasParent
                            && selectedItemChildren.map((child, index) => (
                                <List classes={{ root: styles.listContainer }}>
                                    {child?.map((item) => CategoryItem({ item, selected: selectedValue, tree: index + 1 }))}
                                </List>
                            ))}
                    </DialogContent>
                </div>
                <DialogActions classes={{ root: styles.footerModalContainer }}>
                    {selectedValue.length > 0 || selectedLabel !== placeholder ? (
                        <div className={styles.breadcrumbWrapper}>
                            <span className={styles.breadcrumbLabel}>{`${t('common:selected')} : `}</span>
                            <span className={styles.breadcrumbValue}>{selectedValue.length > 0 ? breadcrumbSelectedValue : selectedLabel}</span>
                        </div>
                    ) : (
                        <div className={styles.breadcrumbWrapper}>
                            <span className={styles.breadcrumbLabel}>{`${t('common:selected')} : `}</span>
                            <span className={styles.breadcrumbValue}>...</span>
                        </div>
                    )}

                    <div className={styles.btnBottomWrapper}>
                        <Button
                            classicButtonLabel={t('common:btn_cancel')}
                            className="btn-cancel"
                            bg={WHITE}
                            color={BLACK}
                            border={1}
                            classic
                            paddingLeft={padding}
                            paddingRight={padding}
                            classicButtonOnClick={handleClose}
                        />
                        <Button
                            classicButtonLabel={t('common:Save')}
                            className="btn-next"
                            classic
                            paddingLeft={padding}
                            paddingRight={padding}
                            classicButtonOnClick={handleSave}
                            disabled={isDisableSaveButton}
                        />
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InputTree;
