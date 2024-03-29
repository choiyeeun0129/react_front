import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const receiptReducer = createSlice({
  name: 'receipt',
  initialState: {
    receiptList: [], //조회 list
    error: null
  },
  reducers: {
    //조회
    selectReceiptStart: (state) => {
      state.error = null;
    },
    selectReceiptSuccess: (state, action) => {
      console.log('eee', action.payload);
      state.receiptList = action.payload;
    },
    selectReceiptFailure: (state, action) => {
      state.error = action.payload;
    },
    //등록
    addReceiptStart: (state) => {
      state.error = null;
    },
    addReceiptSuccess: (action) => {
      console.log('add', action.payload);
    },
    addReceiptFailure: (state, action) => {
      state.error = action.payload;
    },
    //증빙완료
    endReceiptStart: (state) => {
      state.error = null;
    },
    endReceiptSuccess: (state, action) => {
      console.log('end', action.payload);
    },
    endReceiptFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  selectReceiptStart,
  selectReceiptSuccess,
  selectReceiptFailure,
  addReceiptStart,
  addReceiptSuccess,
  addReceiptFailure,
  endReceiptStart,
  endReceiptSuccess,
  endReceiptFailure
} = receiptReducer.actions;

export default receiptReducer.reducer;
