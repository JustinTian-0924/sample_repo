// Homepage content is static for this milestone; CMS integration comes later.
export const siteNavigation = [
  { label: '留学规划', href: '/#study' },
  { label: '签证协助', href: '/#visa' },
  { label: '移民信息', href: '/#immigration' },
  { label: '关于我们', href: '/#about' },
  { label: '常见问题', href: '/#faq' },
] as const

export const services = [
  {
    id: 'study',
    number: '01',
    category: 'STUDY IN CANADA',
    title: '让申请，有方向',
    name: '留学规划',
    description: '从你的兴趣、学习经历与未来目标出发，把选校、专业选择和申请准备串成一条清晰的路线。',
    items: ['学习目标与专业方向梳理', '本科及研究生申请准备', '申请时间线与材料清单'],
    linkLabel: '准备留学咨询',
  },
  {
    id: 'visa',
    number: '02',
    category: 'VISA PREPARATION',
    title: '让准备，更有序',
    name: '签证协助',
    description: '把需要了解的信息、需要核对的材料和待解决的问题分开整理，让每一步准备都有迹可循。',
    items: ['学习许可相关信息整理', '续签与材料准备问题梳理', '官方信息来源核对'],
    linkLabel: '准备签证咨询',
  },
  {
    id: 'immigration',
    number: '03',
    category: 'EXPLORE YOUR OPTIONS',
    title: '让未来，多些了解',
    name: '移民信息',
    description: '先了解信息范围，再整理个人问题。涉及资格判断与个案意见时，应向具备相应资格的专业人士核实。',
    items: ['公开信息与咨询范围介绍', '个人目标与待确认问题整理', '后续专业咨询准备'],
    linkLabel: '准备移民咨询',
  },
] as const

export const processSteps = [
  { title: '初步咨询', description: '从一个问题开始，确认你想了解的方向。' },
  { title: '需求了解', description: '整理学习背景、目标与时间安排。' },
  { title: '方案讨论', description: '讨论准备路径，列出仍需核实的信息。' },
  { title: '服务确认', description: '明确服务范围、责任与沟通方式。' },
  { title: '后续跟进', description: '记录进展，让下一步始终清楚。' },
] as const

export const frequentlyAskedQuestions = [
  {
    question: '第一次咨询前，需要准备什么？',
    answer: '先整理感兴趣的服务方向、希望达成的目标和大致时间安排即可。可以先列出最想了解的三个问题，不必一开始就准备全部申请材料。',
  },
  {
    question: '还没有确定学校或专业，也可以先了解吗？',
    answer: '可以先从兴趣、已有学习经历和希望探索的方向开始。明确问题本身就是规划的一部分，不需要为了第一次交流而仓促做出选择。',
  },
  {
    question: '留学规划、签证协助和移民信息有什么区别？',
    answer: '留学规划侧重学习目标和申请准备；签证协助侧重相关信息与材料问题的整理；移民信息侧重公开资料和专业咨询准备。它们相互关联，但服务范围应分别说明。',
  },
  {
    question: '网站是否承诺录取、签证或移民申请结果？',
    answer: '不承诺。申请结果由相关院校或主管机构决定。本网站不作资格认定，不提供个性化移民法律意见，也不展示虚构的成功率或客户评价。',
  },
  {
    question: '可以在这里上传护照、成绩单等资料吗？',
    answer: '请勿在本演示网站提供护照、财务文件、成绩单或其他真实个人资料。当前网站用于展示服务信息与练习开发，不接收真实咨询申请。',
  },
  {
    question: '这里的信息可以代替官方要求吗？',
    answer: '不能。网站内容仅为演示性概览。涉及具体申请条件、所需材料和个案判断时，应核对相关院校、主管机构的最新公开信息，并咨询具备相应资格的专业人士。',
  },
] as const
