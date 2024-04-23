import { ICellId } from './CellProps';


class StartRowAndColumnInfoManager {
    private static _instance: StartRowAndColumnInfoManager;
    private _startRowAndColumnInfo: ICellId;

    // Private constructor to prevent external instantiation
    private constructor() {
        // Initialize with default values
        this._startRowAndColumnInfo = { r: 0, c: "" };
    }

    // Static method to get the singleton instance
    public static getInstance(): StartRowAndColumnInfoManager {
        if (!StartRowAndColumnInfoManager._instance) {
            StartRowAndColumnInfoManager._instance = new StartRowAndColumnInfoManager();
        }
        return StartRowAndColumnInfoManager._instance;
    }

    // Getter for startRowAndColumnInfo
    public get startRowAndColumnInfo(): ICellId {
        return this._startRowAndColumnInfo;
    }

    // Setter for startRowAndColumnInfo
    public set startRowAndColumnInfo(info: ICellId) {
        this._startRowAndColumnInfo = info;
    }
}

// Export a single instance of the manager
export const startRowAndColumnInfoManager = StartRowAndColumnInfoManager.getInstance();
