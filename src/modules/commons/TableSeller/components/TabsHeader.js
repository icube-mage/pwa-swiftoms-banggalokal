/* eslint-disable eqeqeq */
import clsx from 'clsx';
import { useTranslation } from '@i18n';

import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@common_button';

import TableFilters from '@common_tableseller/components/TableFilters';
import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import useStyles from '@common_tableseller/style';

const TabsHeader = (props) => {
    const {
        header = '',
        searchPlaceholder = '',
        hideTitle = false,
        hideToolbar = false,
        hideSearch = false,
        hideFilters = false,
        toolActionsRight = [],
        toolActionsLeft = [],
        handleReset,
        filters = [],
        setFilters,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        dataTab = [],
        valueTab,
        onChangeTab,
        separateTab = false,
    } = props;
    const { t } = useTranslation('common');
    const classes = useStyles();

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);
    return (
        <Paper className={clsx(classes.paperHead, separateTab && 'separate')}>
            {!hideTitle
                    && (
                        <div className={clsx(classes.header, 'nopad')}>
                            {header}
                        </div>
                    )}
            <Tabs data={dataTab} onChange={onChangeTab} value={valueTab} allItems={false} topTable={!separateTab} />
            {!hideToolbar
                    && (
                        <div className={classes.tableToolbar}>
                            <div className="top-buttons-wrapper nopad">
                                <div className="top-item-left">
                                    {!hideSearch
                                        && (
                                            <div className="top-item">
                                                <TextField
                                                    name="email"
                                                    placeholder={searchPlaceholder}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className={clsx(classes.textInput, !toolActionsLeft.length && 'full')}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.keyCode == 13) {
                                                            fetchRows();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}

                                    {toolActionsLeft.length
                                        ? (
                                            <div className="top-item-right">
                                                {toolActionsLeft.map((component) => (
                                                    <div className="top-item">
                                                        {component}
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                        : null}
                                </div>
                                <div className="top-item-right">
                                    {toolActionsRight.length
                                        ? (toolActionsRight.map((component) => (
                                            <div className="top-item">
                                                {component}
                                            </div>
                                        ))
                                        )
                                        : null}
                                    {!hideFilters && !!filters.length
                                        && (
                                            <div className="top-item">
                                                <Button
                                                    className={clsx(classes.btnAction, 'filter')}
                                                    onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                                                    endIcon={
                                                        <KeyboardArrowRightIcon className={getArrowClass(expandedToolbar)} />
                                                    }
                                                >
                                                    <span className={classes.btnText}>
                                                        {t('common:Filters')}
                                                    </span>
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className={classes.expandContainer}>
                                <Collapse in={expandedToolbar === 'filters'}>
                                    <TableFilters
                                        initialFilters={filters}
                                        setParentFilters={setFilters}
                                        handleReset={handleReset}
                                        t={t}
                                    />
                                </Collapse>
                            </div>
                        </div>
                    )}
        </Paper>
    );
};

export default TabsHeader;
