export const mockData = {
  user: {
    name: "黒田 龍一",
    level: 5,
    xp: 450,
    goal: "weightloss", // 'health', 'weightloss', 'muscle'
    longTermGoal: {
        type: 'weight',
        target: 75.0,
        current: 77.5,
        unit: 'kg',
    }
  },
  condition: {
    sleep: { value: "7h30m", source: "HealthKit" },
    steps: { value: "8,210", source: "HealthKit" },
    heartRate: { value: "68bpm", source: "HealthKit" },
  },
  healthMetrics: {
      heartRate: 72,
      sleepScore: 85,
      steps: 6540,
  },
  healthTrends: [
      { week: '4週前', weight: 78.5, sleep: 75, prediction: 78.4 },
      { week: '3週前', weight: 78.2, sleep: 78, prediction: 78.1 },
      { week: '2週前', weight: 77.8, sleep: 82, prediction: 77.8 },
      { week: '前週', weight: 77.5, sleep: 85, prediction: 77.5, anomaly: true },
      { week: '今週', prediction: 77.2 },
  ],
  aiSuggestions: [
      { id: 1, priority: 1, context: ['tired', 'rainy'], text: 'お疲れのようですので、今日の運動は軽いストレッチに変更しませんか？無理は禁物です。' },
      { id: 2, priority: 1, context: ['default'], text: '体重が順調に減少傾向にあります。この調子で週末の会食も乗り切りましょう！' },
      { id: 3, priority: 2, context: ['default'], text: '睡眠スコアが安定して高いですね。この習慣を続けることが、日中のパフォーマンス向上に繋がります。' },
      { id: 4, priority: 3, context: ['sunny'], text: '今日は快晴です！目標歩数達成のため、一駅手前で降りて歩いてみてはいかがでしょうか？' },
  ],
  diagnosisSummary: {
    title: "AI診断サマリー",
    text: "あなたの遺伝子タイプは「エネルギー消費が緩やかなタイプ」です。タンパク質の摂取を意識し、定期的な運動を心がけることで、理想的な健康状態を維持できます。",
    lastUpdated: "2025/07/31",
    nutritionBalance: [
      { subject: 'タンパク質', value: 80, fullMark: 100 },
      { subject: '脂質', value: 60, fullMark: 100 },
      { subject: '炭水化物', value: 70, fullMark: 100 },
      { subject: 'ビタミン', value: 90, fullMark: 100 },
      { subject: 'ミネラル', value: 75, fullMark: 100 },
    ],
    idealBalance: [
      { subject: 'タンパク質', value: 90, fullMark: 100 },
      { subject: '脂質', value: 50, fullMark: 100 },
      { subject: '炭水化物', value: 60, fullMark: 100 },
      { subject: 'ビタミン', value: 85, fullMark: 100 },
      { subject: 'ミネラル', value: 80, fullMark: 100 },
    ],
  },
  todaysPlan: {
    title: "今日のプラン",
    meals: [
      { id: 'meal-0', time: "朝食", menu: "ギリシャヨーグルト、ナッツ、ベリー", completed: true, xp: 10 },
      { id: 'meal-1', time: "昼食", menu: "鶏胸肉のグリルサラダ", completed: false, xp: 15 },
      { id: 'meal-2', time: "夕食", menu: "サーモンの蒸し焼き、ブロッコリー", completed: false, xp: 15 },
    ],
    exercises: [
      { id: 'ex-0', name: "ウォーキング", duration: "30分", completed: true, xp: 20 },
      { id: 'ex-1', name: "スクワット", reps: "15回 x 3セット", completed: false, xp: 25 },
    ],
  },
  aiPartnerChat: {
    initialMessages: [
      {
        id: 1,
        sender: 'ai',
        text: "黒田さん、おはようございます！私「Opti」が、あなたの健康をサポートします。食事の記録や、健康に関する質問など、お気軽にお声がけください。",
        timestamp: "2025/07/31 09:00",
      }
    ],
    knowledgeBase: {
      "タンパク質": "タンパク質は筋肉や臓器を作る重要な栄養素です。鶏胸肉、豆腐、卵、ブロッコリーなどに多く含まれていますよ。",
      "スクワット": "スクワットは下半身全体を鍛える王道のトレーニングです。背筋を伸ばし、膝がつま先より前に出ないように意識するのがコツです。正しいフォームが分からない場合は、専門家にご相談くださいね。",
      "睡眠": "質の良い睡眠は、心身の回復に不可欠です。毎日同じ時間に寝起きし、寝る前はスマートフォンを控えるのがおすすめです。",
      "ありがとう": "どういたしまして！黒田さんのお役に立てて嬉しいです。",
    },
    cannedResponses: {
      default: "ごめんなさい、そのご質問にはまだ詳しくお答えできません。専門家にご相談いただくか、別の言葉で質問してみてください。",
      question: "ご質問ありがとうございます。担当の専門家が確認し、後ほど回答いたします。",
      food: "食事の記録、ありがとうございます！画像を解析しています...",
    }
  },
  detailedReport: {
    geneticTraits: [
      { name: "カフェイン代謝", result: "遅い", description: "カフェインの分解が遅いタイプです。午後の摂取は睡眠に影響する可能性があります。" },
      { name: "アルコール耐性", result: "低い", description: "アルコールの分解能力が低い傾向にあります。飲酒は控えめにしましょう。" },
      { name: "筋肉のつきやすさ", result: "つきやすい", description: "トレーニングの効果が出やすいタイプです。筋力トレーニングが効果的です。" },
    ],
    recommendedSupplements: [
        { name: "ビタミンD", reason: "あなたは遺伝的に、日光を浴びてもビタミンを作りにくい体質のためです。" },
        { name: "オメガ3脂肪酸", reason: "脂質代謝のリスクをサポートし、健康的な数値を維持するため推奨されます。" },
        { name: "マグネシウム", reason: "筋肉の回復を助け、トレーニング効果を最大化します。" },
    ],
    specialistComment: "遺伝子検査の結果、脂質代謝に関するリスクが若干見られます。飽和脂肪酸の摂取を控え、良質な脂質（魚、アボカドなど）を意識的に摂ることをお勧めします。運動習慣は素晴らしいので、ぜひ継続してください。",
  },
  personalPlan: {
    mealPlan: [
      { day: "月", breakfast: "オートミール", lunch: "鶏肉のグリル", dinner: "サバの塩焼き", time: 45, difficulty: 'Easy' },
      { day: "火", breakfast: "全粒粉パン", lunch: "豚しゃぶサラダ", dinner: "豆腐ハンバーグ", time: 60, difficulty: 'Medium' },
      { day: "水", breakfast: "ギリシャヨーグルト", lunch: "玄米おにぎり", dinner: "鶏と野菜のスープ", time: 50, difficulty: 'Easy' },
      { day: "木", breakfast: "スムージー", lunch: "海鮮丼", dinner: "豚肉の生姜焼き", time: 35, difficulty: 'Easy' },
      { day: "金", breakfast: "納豆ごはん", lunch: "ステーキ", dinner: "野菜炒め", time: 70, difficulty: 'Hard' },
      { day: "土", breakfast: "プロテインシェイク", lunch: "パスタ", dinner: "外食/自由", time: 40, difficulty: 'Medium' },
      { day: "日", breakfast: "ホットケーキ", lunch: "残り物", dinner: "カレーライス", time: 90, difficulty: 'Medium' },
    ],
    exercisePlan: [
      { day: "月", menu: "HIITカーディオ", duration: "20分", intensity: 'High', videoUrl: "#" },
      { day: "火", menu: "休息", duration: "", intensity: 'None', videoUrl: null },
      { day: "水", menu: "全身筋力トレーニング", duration: "45分", intensity: 'Medium', videoUrl: "#" },
      { day: "木", menu: "ヨガ/ストレッチ", duration: "30分", intensity: 'Low', videoUrl: "#" },
      { day: "金", menu: "休息", duration: "", intensity: 'None', videoUrl: null },
      { day: "土", menu: "長距離ウォーキング", duration: "60分", intensity: 'Low', videoUrl: "#" },
      { day: "日", menu: "休息", duration: "", intensity: 'None', videoUrl: null },
    ],
  },
  booking: {
    assignedSpecialist: { id: 1, name: "佐藤 由美子", title: "管理栄養士", expertise: "生活習慣病予防、栄養指導", support: "月1回のオンライン面談、および無制限のチャットサポートが含まれます。" },
    specialists: [
      { id: 1, name: "佐藤 由美子", title: "管理栄養士", expertise: "生活習慣病予防、栄養指導", available: true },
      { id: 2, name: "鈴木 誠", title: "フィットネストレーナー", expertise: "筋力トレーニング、コンディショニング", available: true },
      { id: 3, name: "高橋 明子", title: "臨床心理士", expertise: "メンタルヘルス、ストレス管理", available: false },
    ],
    availableSlots: ["2025-08-10T10:00", "2025-08-10T11:00", "2025-08-11T14:00", "2025-08-11T15:00"],
  },
  settings: {
    profile: {
      name: "黒田 龍一",
      email: "ryuichi.kuroda@example.com",
      birthday: "1975-04-22",
    },
    subscription: {
      planName: "プレミアムプラン",
      monthlyFee: "¥29,800",
      nextBillingDate: "2025-08-20",
      features: [
          "遺伝子検査に基づくパーソナルプラン",
          "担当専門家による月1回のカウンセリング",
          "AIパートナーによる24時間サポート",
          "無制限のチャット相談",
          "詳細な健康トレンド分析",
      ]
    },
    paymentMethod: {
      cardType: "Visa",
      last4: "1234",
      expiry: "12/28",
    },
    preferences: {
        dislikedFoods: ["パクチー", "セロリ", "ゴーヤ"],
    },
    notifications: {
        mealReminder: true,
        exerciseReminder: true,
        aiAdvice: true,
    },
    linkedApps: {
        healthKit: true,
        googleFit: false,
    }
  },
};