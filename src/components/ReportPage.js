import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography, List, ListItem, ListItemText, Chip, Divider, Box, Tooltip, IconButton, Alert, Link } from '@mui/material';
import { mockData } from '../data/mockData';
import ScienceIcon from '@mui/icons-material/Science';
import RecommendIcon from '@mui/icons-material/Recommend';
import CommentIcon from '@mui/icons-material/Comment';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const TraitCard = ({ trait, user }) => {
    const getPersonalizedAction = (trait) => {
        switch (trait.name) {
            case "カフェイン代謝":
                return "15時以降のコーヒーは避け、ハーブティーなどを試しましょう。";
            case "アルコール耐性":
                return "飲酒は週2回まで、1回の量はビール1杯程度に留めることを推奨します。";
            case "筋肉のつきやすさ":
                if (user.goal === 'muscle') {
                    return "あなたの目標達成のため、トレーニング後の30分以内にプロテインを20g摂取し、筋肥大を最大化しましょう。";
                } else if (user.goal === 'weightloss') {
                    return "減量目標達成のため、夕食の炭水化物を半分にし、代わりに野菜を多く摂ることを推奨します。";
                }
                return "健康維持のため、1日8000歩を目安に歩くことから始め、週2回の軽い筋トレを継続することが効果的です。";
            default:
                return "専門家にご相談ください。";
        }
    };

    const getChipColor = (result) => {
        switch (result) {
            case '速い':
            case '高い':
            case 'つきやすい':
                return 'success';
            case '標準':
                return 'info';
            case '遅い':
            case '低い':
            case 'つきにくい':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                        <Typography variant="h6" component="h3">{trait.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{trait.description}</Typography>
                    </Box>
                    <Chip label={trait.result} color={getChipColor(trait.result)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', p: 1.5, borderRadius: 1, width: '100%' }}>
                    <LightbulbIcon color="primary" sx={{ mr: 1.5, fontSize: '1.5rem' }} />
                    <Typography variant="body2" color="text.primary">
                        <strong>推奨アクション:</strong> {getPersonalizedAction(trait)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const ReportPage = () => {
  const { detailedReport, user } = mockData;
  const userGoalText = user.goal === 'muscle' ? '筋力増強' : user.goal === 'weightloss' ? '減量' : '健康維持';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>診断レポート</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScienceIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5">遺伝的特徴とあなたへのアクションプラン</Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
                現在の目標「{userGoalText}」に合わせて最適化されたアドバイスです。
            </Alert>
            {detailedReport.geneticTraits.map((trait, index) => (
                <TraitCard key={index} trait={trait} user={user} />
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              avatar={<RecommendIcon color="primary" />}
              title="推奨される栄養素・サプリメント"
            />
            <CardContent>
              <Alert severity="warning" sx={{ mb: 2 }}>
                サプリメントの摂取は、必ず医師または薬剤師にご相談の上、適切な用法・容量を守ってください。
              </Alert>
              <List>
                {detailedReport.recommendedSupplements.map((sup, index) => (
                  <ListItem key={index} secondaryAction={
                    <Tooltip title="詳細情報" placement="top">
                      <IconButton edge="end" aria-label="reason">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }>
                    <ListItemText 
                        primary={sup.name} 
                        secondary={`→ ${sup.reason}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              avatar={<CommentIcon color="primary" />}
              title="専門家からのコメント"
            />
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>監修：管理栄養士 鈴木〇〇</Typography>
                </Box>
                <Typography variant="body2" component="div">
                    <ul>
                        <li><strong>脂質代謝</strong>が遺伝的に得意ではないようです。特にバターや肉の脂身などに含まれる<strong>飽和脂肪酸</strong>の摂取は控えめにしましょう。</li>
                        <li>トレーニングの効果を最大化するため、<strong>週2回</strong>の筋トレ後に<strong>タンパク質</strong>を意識して摂取すると良いでしょう。</li>
                        <li>全体的にバランスの取れた食事を心がけ、特に緑黄色野菜を積極的に取り入れることをお勧めします。</li>
                    </ul>
                </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportPage;