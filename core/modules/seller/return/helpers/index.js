/* eslint-disable import/prefer-default-export */
export const stepNumber = (code) => {
    switch (code) {
    case 'pending_approval':
        return 0;
    case 'approved':
        return 1;
    case 'package_sent':
        return 2;
    case 'package_received':
        return 3;
    case 'processing':
        return 4;
    case 'complete':
        return 5;
    case 'rejected':
        return 6;
    case 'canceled':
        return 7;
    default:
        return 0;
    }
};

export const nextStep = (code) => {
    switch (code) {
    case 'pending_approval':
        return 'approved';
    case 'approved':
    case 'package_sent':
        return 'package_received';
    case 'processing':
        return 'complete';
    default:
        return 'approved';
    }
};
