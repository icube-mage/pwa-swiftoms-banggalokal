/* eslint-disable react/no-danger */

const VersionContent = (props) => {
    const { contentVersion } = props;

    const contentToShow = contentVersion.replaceAll('{', '').replace('}', '').split(',');
    const splitLine = (line) => {
        const newLine = line.replaceAll('"', '');
        return newLine.split(':').join(' : ');
    };

    return (
        <div style={{ padding: '20px 1%', fontFamily: 'monospace' }}>
            <div style={{ marginLeft: 20 }}>
                {contentToShow.map((ver) => (
                    <div>
                        {splitLine(ver)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VersionContent;
