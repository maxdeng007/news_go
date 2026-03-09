export const mockNews = [
  {
    id: 1,
    title: "美联储加息预期降温 全球股市迎来反弹",
    summary: "美联储官员释放鸽派信号，市场预期加息周期即将结束",
    hot: true,
    timestamp: "10:30",
    category: "宏观",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "新能源车销量突破500万辆 比亚迪领跑国内市场",
    summary: "2024年新能源汽车销量同比增长35%，行业景气度持续回升",
    hot: true,
    timestamp: "09:45",
    category: "行业",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "AI芯片需求爆发 台积电季度营收创新高",
    summary: "受益于大模型算力需求，台积电5nm产能供不应求",
    hot: true,
    timestamp: "08:20",
    category: "科技",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "房地产政策持续松绑 一线城市成交回暖",
    summary: "多地取消限购限贷，房地产市场信心逐步恢复",
    hot: false,
    timestamp: "07:15",
    category: "地产",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "黄金价格突破历史新高 避险需求强劲",
    summary: "地缘政治风险上升，黄金ETF净流入创年内新高",
    hot: false,
    timestamp: "06:30",
    category: "贵金属",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop"
  }
];

export const mockHoldings = [
  {
    id: 1,
    name: "宁德时代",
    code: "300750.SZ",
    type: "股票",
    value: 1580000,
    change: 2.35,
    correlation: "positive",
    correlationScore: 85,
    relatedNews: [2],
    reason: "新能源车销量增长直接利好宁德时代动力电池业务"
  },
  {
    id: 2,
    name: "贵州茅台",
    code: "600519.SH",
    type: "股票",
    value: 2800000,
    change: -0.85,
    correlation: "negative",
    correlationScore: 65,
    relatedNews: [4],
    reason: "房地产回暖可能导致资金从消费板块流出"
  },
  {
    id: 3,
    name: "科大讯飞",
    code: "002230.SZ",
    type: "股票",
    value: 850000,
    change: 5.12,
    correlation: "positive",
    correlationScore: 78,
    relatedNews: [3],
    reason: "AI芯片需求爆发带动算力基础设施建设的增长"
  },
  {
    id: 4,
    name: "黄金ETF",
    code: "518880.SH",
    type: "基金",
    value: 520000,
    change: 1.28,
    correlation: "positive",
    correlationScore: 72,
    relatedNews: [5],
    reason: "避险情绪升温利好黄金等贵金属资产"
  }
];

export const mockAIResponses = {
  1: {
    newsId: 1,
    holdingId: 1,
    response: "美联储加息预期降温对宁德时代属于间接利好。加息周期结束意味着：1）融资成本下降，有利于企业扩产；2）成长股估值压制因素消除；3）人民币汇率可能企稳，有利于出口业务。建议关注一季报业绩指引。",
    insight: "中期利好",
    risk: "需关注新能源汽车补贴政策变化"
  },
  2: {
    newsId: 2,
    holdingId: 1,
    response: "新能源车销量突破500万辆对宁德时代是直接利好。数据显示：1）动力电池装机量同比增长40%；2）宁德时代市占率稳定在45%以上；3）储能业务增速超预期。建议逢低加仓。",
    insight: "强利好",
    risk: "原材料价格波动风险"
  },
  3: {
    newsId: 3,
    holdingId: 3,
    response: "AI芯片需求爆发对科大讯飞是重大利好。逻辑链：1）算力需求→服务器增长→AI软件需求；2）科大讯飞星火大模型持续迭代；3）教育、医疗等垂直场景落地加速。建议关注发布会。",
    insight: "强利好",
    risk: "竞争加剧"
  },
  4: {
    newsId: 4,
    holdingId: 2,
    response: "房地产政策松绑对贵州茅台影响复杂。短期看：1）地产链复苏可能分流消费资金；2）商务宴请需求可能提升；3）居民财富效应利好高端消费。整体中性偏谨慎。",
    insight: "中性偏谨慎",
    risk: "消费复苏不及预期"
  },
  5: {
    newsId: 5,
    holdingId: 4,
    response: "黄金价格创新高对黄金ETF是直接利好。支撑因素：1）地缘政治不确定性；2）美联储降息预期；3）央行购金需求。建议配置5-10%组合比例。",
    insight: "利好",
    risk: "短期涨幅过大可能回调"
  }
};

export const mockUserInfo = {
  name: "张先生",
  totalAssets: 5750000,
  dailyChange: 18500,
  dailyChangePercent: 0.32,
  riskLevel: "稳健型"
};
