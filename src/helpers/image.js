/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
export const urlToBinaryImage = async (url) => {
    try {
        // Fetch the image from the URL
        const response = await fetch(url);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch the image');
        }

        // Convert the image data to a blob
        const blob = await response.blob();

        // Read the blob as data URL (Base64)
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        // Return a Promise to handle the Base64 data when it's ready
        return new Promise((resolve) => {
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result);
                } else {
                    throw new Error('Failed to convert image to Base64');
                }
            };
        });
    } catch (err) {
        console.error('[err] url to binary', err);
        return null; // Handle the error appropriately in your application
    }
};

export const urlToFileObject = async (url, fileName) => {
    try {
        // Fetch the data from the URL
        const response = await fetch(url);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch the URL');
        }

        // Get the response data as a Blob
        const blob = await response.blob();

        // Create a File object with the Blob and specify the file name
        const file = new File([blob], fileName || 'downloadedFile');

        return file;
    } catch (err) {
        console.error('[err] url to file object', err);
        return null; // Handle the error appropriately in your application
    }
};
