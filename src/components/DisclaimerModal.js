import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DisclaimerModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-description"
    >
      <Box sx={style}>
        <Typography id="disclaimer-title" variant="h6" component="h2">
          ご利用にあたっての重要事項
        </Typography>
        <Typography id="disclaimer-description" sx={{ mt: 2 }}>
          本アプリケーションは、健康的なライフスタイルをサポートするための情報提供ツールです。医療行為、診断、治療を代替するものではあり��せん。
          <br /><br />
          医学的な懸念事項や症状については、必ず医師または資格を持つ医療専門家にご相談ください。AIによる応答は自動生成されたものであり、専門家の診断に代わるものではありません。
        </Typography>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" onClick={handleClose}>同意して利用を開始する</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DisclaimerModal;
