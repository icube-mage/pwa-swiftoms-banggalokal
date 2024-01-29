export const BackdropLoad = (loading) => {
    if (typeof window !== 'undefined') {
        if (loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }
};

export default BackdropLoad;
