import { call, put, takeEvery } from 'redux-saga/effects';
import {
  betForLot,
  betSuccess,
  createNewLot,
  lotsLoadingStart,
  lotsSuccess,
} from '../../features/lots/lots-slice';
import { ILot, ILotResponse, IPricesRange } from '../../types/lot';
import { createLot, getLots, getLotsPriceRange, handleBet } from '../../api/lots-service';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';

function* lotsWorker({ payload }: ReturnType<typeof lotsLoadingStart>) {
  try {
    const pricesRange = (yield call(getLotsPriceRange)) as IPricesRange;
    const lotsData = (yield call(getLots, payload.params)) as ILotResponse;

    yield put(
      lotsSuccess({
        ...lotsData,
        pricesRange,
      })
    );
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(lotsLoadingStart.type));
  }
}

function* betWorker({ payload }: ReturnType<typeof betForLot>) {
  try {
    const lot = (yield call(handleBet, payload.id, payload.bet)) as ILot;

    yield put(betSuccess(lot));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(betForLot.type));
  }
}

function* createLotWorker({ payload }: ReturnType<typeof createNewLot>) {
  try {
    yield call(createLot, payload);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(createNewLot.type));
  }
}

function* lotsSaga() {
  yield takeEvery(lotsLoadingStart.type, lotsWorker);
  yield takeEvery(betForLot.type, betWorker);
  yield takeEvery(createNewLot.type, createLotWorker);
}

export default lotsSaga;
