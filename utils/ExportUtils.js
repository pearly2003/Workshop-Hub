import * as XLSX from 'xlsx';

/**
 * @param {Array} data - The array of objects to export.
 * @param {string} fileName - The name of the file (without extension).
 * @param {string} sheetName - The name of the sheet.
 */
export const exportToExcel = (data, fileName = 'ExportData', sheetName = 'Sheet1') => {
  if (!data || data.length === 0) {
    console.warn("No data provided for export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
