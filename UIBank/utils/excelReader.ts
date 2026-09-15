import { createRequire } from 'module';
import * as path from 'path';
import * as fs from 'fs';

// Force CommonJS resolution module compatibility inside modern Node ES Module environments
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

export class ExcelReader {
    // Aligned to your active Playwright project data storage structure path location
    private static readonly FILE_PATH = "UIBank/test-data/RegistrationData.xlsx";

    private static getWorksheet(): any {
        const absolutePath = path.resolve(process.cwd(), this.FILE_PATH);
        if (!fs.existsSync(absolutePath)) {
            console.error(`[EXCEL ERROR] Excel data file not found at: ${absolutePath}`);
            return null;
        }
        
        const workbook = XLSX.readFile(absolutePath);
        // Explicitly grab array index 0, matching Java's workbook.getSheetAt(0) perfectly
        const firstSheetName = workbook.SheetNames[0]; 
        return workbook.Sheets[firstSheetName];
    }

    /**
     * Reads cell data using row and column coordinates
     * Replaces Java's row.getCell(colNum) + DataFormatter
     */
    public static getCellData(rowNum: number, colNum: number): string {
        try {
            const worksheet = this.getWorksheet();
            if (!worksheet) return "";

            // Convert raw row/col numeric indices into cell codes (e.g., r:0, c:0 -> 'A1')
            const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
            const cell = worksheet[cellAddress];

            return cell && cell.v !== undefined ? String(cell.v).trim() : "";
        } catch (error) {
            console.error(`[EXCEL ERROR] Failed reading cell at Row ${rowNum}, Col ${colNum}:`, error);
            return "";
        }
    }

    /**
     * EXACTLY MIRRORS JAVA'S sheet.getLastRowNum()
     * Scans the cell coordinates dynamically to find the exact last physical row index index,
     * ensuring your TestNG data loop maps rows 1 through 50 seamlessly.
     */
    public static getRowCount(): number {
        try {
            const worksheet = this.getWorksheet();
            if (!worksheet) return 0;

            // Extract all cell address keys (e.g., "A1", "B2"), filtering out metadata hidden parameters
            const cellKeys = Object.keys(worksheet).filter(key => !key.startsWith('!'));
            if (cellKeys.length === 0) return 0;

            // Transform alphanumeric cell strings into 0-indexed numeric rows
            const rows = cellKeys.map(key => XLSX.utils.decode_cell(key).r);
            
            // Return the maximum populated row index matching Java's getLastRowNum() boundary limits
            return Math.max(...rows);
        } catch (error) {
            console.error("[EXCEL ERROR] Failed reading dynamic row count metrics:", error);
            return 0;
        }
    }
}
