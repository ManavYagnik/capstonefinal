const fs = require('fs-extra');
directoryPath='wallet'
fs.remove(directoryPath, (err) => {
    if (err) {
        console.error('Error removing wallet directory:', err);
    } else {
        console.log('Wallet directory removed successfully.');
    }
});