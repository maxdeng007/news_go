export const mockNews = [
  {
    id: 1,
    title: "美联储加息预期降温 全球股市迎来反弹",
    summary: "美联储官员释放鸽派信号，市场预期加息周期即将结束",
    hot: true,
    timestamp: "10:30",
    category: "宏观",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    badge: "利好",
    deepAnalysis: "美联储主席鲍威尔在最新讲话中释放鸽派信号，表示通胀压力有所缓解，加息周期可能接近尾声。这一表态超出市场预期，导致全球风险资产普遍上涨。美元指数大幅回落，新兴市场货币压力减轻。",
    impact: "对于您的港股持仓，美联储政策转向将直接利好科技股和成长股。腾讯控股有望受益于流动性改善，Meta平台公司也将获得估值修复机会。建议关注近期回调带来的加仓机会。"
  },
  {
    id: 2,
    title: "新能源车销量突破500万辆 比亚迪领跑国内市场",
    summary: "2024年新能源汽车销量同比增长35%，行业景气度持续回升",
    hot: true,
    timestamp: "09:45",
    category: "行业",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop",
    badge: "利好",
    deepAnalysis: "中汽协数据显示，2024年新能源汽车销量突破500万辆大关，同比增长35%。比亚迪以超过150万辆的销量位居榜首，市占率超过30%。行业景气度持续回升，产业链各环节均呈现供需两旺态势。",
    impact: "新能源车销量快速增长将带动整个产业链业绩提升。您的持仓中虽然目前没有直接的新能源车标的，但相关供应链企业将受益于行业高景气度。建议关注回调后的配置机会。"
  },
  {
    id: 3,
    title: "AI芯片需求爆发 台积电季度营收创新高",
    summary: "受益于大模型算力需求，台积电5nm产能供不应求",
    hot: true,
    timestamp: "08:20",
    category: "科技",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
    badge: "利好",
    deepAnalysis: "台积电发布财报显示，受益于AI芯片需求爆发，第三季度营收创历史新高。5nm和7nm先进制程产能利用率超过95%，AI相关收入占比已超过30%。公司上调全年营收预期。",
    impact: "AI芯片需求爆发将持续推动全球算力基础设施建设。您的Meta平台公司持仓将直接受益于AI技术商业化进程，广告业务有望借助AI实现效率提升。Graham环球投资基金也配置了相关AI标的。"
  },
  {
    id: 4,
    title: "房地产政策持续松绑 一线城市成交回暖",
    summary: "多地取消限购限贷，房地产市场信心逐步恢复",
    hot: false,
    timestamp: "07:15",
    category: "地产",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
    badge: "中性",
    deepAnalysis: "近期多地密集出台房地产松绑政策，一线城市二手房成交量环比增长20%以上。政策底已现，但市场底仍需时间验证。开发商资金链压力有所缓解，行业信用风险边际改善。",
    impact: "房地产政策回暖可能带来资金轮动效应，部分资金可能从高股息板块流向地产相关标的。但对于您的科技和基金持仓影响相对中性，建议保持现有配置。"
  },
  {
    id: 5,
    title: "黄金价格突破历史新高 避险需求强劲",
    summary: "地缘政治风险上升，黄金ETF净流入创年内新高",
    hot: false,
    timestamp: "06:30",
    category: "贵金属",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop",
    badge: "利好",
    deepAnalysis: "受地缘政治风险上升和美元走弱影响，黄金价格突破历史新高。全球央行持续增持黄金储备，ETF持仓创年内新高。短期避险需求和长期货币多元化共同推动金价上涨。",
    impact: "黄金价格上涨将直接利好您的泰康开泰基金配置。该基金持有一定比例的贵金属相关资产，将从金价上涨中受益。建议逢低增持黄金相关资产以分散风险。"
  }
];

export const mockHoldings = [
  {
    id: 1,
    name: "腾讯控股",
    code: "HK00700",
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
    name: "Meta平台公司",
    code: "META",
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
    name: "Graham环球投资基金-多元阿尔法独立投资组合",
    code: "L02960",
    type: "基金",
    value: 850000,
    change: null,
    correlation: "positive",
    correlationScore: 78,
    relatedNews: [3],
    reason: "AI芯片需求爆发带动算力基础设施建设的增长"
  },
  {
    id: 4,
    name: "泰康开泰月度定开稳定入息基金A1类累积(港币)",
    code: "HK0000965993",
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
