import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, Checkbox, TextField, Button, Paper, ToggleButtonGroup, ToggleButton, LinearProgress } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { mockData } from '../data/mockData';

import MoodIcon from '@mui/icons-material/Mood';
import BoltIcon from '@mui/icons-material/Bolt';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlagIcon from '@mui/icons-material/Flag';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EditIcon from '@mui/icons-material/Edit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const cardStyles = {
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    p: 2.5,
    height: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    },
};

const CardTitle = ({ icon, title }) => (
    <Typography variant="h6" component="h3" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
        {icon} {title}
    </Typography>
);

const ConditionSelector = () => {
    const { condition } = mockData;
    const conditionItems = [
        { key: 'sleep', icon: <NightsStayIcon />, label: '睡眠' },
        { key: 'steps', icon: <FitnessCenterIcon />, label: '歩数' },
        { key: 'heartRate', icon: <BoltIcon />, label: '心拍' },
    ];

    return (
        <Paper sx={{ ...cardStyles, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>今日の自動連携データ</Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <LocalFireDepartmentIcon sx={{ color: '#ff6b6b' }} /> 5日連続で目標達成中
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {conditionItems.map(item => (
                    <Box key={item.key} sx={{ textAlign: 'center' }}>
                        {item.icon}
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{condition[item.key].value}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.label} ({condition[item.key].source})</Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

const TodayProgress = ({ plan }) => {
    const totalTasks = plan.meals.length + plan.exercises.length;
    const completedTasks = [...plan.meals, ...plan.exercises].filter(item => item.completed).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Card sx={cardStyles}>
            <CardTitle icon={<TrendingUpIcon />} title="今日の進捗" />
            <Box sx={{ textAlign: 'center', my: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ width: '120px', height: '10px', borderRadius: 5 }} />
                </Box>
            </Box>
            <Paper elevation={0} sx={{ textAlign: 'center', p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
                <Typography variant="h4" sx={{ color: '#2dd4aa', fontWeight: 700 }}>{completedTasks}/{totalTasks}</Typography>
                <Typography variant="body2" color="text.secondary">目標達成</Typography>
            </Paper>
        </Card>
    );
};

const WeightTrend = ({ trends }) => (
    <Card sx={cardStyles}>
        <CardTitle icon={<FitnessCenterIcon />} title="体重トレンド" />
        <Box sx={{ height: 180, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends}>
                    <Tooltip />
                    <Bar dataKey="weight" fill="#2dd4aa" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
        <Paper elevation={0} sx={{ textAlign: 'center', p: 1, mt: 2, borderRadius: '12px', background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
            <Typography variant="h5" sx={{ color: '#2dd4aa', fontWeight: 700 }}>-2.5kg</Typography>
            <Typography variant="body2" color="text.secondary">目標まで</Typography>
        </Paper>
    </Card>
);

const LongTermGoal = ({ goal }) => {
    const progress = Math.max(0, (goal.target - goal.current) <= 0 ? 100 : (1 - (goal.current - goal.target) / (mockData.healthTrends[0].weight - goal.target)) * 100);
    return (
        <Card sx={cardStyles}>
            <CardTitle icon={<FlagIcon />} title="長期目標" />
            <Box sx={{ textAlign: 'center', my: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                     <LinearProgress variant="determinate" value={progress} sx={{ width: '120px', height: '10px', borderRadius: 5 }} />
                </Box>
            </Box>
            <Paper elevation={0} sx={{ textAlign: 'center', p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
                <Typography variant="h5" sx={{ color: '#2dd4aa', fontWeight: 700 }}>{goal.target}kg</Typography>
                <Typography variant="body2" color="text.secondary">目標体重</Typography>
            </Paper>
        </Card>
    );
};

const TodayTasks = ({ plan, onPlanToggle }) => (
    <Card sx={cardStyles}>
        <CardTitle icon={<RestaurantMenuIcon />} title="今日のタスク" />
        <List>
            {plan.meals.concat(plan.exercises).map(item => (
                <ListItem key={item.id} disablePadding sx={{ my: 1, background: '#f8fffe', borderRadius: '12px' }}>
                    <Checkbox checked={item.completed} onChange={() => onPlanToggle(item.id, !item.completed)} sx={{ '&.Mui-checked': { color: '#2dd4aa' } }} />
                    <Typography variant="body2" sx={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}>
                        {item.menu || item.name}
                    </Typography>
                </ListItem>
            ))}
        </List>
    </Card>
);

const NutritionBalance = ({ summary }) => (
    <Card sx={cardStyles}>
        <CardTitle icon={<RestaurantMenuIcon />} title="栄養バランス" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
             <Typography variant="body2" color="text.secondary">（ここに栄養バランスのグラフを表示）</Typography>
        </Box>
    </Card>
);

const Journal = () => (
    <Card sx={cardStyles}>
        <CardTitle icon={<EditIcon />} title="今日の記録" />
        <TextField
            multiline
            rows={5}
            fullWidth
            placeholder="今日はどんな一日でしたか？体調や気持ちを記録しましょう。"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    borderColor: '#e8f5f3',
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2dd4aa' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2dd4aa', boxShadow: '0 0 0 3px rgba(45, 212, 170, 0.1)' },
                },
            }}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" sx={{ flex: 1, borderRadius: '12px', color: '#2dd4aa', borderColor: '#f0f9f7' }}>保存</Button>
            <Button variant="contained" sx={{ flex: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #2dd4aa 0%, #26b894 100%)' }}>投稿</Button>
        </Box>
    </Card>
);


const Dashboard = () => {
    const [plan, setPlan] = useState(mockData.todaysPlan);
    const handlePlanToggle = (itemId, isCompleted) => {
        const newPlan = { ...plan };
        const itemTypes = ['meals', 'exercises'];
        itemTypes.forEach(type => {
            newPlan[type] = newPlan[type].map(item => {
                if (item.id === itemId) {
                    return { ...item, completed: isCompleted };
                }
                return item;
            });
        });
        setPlan(newPlan);
    };

    return (
        <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ConditionSelector />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TodayProgress plan={plan} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <WeightTrend trends={mockData.healthTrends} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LongTermGoal goal={mockData.user.longTermGoal} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TodayTasks plan={plan} onPlanToggle={handlePlanToggle} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <NutritionBalance summary={mockData.diagnosisSummary} />
                        </Grid>
                        <Grid item xs={12}>
                            <Journal />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;