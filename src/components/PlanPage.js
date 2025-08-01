import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemText, Divider, Chip, IconButton } from '@mui/material';
import { mockData } from '../data/mockData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LinkIcon from '@mui/icons-material/Link';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const PlanPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { personalPlan } = mockData;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDialogClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handlePlanUpdate = () => {
    setDialogOpen(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getDifficultyChip = (difficulty) => {
    const color = difficulty === 'Easy' ? 'success' : difficulty === 'Medium' ? 'warning' : 'error';
    return <Chip label={difficulty} color={color} size="small" />;
  };

  const getIntensityChip = (intensity) => {
    if (intensity === 'None') return null;
    const color = intensity === 'Low' ? 'success' : intensity === 'Medium' ? 'warning' : 'error';
    return <Chip label={intensity} color={color} size="small" sx={{ ml: 2 }} />;
  };

  const exercisePlanWithDetails = personalPlan.exercisePlan.map(ex => {
      // データ矛盾の修正ロジック
      if (ex.menu.includes("HIIT") && ex.intensity === "None") {
          ex.intensity = "High"; // 強度を適切に設定
      }
      if (ex.menu === "休息日" && ex.details) {
          delete ex.details; // 休息日に詳細メニューがあれば削除
      }

      if (ex.menu.includes("筋力トレーニング")) {
          ex.details = [
              { name: "ウォームアップ", sets: "5-10分", reps: "軽い有酸素運動" },
              { name: "スクワット", sets: 3, reps: "10-12回" },
              { name: "腕立て伏せ", sets: 3, reps: "限界まで" },
              { name: "プランク", sets: 3, reps: "30-60秒" },
              { name: "クールダウン", sets: "5-10分", reps: "静的ストレッチ" },
          ];
      }
      return ex;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">パーソナルプラン</Typography>
        <Button variant="outlined" startIcon={<EditCalendarIcon />} onClick={handleDialogClick}>
          急な予定変更
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="plan tabs" variant="scrollable" allowScrollButtonsMobile>
          <Tab icon={<RestaurantMenuIcon />} label="食事プラン" />
          <Tab icon={<FitnessCenterIcon />} label="運動プラン" />
        </Tabs>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && (
            <Box>
                {personalPlan.mealPlan.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{item.day}</Typography>
                            <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.breakfast}, {item.lunch}, ...</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem secondaryAction={<IconButton edge="end"><LinkIcon /></IconButton>}>
                                    <ListItemText primary="朝食" secondary={item.breakfast} sx={{ '& .MuiListItemText-secondary': { whiteSpace: 'normal' } }} />
                                </ListItem>
                                <Divider />
                                <ListItem secondaryAction={<IconButton edge="end"><LinkIcon /></IconButton>}>
                                    <ListItemText primary="昼食" secondary={item.lunch} sx={{ '& .MuiListItemText-secondary': { whiteSpace: 'normal' } }} />
                                </ListItem>
                                <Divider />
                                <ListItem secondaryAction={<IconButton edge="end"><LinkIcon /></IconButton>}>
                                    <ListItemText primary="夕食" secondary={item.dinner} sx={{ '& .MuiListItemText-secondary': { whiteSpace: 'normal' } }} />
                                </ListItem>
                            </List>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                                <Typography variant="caption">調理時間: {item.time}分</Typography>
                                {getDifficultyChip(item.difficulty)}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        )}
        {tabIndex === 1 && (
            <Box>
                {exercisePlanWithDetails.map((item, index) => (
                    <Accordion key={index} defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{item.day}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.menu}</Typography>
                            {getIntensityChip(item.intensity)}
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.details ? (
                                <List>
                                    {item.details.map(detail => (
                                        <ListItem key={detail.name}>
                                            <ListItemText primary={detail.name} secondary={`セット: ${detail.sets} / レップ: ${detail.reps}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>
                                    今日は休息日です。ゆっくり身体を休めましょう。<br />
                                    軽いストレッチや散歩がおすすめです。
                                </Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>プランの動的調整</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            急な予定変更に合わせて、AIがプランを調整します。どちらのプランを調整しますか？
          </DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" onClick={handlePlanUpdate}>今日のプランを変更</Button>
            <Button variant="outlined" onClick={handlePlanUpdate}>今週のプランを再生成</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>キャンセル</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          AIがプランを再計算しました！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlanPage;