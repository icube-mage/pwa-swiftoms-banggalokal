/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@common_button';
import Checkbox from '@common_checkbox';
import TextField from '@common_textfield/index';
import FilterChannel from '@sellermodules/catalog/pages/list/components/Table/components/FilterChannel';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';
import ExpandFilter from '@sellermodules/catalog/pages/list/components/Table/components/ExpandFilter';
import ExpandTabMobile from '@sellermodules/catalog/pages/list/components/Table/components/ExpandTabMobile';
import { breakPointsUp } from '@helper_theme';
import { useRouter } from 'next/router';

const FilterDialog = (props) => {
    const { anchorEl, setAnchorEl, children } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    if (!isDesktop) {
        return (
            <Dialog open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        );
    }

    return (
        <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} className={classes.filterPopper}>
            {children}
        </Popper>
    );
};

const TabsHeader = (props) => {
    const {
        search, setSearch, setFilters, t,
        searchPlaceholder = '',
        statusSync, setStatusSync,
        catalogStatus, sellerChannel,
        setSellerChannel,
        tabsMenu,
    } = props;

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isDesktop = breakPointsUp('sm');
    const router = useRouter();

    const handleClickOpenButton = (event, set) => {
        set(anchorEl ? null : event.currentTarget);
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown)

    const filterStatus = [
        {
            value: "active",
            label: t(`queue_active`),
        },
        {
            value: "queue",
            label: t(`queue_queue`),
        },
        {
            value: "failed",
            label: t(`queue_failed`),
        }
    ];

    const isMultiCheckbox = (source,value) => {
        return source.includes(value);
    };

    return (
        <Paper className={classes.paperHead}>
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                        <TextField
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={clsx(classes.textInput, 'full')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        </div>
                    </div>
                    
                    <div className="top-item-right hidden-mobile">                                              
                        <div style={{ display: 'flex' }}>
                            <FilterChannel {...props}/>                          
                            {catalogStatus === 'list' && (
                                <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                                    <div className="top-item right-0">
                                        <Button
                                            className={clsx(classes.btnFilter, 'gray')}
                                            onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                            endIcon={
                                                <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                            }
                                        >
                                            {t('Sync_Status')}
                                        </Button>
                                        <FilterDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                                            <div className="filter-container">
                                                <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                    <span style={{ fontWeight: 'bold', marginBottom: 10, textTransform: 'capitalize' }}>
                                                        {t('Sync_Status')}
                                                    </span>
                                                    {filterStatus.map((v) => (
                                                        <Checkbox
                                                            key={v.value}
                                                            name={v.value}
                                                            label={v.label}
                                                            checked={isMultiCheckbox(statusSync, v.value)}
                                                            setChecked={(e) => {
                                                                let tmpStatusSync = statusSync || [];
                                                                if (e?.target?.checked) {
                                                                    tmpStatusSync.push(v.value);
                                                                } else {
                                                                    delete tmpStatusSync[tmpStatusSync.indexOf(v.value)];
                                                                }
                                                                setStatusSync(tmpStatusSync.filter((e) => e.length > 0));
                                                            }}
                                                            className={classes.checkboxOption}
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            icon={<span className={classes.icon} />}
                                                        />
                                                    ))}
                                                </div>                                                                                       
                                            </div>
                                        </FilterDialog>
                                    </div>
                                </ClickAwayListener>
                            )}
                        </div>                        
                    </div>
                    
                </div>                
                <div className={classes.expandContainer}>
                    <Collapse in={statusSync?.length > 0 || sellerChannel?.length ||  ((!isDesktop && catalogStatus !== 'all') && tabsMenu)}>
                        <div className={classes.expandGrid}>
                            <Button className={classes.btnFilterText} onClick={() => {
                                setStatusSync([]);
                                setSearch('');
                                setFilters([]);
                                setSellerChannel([]);
                                router.push('/seller/catalog');
                            }}>
                                {t('common:Reset_Filter')}
                            </Button>
                            <Grid container spacing={3} alignContent="center" alignItems="center" style={{ marginTop: 0 }}>
                                { statusSync.map((x) => (
                                    <Grid item className="filter-item" xs="auto">                                
                                        { t(`queue_${x}`)}
                                        <IconButton className={classes.closeButton} onClick={() => {
                                            delete statusSync[statusSync.indexOf(x)];                                        
                                            setStatusSync(statusSync.filter((e) => e.length > 0));
                                        }}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}

                                <ExpandFilter {...props} />
                                {(!isDesktop && catalogStatus !== 'all' ) && <ExpandTabMobile {...props} /> }
                            </Grid>
                        </div>
                    </Collapse>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
