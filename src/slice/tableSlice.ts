import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

export interface iTableData {
    key: string;
    name: string;
    date: string;
    number: number;
}

interface iState {
    searchText: string,
    tableData: iTableData[]
}


const initialState : iState = {
    searchText: '',
    tableData : [
        {
            key: '1',
            name: 'John Smith',
            date: '12.03.2023',
            number: 123
        },
        {
            key: '2',
            name: 'John Geitsy',
            date: '30.04.2022',
            number: 1233
        },
    ]
}
// PayloadAction<number>
export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        recordAdd: (state, action) => {
            state.tableData = [...state.tableData, action.payload];
        },
        recordRemove: (state, action) => {
            state.tableData = state.tableData.filter(record => record.key !== action.payload);
        },
        recordEdit: (state, action) => {
            state.tableData = state.tableData.map(record => {
                console.log(record.key, action.payload);
                if (record.key === action.payload.key) {
                    return record = action.payload;
                }
                return record;
            })
        },
        searchInputChanged: (state, action) => {
            state.searchText = action.payload;
        }
    },
})

export const filteredTableDataSelector = createDraftSafeSelector(
    (state: RootState) => state.table.searchText,
    (state: RootState) => state.table.tableData,
    (text: string, data: iTableData[]) => {
        if (text === '') {
            return data;
        } else {
            return data.filter((record: iTableData) => {
                
                return Object.keys(record).some(key => {
                    const value = record[key as keyof iTableData];
                    return key !== 'key' && (value +'').toLowerCase().includes(text.toLowerCase())
                });
            })
        }
    }
)

const { actions, reducer } = tableSlice;

export const { recordAdd, recordRemove, recordEdit, searchInputChanged } = actions

export default reducer;