import { all, fork } from 'redux-saga/effects';
import trialSaga from './posting/postingsaga';
import slipSaga from './posting/slipsaga';
import baseSaga from './base/baseSaga';
import accountSaga from './posting/accountSaga';
import receiptsaga from '../redux-saga/saga/posting/receiptsaga';

export default function* rootSaga() {
  yield all([fork(trialSaga), fork(slipSaga), fork(accountSaga), fork(baseSaga), fork(receiptsaga)]);
}
