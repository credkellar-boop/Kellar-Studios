const fs = require('fs');
function generateReport(filename, data) {
    fs.writeFileSync(`${filename}_QC_REPORT.txt`, JSON.stringify(data, null, 2));
}
module.exports = { generateReport };
