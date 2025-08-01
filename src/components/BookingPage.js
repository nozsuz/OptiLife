import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Avatar, Rating, IconButton, Paper } from '@mui/material';
import { mockData } from '../data/mockData';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';

const SpecialistCard = ({ specialist, isAssigned = false }) => (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flexGrow: 1 }}>
            <Avatar 
                src={`https://i.pravatar.cc/150?u=${specialist.id}`} 
                sx={{ width: 64, height: 64, mb: 2 }} 
            />
            <Typography variant="h6">{specialist.name}</Typography>
            <Typography color="text.secondary" gutterBottom>{specialist.title}</Typography>
            <Chip label={specialist.expertise} size="small" sx={{ mb: 2 }}/>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating name="read-only" value={specialist.rating || 4.5} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>({specialist.reviews || 23}件)</Typography>
            </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <IconButton color="secondary" aria-label="introduction video">
                <PlayCircleOutlineIcon />
            </IconButton>
            {isAssigned ? (
                <Button size="small" variant="outlined" startIcon={<ChatIcon />}>
                    チャットで相談
                </Button>
            ) : (
                <Button size="small" disabled={!specialist.available} variant="contained">
                  {specialist.available ? '予約へ進む' : '現在対応不可'}
                </Button>
            )}
        </CardActions>
    </Card>
);


const BookingPage = () => {
  const { booking } = mockData;
  const { assignedSpecialist, specialists } = booking;

  // 「他の専門家」リストから担当専門家を除外
  const otherSpecialists = specialists.filter(s => s.id !== assignedSpecialist.id);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>オンライン予約</Typography>
      
      <Paper sx={{ p: 2, mb: 4, bgcolor: 'primary.lighter', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>あなたの担当専門家</Typography>
        <SpecialistCard specialist={assignedSpecialist} isAssigned={true} />
      </Paper>

      <Typography variant="h6" gutterBottom>他の専門家を探す</Typography>
      <Grid container spacing={3}>
        {otherSpecialists.map((specialist) => (
          <Grid item key={specialist.id} xs={12} sm={6} md={4}>
            <SpecialistCard specialist={specialist} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingPage;