import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import {
  addReceiptFailure,
  addReceiptSuccess,
  selectReceiptStart,
  selectReceiptSuccess,
  endReceiptSuccess
} from 'store/redux-saga/reducer/posting/receipt';
import { addReceipt, getReceipt, endReceipt } from 'store/redux-saga/api/posting/receiptApi';
import { AxiosResponse } from 'axios';

//조회
function* fetchReceiptList() {
  try {
    const response: AxiosResponse = yield call(getReceipt);
    console.log('saga response', response.receiptList);
    yield put(selectReceiptSuccess(response.receiptList));
  } catch (error) {
    console.log('에러임', error);
  }
}

export function* watchFetchReceiptList() {
  yield takeLatest(selectReceiptStart, fetchReceiptList);
}

//등록
function* addReceiptList(action: any) {
  try {
    const { slipNo, type, file } = action.payload;
    const receipt = { slipNo, type, file };
    const response: AxiosResponse = yield call(addReceipt, receipt);
    yield put(addReceiptSuccess(response.data));
  } catch (error) {
    yield put(addReceiptFailure(error));
  }
}

export function* watchaddReceiptList() {
  yield takeLatest(addReceiptSuccess, addReceiptList);
}

//증빙완료
function* endReceiptList(action: any) {
  console.log('증빙증빙', action.payload);
  try {
    const { slipNo, accountPeriodNo, reportingDate, expenseReport, receiptType, proofStatus } = action.payload;
    const receipt = { slipNo, accountPeriodNo, reportingDate, expenseReport, receiptType, proofStatus };
    console.log('receipt', receipt);
    const response: AxiosResponse = yield call(endReceipt, receipt);
    console.log('response', response);
    yield put(addReceiptSuccess(response.data));
  } catch (error) {
    yield put(addReceiptFailure(error));
  }
}

export function* watchendReceiptList() {
  yield takeLatest(endReceiptSuccess, endReceiptList);
}

export default function* receiptsaga() {
  yield all([fork(watchFetchReceiptList), fork(watchaddReceiptList), fork(watchendReceiptList)]);
}
