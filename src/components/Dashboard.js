import React, { useState, useRef, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, Checkbox, TextField, Button, Paper, ToggleButtonGroup, ToggleButton, CircularProgress, Avatar } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
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
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// ... (他のコンポーネント定義は変更なし) ...
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
                    <LocalFireDepartmentIcon sx={{ color: '#ff6b6b' }} /> 今日のタスク 5日連続達成中
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
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Card sx={cardStyles}>
            <CardTitle icon={<TrendingUpIcon />} title="今日のタスク進捗" />
            <Box sx={{ textAlign: 'center', my: 2, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress variant="determinate" value={progress} size={120} thickness={4} sx={{ color: '#2dd4aa' }} />
                <CircularProgress variant="determinate" value={100} size={120} thickness={4} sx={{ color: '#e8f5f3', position: 'absolute', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', zIndex: 2 }}>
                    <Typography variant="h4" component="div" sx={{ color: '#2dd4aa', fontWeight: 700 }}>{`${progress}%`}</Typography>
                </Box>
            </Box>
            <Paper elevation={0} sx={{ textAlign: 'center', p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
                <Typography variant="h5" sx={{ color: '#2dd4aa', fontWeight: 700 }}>{completedTasks}/{totalTasks}</Typography>
                <Typography variant="body2" color="text.secondary">目標達成</Typography>
            </Paper>
        </Card>
    );
};

const WeightTrend = ({ trends }) => {
    const [timeRange, setTimeRange] = useState('月');

    return (
        <Card sx={cardStyles}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <CardTitle icon={<FitnessCenterIcon />} title="体重トレンド" />
                <ToggleButtonGroup value={timeRange} exclusive onChange={(e, newRange) => setTimeRange(newRange)} size="small">
                    <ToggleButton value="週">週</ToggleButton>
                    <ToggleButton value="月">月</ToggleButton>
                    <ToggleButton value="年">年</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ height: 180, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8f5f3" />
                        <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#666', fontSize: 12 }} label={{ value: '体重 (kg)', angle: -90, position: 'insideLeft', fill: '#666' }} />
                        <Tooltip formatter={(value) => `${value}kg`} />
                        <Line type="monotone" dataKey="weight" stroke="#2dd4aa" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="prediction" stroke="#ff7300" strokeDasharray="5 5" name="予測体重" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
            <Paper elevation={0} sx={{ textAlign: 'center', p: 1, mt: 2, borderRadius: '12px', background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
                <Typography variant="h5" sx={{ color: '#2dd4aa', fontWeight: 700 }}>-2.5kg</Typography>
                <Typography variant="body2" color="text.secondary">目標まで</Typography>
            </Paper>
        </Card>
    );
};

const LongTermGoal = ({ goal }) => {
    const progress = Math.max(0, (goal.target - goal.current) <= 0 ? 100 : (1 - (goal.current - goal.target) / (mockData.healthTrends[0].weight - goal.target)) * 100);
    return (
        <Card sx={cardStyles}>
            <CardTitle icon={<FlagIcon />} title="長期目標" />
            <Box sx={{ textAlign: 'center', my: 2, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress variant="determinate" value={progress} size={120} thickness={4} sx={{ color: '#2dd4aa' }} />
                 <CircularProgress variant="determinate" value={100} size={120} thickness={4} sx={{ color: '#e8f5f3', position: 'absolute', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', zIndex: 2 }}>
                    <Typography variant="h4" component="div" sx={{ color: '#2dd4aa', fontWeight: 700 }}>{`${Math.round(progress)}%`}</Typography>
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
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>食事</Typography>
        <List>
            {plan.meals.map(item => (
                <ListItem key={item.id} disablePadding sx={{ my: 1, background: '#f8fffe', borderRadius: '12px' }}>
                    <Checkbox checked={item.completed} onChange={() => onPlanToggle(item.id, !item.completed)} sx={{ '&.Mui-checked': { color: '#2dd4aa' } }} />
                    <Typography variant="body2" sx={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1, wordBreak: 'break-word' }}>
                        {item.menu || item.name}
                    </Typography>
                </ListItem>
            ))}
        </List>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>運動</Typography>
        <List>
            {plan.exercises.map(item => (
                <ListItem key={item.id} disablePadding sx={{ my: 1, background: '#f8fffe', borderRadius: '12px' }}>
                    <Checkbox checked={item.completed} onChange={() => onPlanToggle(item.id, !item.completed)} sx={{ '&.Mui-checked': { color: '#2dd4aa' } }} />
                    <Typography variant="body2" sx={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1, wordBreak: 'break-word' }}>
                        {item.menu || item.name}
                    </Typography>
                </ListItem>
            ))}
        </List>
    </Card>
);

const NutritionBalance = ({ summary }) => (
    <Card sx={cardStyles}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardTitle icon={<RestaurantMenuIcon />} title="栄養バランス" />
            <Button size="small" sx={{ color: '#2dd4aa' }}>詳細を見る &gt;</Button>
        </Box>
        <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={summary.nutritionBalance}>
                    <PolarGrid stroke="#e8f5f3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="あなたのバランス" dataKey="value" stroke="#2dd4aa" fill="#2dd4aa" fillOpacity={0.6} />
                    <Radar name="理想のバランス" dataKey="ideal" data={mockData.diagnosisSummary.idealBalance} stroke="#95a5a6" fill="#95a5a6" fillOpacity={0.2} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </Box>
    </Card>
);

const Journal = () => {
    const [journal, setJournal] = useState({ mood: '😄', condition: '良好' });

    return (
        <Card sx={cardStyles}>
            <CardTitle icon={<EditIcon />} title="今日の記録" />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <ToggleButtonGroup
                    value={journal.mood}
                    exclusive
                    onChange={(e, newMood) => setJournal(prev => ({ ...prev, mood: newMood }))}
                    size="small"
                >
                    <ToggleButton value="😄">😄</ToggleButton>
                    <ToggleButton value="😔">😔</ToggleButton>
                    <ToggleButton value="😠">😠</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={journal.condition}
                    exclusive
                    onChange={(e, newCondition) => setJournal(prev => ({ ...prev, condition: newCondition }))}
                    size="small"
                >
                    <ToggleButton value="良好">良好</ToggleButton>
                    <ToggleButton value="普通">普通</ToggleButton>
                    <ToggleButton value="不調">不調</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <TextField
                multiline
                rows={4}
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
            <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: '12px', background: 'linear-gradient(135deg, #2dd4aa 0%, #26b894 100%)' }}>
                記録する
            </Button>
        </Card>
    );
};

const AiPartnerChat = ({ messages, onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <Card sx={{ ...cardStyles, display: 'flex', flexDirection: 'column' }}>
            <CardTitle icon={<SmartToyIcon />} title="AIサポーター Opti" />
            <CardContent sx={{ flexGrow: 1, overflow: 'auto', p: 1, bgcolor: 'grey.50' }}>
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2 }}>
                        {msg.sender === 'ai' && <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mr: 1.5 }}><SmartToyIcon fontSize="small" /></Avatar>}
                        <Paper elevation={0} sx={{ p: 1.5, borderRadius: '10px', bgcolor: msg.sender === 'user' ? 'primary.main' : 'white', color: msg.sender === 'user' ? 'white' : 'inherit', maxWidth: '80%' }}>
                            <Typography variant="body2">{msg.text}</Typography>
                        </Paper>
                    </Box>
                ))}
                <div ref={chatEndRef} />
            </CardContent>
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField fullWidth variant="outlined" size="small" placeholder="AIに質問する..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ ml: 1 }} onClick={handleSend}>送信</Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
                    本AIは医療アドバイスを提供するものではありません。健康上の懸念は専門家にご相談ください。
                </Typography>
            </Box>
        </Card>
    );
};


const Dashboard = () => {
    const [plan, setPlan] = useState(mockData.todaysPlan);
    const [messages, setMessages] = useState(mockData.aiPartnerChat.initialMessages);

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

    const handleSendMessage = (text) => {
        const newMessage = { id: Date.now(), sender: 'user', text, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, newMessage]);

        setTimeout(() => {
            const knowledgeBase = mockData.aiPartnerChat.knowledgeBase;
            let responseText = mockData.aiPartnerChat.cannedResponses.default;

            const foundKeyword = Object.keys(knowledgeBase).find(keyword => text.includes(keyword));
            if (foundKeyword) {
                responseText = knowledgeBase[foundKeyword];
            }
            
            const aiResponse = { id: Date.now() + 1, sender: 'ai', text: responseText, timestamp: new Date().toISOString() };
            setMessages(prev => [...prev, aiResponse]);
        }, 1200);
    };

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%)' }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12}>
                    <ConditionSelector />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TodayProgress plan={plan} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <WeightTrend trends={mockData.healthTrends} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <LongTermGoal goal={mockData.user.longTermGoal} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TodayTasks plan={plan} onPlanToggle={handlePlanToggle} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <NutritionBalance summary={mockData.diagnosisSummary} />
                        </Grid>
                        <Grid item xs={12}>
                            <Journal />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AiPartnerChat messages={messages} onSendMessage={handleSendMessage} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;