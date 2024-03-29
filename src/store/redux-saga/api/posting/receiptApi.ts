import axios from 'axios';
import accountApi, { ApiResponse } from '../../../api/accountApi';

//조회
const GET_API_URL = '/acc/account/receipt';

export const getReceipt = async () => {
  try {
    const response: ApiResponse<string[]> = await accountApi.get(GET_API_URL);
    console.log('있니?', response.data);
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

//등록
const ADD_API_URL = '/acc/account/receipt';

export const addReceipt = async (receipt: { slipNo: string; type: string; file: FileList | null }) => {
  try {
    const { slipNo, type, file } = receipt;
    console.log('stf', receipt);
    const url = `${ADD_API_URL}/${slipNo}/${type}`;
    console.log('url', url);

    const formData = new FormData();
    formData.append('type', type);

    if (file) {
      for (const fileItem of file) {
        formData.append('file', fileItem);
      }
    }
    const response: ApiResponse<string[]> = await accountApi.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('add??', response.data);
    return response.data;
  } catch (error) {
    console.log('errorcvcv', error);
  }
};

//증빙완료
const END_API_URL = '/acc/account/receipt/end';

export const endReceipt = async (receipt: {
  slipNo: any;
  accountPeriodNo: any;
  reportingDate: any;
  expenseReport: any;
  receiptType: any;
  proofStatus: any;
}) => {
  try {
    const { slipNo, accountPeriodNo, reportingDate, expenseReport, receiptType, proofStatus } = receipt;
    console.log('stf', receipt);
    const url = `${END_API_URL}`;
    console.log('url', url);

    const receiptMap = {
      receiptList: [
        {
          slipNo,
          accountPeriodNo,
          reportingDate,
          expenseReport,
          receiptType,
          proofStatus
        }
      ]
    };

    const response = await accountApi.put(url, receiptMap);
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log('errorcvcv', error);
  }
};
