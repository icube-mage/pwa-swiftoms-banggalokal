/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NestedMenuItem from 'material-ui-nested-menu-item';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Button from '@common_button';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';

import useStyles from '@sellermodules/promotion/pages/bundling/list/components/Table/style';
import { useDebounce } from '@sellermodules/promotion/pages/bundling/list/components/Table/helpers';

const dataStatus = [
    {
        label: 'In Progress',
        value: 'in_progress',
    },
    {
        label: 'Upcoming',
        value: 'upcoming',
    },
    {
        label: 'Canceled',
        value: 'canceled',
    },
    {
        label: 'Expire',
        value: 'expire',
    },
];

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filterBundle, setFilterBundle] = React.useState({ status: [] });
    const debouncedFilterStatus = useDebounce(filterBundle.status, 100);

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const handleChecked = (check, v, filterName) => {
        switch (filterName) {
        case 'status':
            if (check) {
                return setFilterBundle((prev) => ({ ...prev, status: [...prev.status, v] }));
            }
            return setFilterBundle((prev) => ({ ...prev, status: prev.status.filter((p) => p.value !== v.value) }));
        default:
            return null;
        }
    };

    const insertFilter = (field, array = []) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        const temp = [...array];
        if (index >= 0) {
            temp.splice(index, 1, field);
        } else {
            temp.push(field);
        }
        return temp;
    };

    React.useEffect(() => {
        const tempStatus = {
            field: 'bundle_status',
            name: 'bundle_status',
            type: 'in',
            value: [],
        };
        let temp = [...filters];

        filterBundle.status.forEach((z) => {
            tempStatus.value = [...tempStatus.value, z.value];
        });
        temp = insertFilter(tempStatus, temp);

        setFilters([...temp]);
    }, [debouncedFilterStatus]);

    return (
        <Paper className={classes.paperHead}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>
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
                        <div className="top-item">
                            <Button
                                id="button-filter"
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                }
                            >
                                {t('sellercatalog:Filter')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                className={classes.menuAction}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                MenuListProps={{ onMouseLeave: () => setAnchorEl(null) }}
                            >
                                <NestedMenuItem
                                    label="Status"
                                    parentMenuOpen
                                    className={clsx(classes.menuItem, 'parent')}
                                    keepMounted
                                >
                                    {dataStatus?.map((status) => (
                                        <MenuItem key={status.value} className={classes.menuItem}>
                                            <Checkbox
                                                id="check-filter-status"
                                                name={status.label}
                                                label={status.label}
                                                checked={!!filterBundle.status.find((stat) => stat.value === status.value)}
                                                setChecked={(e) => handleChecked(e.target.checked, status, 'status')}
                                                className={classes.checkboxOption}
                                            />
                                        </MenuItem>
                                    ))}
                                </NestedMenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className="top-item-right">
                        <div className="top-item">
                            <Button
                                id="button-make"
                                className={classes.btnAdd}
                                onClick={() => router.push('/seller/promotion/bundling/create')}
                                startIcon={
                                    <img src="/assets/img/add.svg" alt="add-icon" />
                                }
                            >
                                <Link href="/seller/promotion/bundling/create">
                                    {t('sellerpromotion:Make_a_Bundle')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
