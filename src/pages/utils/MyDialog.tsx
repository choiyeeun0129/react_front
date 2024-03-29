import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

type maxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const MyDialog = (props: any) => {
  const open = props.open;
  let maxWidth: maxWidth | false = false;
  if (props.maxWidth !== undefined) {
    maxWidth = props.maxWidth;
  }

  const title = () => {
    if (props.title !== undefined) {
      return <DialogTitle align="center">{props.title}</DialogTitle>;
    }
    return;
  };

  return (
    <div>
      <Dialog aria-labelledby="responsive-dialog-title" open={open} fullWidth={true} maxWidth={'lg'}>
        {title()}
        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default MyDialog;
