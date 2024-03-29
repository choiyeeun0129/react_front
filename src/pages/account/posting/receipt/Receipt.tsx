import React, { useEffect, useState } from 'react';

// import { DateTime } from 'luxon';

// material-ui
import { Grid, Stack, TextField, Button, FormControl, Select, MenuItem, Modal, InputLabel } from '@mui/material';

// project imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TaskIcon from '@mui/icons-material/Task';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import IconButton from '@mui/material/IconButton';
// material-ui
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import * as types from '../../../../store/redux-saga/reducer/posting/receipt';
import { useSelector } from 'store';
import MyDialog from 'pages/utils/MyDialog';
import ReceiptModal from 'components/account/posting/modal/receiptModal';
import { endReceiptSuccess } from 'store/redux-saga/reducer/posting/receipt';

//지출증빙 그리드 세팅
const receiptColumns = [
  { width: '250', headerName: '전표일련번호', field: 'slipNo', align: 'center' },
  { width: '250', headerName: '기수일련번호', field: 'accountPeriodNo', editable: false },
  { width: '250', headerName: '작성일자', field: 'reportingDate', type: 'string' },
  {
    width: '250',
    headerName: '품의내역',
    field: 'expenseReport',
    editable: true
  },
  { width: '250', headerName: '증빙유형', field: 'receiptType', editable: false },
  { headerName: '증빙상태', field: 'proofStatus', editable: false }
];

const fetchImageBySlipNo = (slipNo: string) => {
  return `/assets/images/receiptImage/${slipNo}.png`;
};

function ReceiptForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(types.selectReceiptStart());
  }, []);

  const receiptData = useSelector((state) => state.receipt.receiptList);

  const theme = useTheme();
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSlipNo, setSelectedSlipNo] = useState('');
  const [accountPeriodNo, setAccountPeriodNo] = useState('');
  const [reportingDate, setReportingDate] = useState('');
  const [expenseReport, setExpenseReport] = useState('');

  //행 클릭
  const handleRowClick = (params: any) => {
    console.log('params', params.row);
    console.log('slipNo', params.row.slipNo);
    console.log('receiptType', params.row.receiptType);
    const slipNo = params.row.slipNo;
    const receiptType = params.row.receiptType;
    const accountPeriodNo = params.row.accountPeriodNo;
    const reportingDate = params.row.reportingDate;
    const expenseReport = params.row.expenseReport;
    setSelectedSlipNo(slipNo);
    setSelectedType(receiptType);
    setAccountPeriodNo(accountPeriodNo);
    setAccountPeriodNo(accountPeriodNo);
    setReportingDate(reportingDate);
    setExpenseReport(expenseReport);
  };

  //값 변경
  const handleChange = (event: any) => {
    setSelectedType(event.target.value); // 지출증빙유형 선택
  };

  //모달창 닫기
  const closeModal = async () => {
    setSelectedRow(null); // 모달이 닫힐 때 선택된 행 초기화
    setIsModalOpen(false);
  };

  //모달창 열기
  const ModalClick = () => {
    setIsModalOpen(true);
    setSelectedSlipNo(selectedSlipNo);
  };

  //증빙완료
  const endReceipt = async () => {
    const updatedReceipt = {
      slipNo: selectedSlipNo,
      accountPeriodNo: accountPeriodNo,
      reportingDate: reportingDate,
      expenseReport: expenseReport,
      receiptType: selectedType,
      proofStatus: '증빙완료'
    };
    console.log('updateReceipt', updatedReceipt);
    dispatch(endReceiptSuccess(updatedReceipt));
    alert('완료되었습니다');
    dispatch(types.selectReceiptStart());
  };

  //==========================지출증빙CRUD=================================
  return (
    <Page title="지출증빙">
      {/* =================================지출증빙데이터그리드================================= */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="">
            <Box
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 800,
                ml: 4,
                mt: 1,
                mb: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField id="standard-basic" label="전표일련번호" variant="standard" sx={{ width: 200 }} />
                <IconButton type="button" sx={{ p: '2px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField id="standard-basic" label="품의내역" variant="standard" sx={{ width: 200 }} />
                <IconButton type="button" sx={{ p: '2px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">승인상태</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={status}
                  onChange={handleChange}
                  label="승인상태"
                >
                  <MenuItem value={0}>----------</MenuItem>
                  <MenuItem value={10}>1.승인</MenuItem>
                  <MenuItem value={20}>2.반려</MenuItem>
                  <MenuItem value={30}>3.미결</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} mt={1}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="지출증빙"
            secondary={
              <Stack direction="row" alignItems="center">
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<TaskIcon />}>
                      전표승인
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} id="slipDelete" onClick={ModalClick}>
                      증빙등록
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={endReceipt}>
                      증빙완료
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                      증빙미흡
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            }
          >
            <Box
              sx={{
                height: 300,
                width: '100%',
                '& .MuiDataGrid-root': {
                  border: 'none',
                  '& .MuiDataGrid-cell': {
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnsContainer': {
                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  }
                }
              }}
            >
              <DataGrid rows={receiptData} columns={receiptColumns} getRowId={(row: any) => row.slipNo} onRowClick={handleRowClick} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} title="증빙파일">
            <Box>
              {selectedSlipNo && (
                <img src={fetchImageBySlipNo(selectedSlipNo)} alt="증빙 이미지" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              )}

              {!selectedSlipNo && (
                <img
                  src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                  alt="없음"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              )}
            </Box>
          </MainCard>
        </Grid>

        <MyDialog open={isModalOpen} close={closeModal} maxWidth={'sm'}>
          <ReceiptModal selectedSlipNo={selectedSlipNo} setIsModalOpen={setIsModalOpen} />
        </MyDialog>
      </Grid>
    </Page>
  );
}

ReceiptForm.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ReceiptForm;
