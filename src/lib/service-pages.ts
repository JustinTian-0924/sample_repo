export type ServicePageData = {
  id: 'study' | 'visa' | 'immigration'
  label: string
  eyebrow: string
  headline: string
  description: string
  scopeIntro: string
  topics: readonly {
    title: string
    description: string
    points: readonly string[]
  }[]
  preparationIntro: string
  preparation: readonly string[]
  questions: readonly { question: string; answer: string }[]
  resources: readonly { title: string; description: string; href: string }[]
  note: string
}

// These examples describe preparation, not eligibility rules or application outcomes.
export const servicePages = {
  study: {
    id: 'study',
    label: '留学规划',
    eyebrow: 'STUDY IN CANADA',
    headline: '找到方向，再规划你的申请。',
    description: '从学习兴趣、已有经历与未来目标出发，梳理本科、研究生申请及选校准备，让下一步更具体。',
    scopeIntro: '先明确希望探索的学习方向，再比较学校与项目，最后把需要核实的信息和准备事项逐一列清楚。',
    topics: [
      {
        title: '本科申请方向',
        description: '从感兴趣的课程与学习方式开始，整理希望进一步了解的学校和专业。',
        points: ['学习经历与兴趣梳理', '学校及课程信息比较', '申请事项与时间安排整理'],
      },
      {
        title: '研究生申请准备',
        description: '围绕已有专业背景、研究或实践经历，建立需要进一步核实的项目清单。',
        points: ['专业背景与目标方向梳理', '项目要求与材料信息核对', '个人经历与待准备事项整理'],
      },
      {
        title: '选校与专业比较',
        description: '把分散的信息放到同一份比较清单中，帮助自己提出更具体的问题。',
        points: ['课程设置与学习体验比较', '城市、生活安排与预算问题整理', '学校官网及官方信息来源核对'],
      },
    ],
    preparationIntro: '不必在第一次交流前做完所有决定。先写下已有的想法，哪些还不确定，也可以一起列出来。',
    preparation: [
      '希望了解的学习阶段，以及感兴趣的专业方向。',
      '已有学习经历的简要概述，不填写真实证件或敏感资料。',
      '期待的开始时间，以及已经完成的准备。',
      '最想比较的学校、项目或三个关键问题。',
    ],
    questions: [
      { question: '还没有选定专业，可以从哪里开始？', answer: '先列出喜欢的课程、愿意深入探索的问题，以及已经积累的经历，再整理想比较的专业方向。当前阶段可以保留多个选择，不必急于给出最终答案。' },
      { question: '准备清单是否就是学校要求的申请材料？', answer: '不是。这里的清单只帮助整理咨询问题。具体申请材料、截止日期和要求，应逐一核对目标院校与项目的官方页面。' },
      { question: '是否可以保证拿到录取？', answer: '不能。录取由院校决定，本演示网站不承诺结果，也不提供虚构成功率。服务范围应围绕信息整理与准备过程明确说明。' },
    ],
    resources: [
      {
        title: 'IRCC：指定学习机构查询（英文）',
        description: '前往官方页面了解指定学习机构信息；具体课程与录取要求仍需核对学校官网。',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html',
      },
    ],
    note: '本页为虚构品牌的服务展示。申请条件、课程信息和时间要求以相关院校及主管机构的最新说明为准。',
  },
  visa: {
    id: 'visa',
    label: '签证协助',
    eyebrow: 'VISA PREPARATION',
    headline: '把信息理清，让准备更有序。',
    description: '围绕学习许可、在读与续签相关问题，整理待核实的信息、材料事项和时间安排，为后续沟通做好准备。',
    scopeIntro: '这一步重点是组织信息与问题。具体身份、申请条件、材料和期限，应回到官方说明或由具备相应资格的专业人士核实。',
    topics: [
      {
        title: '学习许可信息准备',
        description: '先了解官方信息入口，再列出与你的学习计划相关、需要进一步确认的问题。',
        points: ['学习计划与当前问题梳理', '官方说明与信息来源整理', '待核实事项记录'],
      },
      {
        title: '在读与续签问题整理',
        description: '把学习进度、已有安排和不确定的问题分别记录，为后续专业沟通提供清晰的背景。',
        points: ['现有安排与时间节点记录', '变化事项与疑问汇总', '续签相关官方入口核对'],
      },
      {
        title: '材料与时间管理',
        description: '用清单区分已经准备、仍需了解和有待确认的事项，减少信息遗漏。',
        points: ['材料事项分类与状态记录', '官方期限与个人安排核对', '沟通问题与后续事项清单'],
      },
    ],
    preparationIntro: '先整理大致背景与问题即可。不要在演示网站上传证件、身份文件或财务资料。',
    preparation: [
      '希望了解的是首次学习许可、续签，还是其他相关问题。',
      '当前学习安排和计划中的变化，用概述即可。',
      '自己记录的时间节点，以及仍不确定的事项。',
      '已经查阅的官方页面和最希望确认的问题。',
    ],
    questions: [
      { question: '网站能判断我应该提交哪一种申请吗？', answer: '不能作个案判断。页面仅帮助整理问题和查找官方入口；具体申请类别与个人情况有关，应结合最新官方说明并向适当的专业人士核实。' },
      { question: '这里提供固定的材料清单或办理时长吗？', answer: '不提供。具体要求和处理情况可能变化，演示页面不复制固定期限或个案材料要求，请从下方官方入口继续核实。' },
      { question: '咨询准备清单会自动提交给后台吗？', answer: '不会。这是一份阅读用清单，当前没有收集或发送个人资料的表单。本演示网站也不保证任何申请结果。' },
    ],
    resources: [
      {
        title: 'IRCC：学习许可（英文）',
        description: '查看加拿大政府的学习许可信息入口。',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html',
      },
      {
        title: 'IRCC：学习许可延期相关信息（英文）',
        description: '查看加拿大政府关于学习许可延期的公开说明。',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/extend-study-permit.html',
      },
    ],
    note: '本页不提供个性化法律意见，不认定身份或申请资格，不替代官方申请说明及有资质的专业意见。',
  },
  immigration: {
    id: 'immigration',
    label: '移民信息',
    eyebrow: 'EXPLORE YOUR OPTIONS',
    headline: '先了解信息，再讨论未来。',
    description: '把长期目标、公开信息与个人疑问分开整理，明确哪些可以自行了解，哪些需要进一步的专业咨询。',
    scopeIntro: '移民规划涉及个人情况与持续变化的信息。本页只展示公开信息整理和咨询准备的方式，不作资格评分、途径推荐或结果保证。',
    topics: [
      {
        title: '目标与问题梳理',
        description: '从希望了解的方向出发，记录长期目标、现阶段想法和需要讨论的关键问题。',
        points: ['学习、工作与生活目标概述', '已知信息与疑问分别记录', '需要进一步确认的问题清单'],
      },
      {
        title: '公开信息了解',
        description: '通过官方入口了解信息范围，避免把概览内容直接套用到个人情况。',
        points: ['官方信息入口整理', '概览与个案判断的区别', '信息来源和核实事项记录'],
      },
      {
        title: '专业咨询准备',
        description: '在提出个案问题前，先了解专业服务的范围与代表资格核查入口。',
        points: ['咨询目的与背景概述', '服务范围与沟通问题整理', '专业代表资格核查入口'],
      },
    ],
    preparationIntro: '目标可以逐步明确。先记录想了解什么，再决定需要向谁核实；不要在演示网站填写真实身份信息。',
    preparation: [
      '希望了解的主题，以及长期学习、工作或生活目标。',
      '当前背景的非敏感概述，不包含证件号码或真实文件。',
      '已经了解的信息来源，以及不确定的内容。',
      '希望专业人士进一步解释的问题与服务范围。',
    ],
    questions: [
      { question: '网站会自动计算资格或推荐移民项目吗？', answer: '不会。本项目不开发自动移民资格评分，也不根据网页内容为个人认定资格或推荐具体途径。这里的清单仅帮助准备问题。' },
      { question: 'MaplePath 是否代表真实持牌顾问？', answer: '不是。MaplePath 是虚构的练习品牌，网站不暗示真实专业执照或代表身份。涉及专业服务时，应自行核实服务提供者的资格和服务范围。' },
      { question: '如何继续了解专业代表资格？', answer: '可以从下方加拿大政府的官方核查入口开始了解。具体资格、服务安排与个人事项，请以官方信息和专业确认结果为准。' },
    ],
    resources: [
      {
        title: 'IRCC：移民加拿大（英文）',
        description: '前往加拿大政府的移民公开信息入口。',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html',
      },
      {
        title: 'IRCC：核实代表资格（英文）',
        description: '了解加拿大政府提供的专业代表资格核查信息。',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/choose/authorized.html',
      },
    ],
    note: '本页仅展示公开信息整理方式，不提供移民资格认定、个案法律意见、专业代理服务或获批承诺。',
  },
} satisfies Record<ServicePageData['id'], ServicePageData>
