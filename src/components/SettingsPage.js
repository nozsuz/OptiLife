import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardHeader, TextField, Button, Divider, CardActions, Chip, List, ListItem, ListItemText, Switch, FormGroup, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, Checkbox, ListItemIcon } from '@mui/material';
import { mockData } from '../data/mockData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import NoFoodIcon from '@mui/icons-material/NoFood';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkIcon from '@mui/icons-material/Link';

const SettingsPage = () => {
  const { settings } = mockData;
  const [notifications, setNotifications] = useState(settings.notifications);
  const [dislikedFoods, setDislikedFoods] = useState(settings.preferences.dislikedFoods);
  const [foodInput, setFoodInput] = useState('');

  const handleNotificationToggle = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  const handleAddFood = () => {
    if (foodInput && !dislikedFoods.includes(foodInput)) {
      setDislikedFoods([...dislikedFoods, foodInput]);
      setFoodInput('');
    }
  };

  const handleDeleteFood = (foodToDelete) => () => {
    setDislikedFoods((foods) => foods.filter((food) => food !== foodToDelete));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>設定</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardHeader avatar={<AccountCircleIcon color="primary" />} title="プロフィール情報" />
            <CardContent>
              <TextField label="氏名" defaultValue={settings.profile.name} fullWidth margin="normal" variant="filled" InputProps={{ readOnly: true }} />
              <TextField label="メールアドレス" defaultValue={settings.profile.email} fullWidth margin="normal" variant="filled" InputProps={{ readOnly: true }} />
            </CardContent>
          </Card>
           <Card sx={{ mb: 3 }}>
            <CardHeader avatar={<SettingsApplicationsIcon color="primary" />} title="各種設定" />
            <CardContent>
                <Typography variant="h6" gutterBottom><NoFoodIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 1}}/> 苦手な食材</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {dislikedFoods.map((food) => <Chip key={food} label={food} onDelete={handleDeleteFood(food)} />)}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField label="食材を追加" variant="outlined" size="small" value={foodInput} onChange={(e) => setFoodInput(e.target.value)} />
                    <Button onClick={handleAddFood} variant="contained">追加</Button>
                </Box>
                <Divider sx={{ my: 2 }}/>
                <Typography variant="h6" gutterBottom><NotificationsIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 1}}/> 通知設定</Typography>
                <List>
                    <ListItem><ListItemText primary="食事リマインダー" /><Switch edge="end" onChange={handleNotificationToggle} name="mealReminder" checked={notifications.mealReminder} /></ListItem>
                    <ListItem><ListItemText primary="運動リマインダー" /><Switch edge="end" onChange={handleNotificationToggle} name="exerciseReminder" checked={notifications.exerciseReminder} /></ListItem>
                    <ListItem><ListItemText primary="AIからのアドバイス" /><Switch edge="end" onChange={handleNotificationToggle} name="aiAdvice" checked={notifications.aiAdvice} /></ListItem>
                </List>
            </CardContent>
          </Card>
          <Card>
            <CardHeader avatar={<LinkIcon color="primary" />} title="連携中のアプリ・デバイス" />
            <CardContent>
              <List>
                <ListItem><ListItemText primary="Apple HealthKit" /><Switch defaultChecked={settings.linkedApps.healthKit} /></ListItem>
                <ListItem><ListItemText primary="Google Fit" /><Switch defaultChecked={settings.linkedApps.googleFit} /></ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardHeader avatar={<FavoriteBorderIcon color="primary" />} title="健康状態・目的" />
            <CardContent>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend">当てはまるもの（任意）</FormLabel>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox />} label="高血圧" />
                        <FormControlLabel control={<Checkbox />} label="糖尿病" />
                        <FormControlLabel control={<Checkbox />} label="脂質異常症" />
                    </FormGroup>
                </FormControl>
                <Divider sx={{ my: 2 }} />
                <FormControl component="fieldset">
                    <FormLabel component="legend">フィットネスの主な目的</FormLabel>
                    <RadioGroup row defaultValue={mockData.user.goal}>
                        <FormControlLabel value="health" control={<Radio />} label="健康維持" />
                        <FormControlLabel value="weightloss" control={<Radio />} label="減量" />
                        <FormControlLabel value="muscle" control={<Radio />} label="���力増強" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader avatar={<StarIcon color="primary" />} title="ご契約プラン" />
            <CardContent>
              <Typography variant="h5" gutterBottom>{settings.subscription.planName} ({settings.subscription.monthlyFee}/月)</Typography>
              <List dense>
                {settings.subscription.features.map(feature => (
                  <ListItem key={feature}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
