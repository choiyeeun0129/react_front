import { call, fork, put, all, takeLatest } from 'redux-saga/effects';

import { getSlipDate, requestSlipDataSuccess, requestSlipDate } from 'store/slices/slip';

function* handleSlipDate(action: any) {
  try {
    const { startDate, endDate, slipStatus } = action.payload; // 액션에서 필요한 데이터 추출
    const params = { startDate, endDate, slipStatus }; // API 호출에 필요한 매개변수 설정
    const { data } = yield call(getSlipDate, params); // 비동기 함수 호출 및 데이터 받아오기
    console.log('사가사가', data);
    yield put(requestSlipDataSuccess({ data })); // 성공적으로 데이터를 받아온 경우, 액션 디스패치
  } catch (error) {
    console.log(error);
  }
}

function* watchGetSlipDate() {
  yield takeLatest(requestSlipDate, handleSlipDate); // 가장 최근 요청만 처리하도록 감시
}

export default function* slipSaga() {
  yield all([fork(watchGetSlipDate)]); // 모든 사가들을 병렬로 실행
}
