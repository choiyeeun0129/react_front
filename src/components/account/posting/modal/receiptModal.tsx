import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MainCard from 'ui-component/cards/MainCard';
import { DialogActions, TextField } from '@mui/material';
import { useDispatch } from 'store';
import { addReceiptSuccess } from 'store/redux-saga/reducer/posting/receipt';
import * as types from '../../../../store/redux-saga/reducer/posting/receipt';

const ReceiptModal = ({ selectedSlipNo, setIsModalOpen }) => {
  console.log('selectedSlipNo', selectedSlipNo);
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<FileList | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
    console.log('type', event.target.value);
    dispatch(() => {});
  };

  //파일창열기
  const handleAddFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    console.log(fileList);
    setSelectedFile(fileList);
  };
  //등록
  const handleConfirm = async () => {
    dispatch(addReceiptSuccess({ slipNo: selectedSlipNo, type: selectedType, file: selectedFile }));
    alert('등록되었습니다');
    dispatch(types.selectReceiptStart());
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <MainCard title="증빙파일 등록" content={false}>
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box flex={1}>
            <TextField id="slip-no-input" label="전표일련번호" variant="outlined" fullWidth value={selectedSlipNo} disabled />
          </Box>
          <Box flex={1}>
            <FormControl fullWidth>
              <InputLabel id="type-select-label">유형선택</InputLabel>
              <Select labelId="type-select-label" id="type-select" value={selectedType} label="Type" onChange={handleTypeChange}>
                <MenuItem value="--">-------------------------</MenuItem>
                <MenuItem value="1.이체내역">1.이체내역</MenuItem>
                <MenuItem value="2.신용카드매출전표">2.신용카드매출전표</MenuItem>
                <MenuItem value="3.현금영수증">3.현금영수증</MenuItem>
                <MenuItem value="4.간이영수증">4.간이영수증</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" marginTop={2}>
          <DialogActions>
            <Button onClick={handleAddFile} color="primary">
              Add File
            </Button>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef} // 파일 선택 창을 ref로 연결
              onChange={handleFileInputChange}
              multiple
            />
            <Typography variant="body2" color="textSecondary">
              {selectedFile ? selectedFile[0].name : 'File Name.png'}
            </Typography>
          </DialogActions>

          <Stack direction="row" spacing={2}>
            <Button onClick={handleConfirm} color="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MainCard>
  );
};

export default ReceiptModal;
