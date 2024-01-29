import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { breakPointsUp } from '@helper_theme';

import useStyles from '@common_tableseller/components/TablePagination/style';

const TablePaginationActions = (props) => {
    const classes = useStyles();
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
        <div className={classes.paginationContainer}>
            <IconButton
                classes={{ root: classes.btnPagination, disabled: classes.btnPaginationDisabled }}
                onClick={handleBackButtonClick}
                disabled={page <= 1}
            >
                <KeyboardArrowLeft />
            </IconButton>
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
                siblingCount={0}
            />
            <IconButton
                classes={{ root: classes.btnPagination, disabled: classes.btnPaginationDisabled }}
                onClick={handleNextButtonClick}
                disabled={page === Math.ceil(count / rowsPerPage)}
            >
                <KeyboardArrowRight />
            </IconButton>
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
