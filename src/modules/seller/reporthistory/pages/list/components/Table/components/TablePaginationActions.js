import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '@i18n';
import useStyles from '@sellermodules/reporthistory/pages/list/components/Table/style';

import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';

import { useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Pagination from '@material-ui/lab/Pagination';

const TablePaginationActions = (props) => {
    const { t } = useTranslation('common');
    const classes = useStyles();
    const theme = useTheme();
    const {
        count, page, rowsPerPage, onPageChange,
    } = props;

    const isDesktop = breakPointsUp('md');

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <div className={classes.paginationRoot} style={{ justifyContent: 'end' }}>
            <Button
                className={classes.btnPagination}
                style={{ paddingLeft: 6 }}
                onClick={handleBackButtonClick}
                disabled={page === 1}
                aria-label={t('common:previous_page')}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
            <Pagination
                className={classes.paginationAction}
                page={page}
                onChange={onPageChange}
                count={Math.ceil(count / rowsPerPage)}
                variant="outlined"
                shape="rounded"
                hidePrevButton
                hideNextButton
                size={isDesktop ? 'medium' : 'small'}
            />
            <Button
                className={classes.btnPagination}
                style={{ paddingRight: 6 }}
                onClick={handleNextButtonClick}
                disabled={page === Math.ceil(count / rowsPerPage)}
                aria-label={t('common:next_page')}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
        </div>
    );
};

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
