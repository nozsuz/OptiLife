import React from 'react';
import { Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SyncIcon from '@mui/icons-material/Sync';

const HealthMetrics = ({ metrics }) => {
  return (
    <Card>
      <CardHeader
        avatar={<SyncIcon color="primary" />}
        title="ヘルスモニタ"
        subheader="ウェアラブルデバイスと連携中"
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon><FavoriteIcon color="error" /></ListItemIcon>
            <ListItemText primary="リアルタイム心拍数" secondary={`${metrics.heartRate} bpm`} />
          </ListItem>
          <ListItem>
            <ListItemIcon><HotelIcon color="info" /></ListItemIcon>
            <ListItemText primary="昨晩の睡眠スコア" secondary={`${metrics.sleepScore} / 100`} />
          </ListItem>
          <ListItem>
            <ListItemIcon><DirectionsWalkIcon color="success" /></ListItemIcon>
            <ListItemText primary="今日の歩数" secondary={`${metrics.steps} 歩`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default HealthMetrics;
