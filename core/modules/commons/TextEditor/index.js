/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = function () {
        const range = this.quill.getSelection(true);
        const value = this.textbox.value;
        if (value) {
            this.quill.insertEmbed(range.index, 'image', value, 'user');
        }
    };
    // Called on hide and save.
    tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Image URL';
}

const TextEditor = (props) => {
    const {
        modules = ({
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ align: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' },
                        { indent: '-1' }, { indent: '+1' }],
                    ['link'],
                    ['image'],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        }),
        ...other
    } = props;
    const formats = [
        'header',
        'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align',
        'list', 'indent',
        'link', 'image',
        'alt', 'height', 'width', 'style',
    ];
    return (
        <ReactQuill
            {...other}
            theme="snow"
            modules={modules}
            formats={formats}
        />
    );
};

export default TextEditor;
