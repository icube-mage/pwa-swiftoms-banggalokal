import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '@common_tableseller/style';
import Button from '@common_button/index';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from '@i18n';
import { breakPointsUp } from '@helper_theme';

const TablePaginationActions = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
}) => {
    const { t } = useTranslation('common');
    const classes = useStyles();
    const isDesktop = breakPointsUp('md');

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <div className={classes.paginationRoot}>
            <Button
                classic
                className="button-pagination-prev"
                bg="transparent"
                padding="0"
                onClick={handleBackButtonClick}
                disabled={page === 1}
                classicButtonIcon={(
                    <img
                        src="/assets/img/icon_pagination_left.svg"
                        alt="icon pagination left"
                        style={{ marginRight: 0 }}
                    />
                )}
            />
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
                classic
                className="button-pagination-next"
                bg="transparent"
                padding="0"
                onClick={handleNextButtonClick}
                disabled={page === Math.ceil(count / rowsPerPage)}
                aria-label={t('common:next_page')}
                classicButtonIcon={
                    <img src="/assets/img/icon_pagination_right.svg" alt="icon pagination right" />
                }
            />
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
