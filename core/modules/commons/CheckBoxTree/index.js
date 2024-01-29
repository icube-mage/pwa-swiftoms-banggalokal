// checkbox tree by https://github.com/jakezatecky/react-checkbox-tree
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFolder, faFolderOpen, faFile,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import CheckboxTreeCustom from '@common_checkboxtree/lib/CheckboxTree';
import { useState } from 'react';
import { useTranslation } from '@i18n';

const CheckboxTree = (props) => {
    const { t } = useTranslation('common');
    const {
        nodes, checked, onCheck, ...res
    } = props;
    const [expanded, setExpanded] = useState([]);
    return (
        <div style={{ margin: '10px 0px' }}>
            <CheckboxTreeCustom
                checkModel="all"
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={onCheck}
                onExpand={(ex) => setExpanded(ex)}
                icons={{
                    check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare} />,
                    uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare} />,
                    halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={faCheckSquare} />,
                    expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faChevronRight} />,
                    expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faChevronDown} />,
                    expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={faPlusSquare} />,
                    collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={faMinusSquare} />,
                    parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon={faFolder} />,
                    parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon={faFolderOpen} />,
                    leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon={faFile} />,
                }}
                allowParentOnlyChecked
                {...res}
            />
        </div>
    );
};

export default CheckboxTree;
export * from '@common_checkboxtree/lib/utils';
