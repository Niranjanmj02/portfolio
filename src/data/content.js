// src/data/content.js
// Single source of truth for every piece of copy on the site.
// Mirrors Niranjan_AI_Engineer_3years.pdf — do not add claims that aren't in the resume.

export const profile = {
  name: 'Niranjan M',
  role: 'AI · ML · Gen AI Engineer',
  disciplines: ['Python', 'TensorFlow', 'LangGraph', 'RAG', 'NLP', 'Computer Vision'],
  years: '3+ years',
  location: 'Mysuru, Karnataka',
  intro:
    'Building production ML models, Generative AI systems, and LLM-powered services. Currently at Examic EdTech.',
  email: 'niranjanm0920@gmail.com',
  phone: '+91 6363837187',
  github: 'https://github.com/Niranjanmj02',
  githubLabel: 'github.com/Niranjanmj02',
  linkedin: 'https://www.linkedin.com/in/niranjan-m-1ba74b258/',
  linkedinLabel: 'linkedin.com/in/niranjan-m',
  resume: '/Niranjan_M_AI_Engineer.pdf',
};

export const stats = [
  { value: 3, suffix: '+', label: 'years shipping AI' },
  { value: 3, suffix: '', label: 'companies' },
  { value: 1, suffix: '', label: 'IEEE publication' },
  { value: 1, suffix: '', label: 'Azure certification' },
];

export const about = {
  body:
    'AI / ML / Gen AI Engineer with 3+ years building production ML models, Generative AI systems, and LLM-powered services in Python. Ships classical ML, Gen AI, and LLMOps pipelines at Examic; earlier remote Gen AI work at Outlier. IEEE computer vision research at ASIANCON 2024. Microsoft Certified: Azure Data Science Associate.',
  pillars: [
    {
      k: 'Classical ML',
      v: 'TensorFlow, Scikit-learn, Hugging Face BERT, MediaPipe CV',
    },
    {
      k: 'Generative AI',
      v: 'LangGraph, LangChain, RAG, prompt engineering, LLM evaluation, RLHF/SFT',
    },
    {
      k: 'LLMOps',
      v: 'Git, Docker, CI/CD, Apache Airflow, FastAPI',
    },
  ],
};

export const experience = [
  {
    company: 'Examic EdTech',
    legal: 'Examic EdTech Private Limited',
    role: 'AI / ML / Gen AI Engineer',
    period: 'July 2024 — Present',
    current: true,
    bullets: [
      'Built Neural Nexus, a hybrid-RAG Gen AI knowledge engine integrating LLMs with Neo4j, PostgreSQL and Redis on FastAPI, with parallel retrieval, graph analytics and SSE streaming for grounded production responses.',
      'Architected RAG pipelines with adaptive chunking, metadata filtering and graph-augmented context to improve answer faithfulness; monitored retrieval hit rate, latency and grounding errors in live sessions.',
      'Shipped LangChain / LangGraph chatbots with Ollama / vLLM self-hosting and Google Gemini fallback for cost-aware Generative AI support workflows.',
      'Applied zero-shot and few-shot prompt templates with chain-of-thought patterns; refined prompts using A/B output quality scoring, format checks and stakeholder feedback loops.',
      'Developed NLP models with Hugging Face BERT and FastAPI for semantic similarity, grammar checking and automated PDF question generation.',
      'Trained and deployed computer vision proctoring with Google MediaPipe for multi-person and object detection; built Gemini multimodal voice agents for real-time spoken AI interactions.',
      'Designed Apache Airflow ETL DAGs for UAT-to-cloud migration and DWH upserts, standardising Python validation pipelines feeding downstream ML workloads.',
      'Owned LLMOps: Git, Docker builds, CI/CD gates, structured logging and latency / quality monitoring for production LLM services on Azure.',
    ],
    stack: [
      'Python', 'FastAPI', 'LangGraph', 'LangChain', 'RAG', 'TensorFlow',
      'Hugging Face', 'MediaPipe', 'Gemini', 'OpenAI API', 'Neo4j',
      'PostgreSQL', 'Airflow', 'NLP', 'Computer Vision',
    ],
  },
  {
    company: 'Codevice Solutions',
    legal: 'Codevice Solutions Private Limited',
    role: 'ML Engineering Intern',
    period: 'March 2024 — July 2024',
    current: false,
    bullets: [
      'Built Python data and REST API services for inventory and transaction datasets, with validation and structured preprocessing for downstream ML and analytics use cases.',
      'Designed modular backend data layers with SQL integrations and Git-based delivery, enabling reusable pipelines for reporting and model-ready feature extraction.',
      'Supported feature extraction and dataset cleanup workflows feeding Scikit-learn analytics modules and internal reporting dashboards.',
    ],
    stack: ['Python', 'REST APIs', 'SQL', 'Data Preprocessing', 'Git', 'ML Pipelines'],
  },
  {
    company: 'Outlier',
    legal: 'Outlier',
    role: 'Gen AI Engineer · Remote',
    period: 'July 2023 — March 2024',
    current: false,
    bullets: [
      'Ran prompt engineering and LLM evaluation (A/B comparison) on factuality, format, latency and task completion for agentic Gen AI workflows.',
      'Built RLHF / SFT dataset pipelines and ML classification workflows for multimodal model alignment and quality scoring on client batches.',
      'Refined chain composition, guardrails and evaluation rubrics; shipped Python FastAPI preprocessing services with Git-tracked delivery QA.',
      'Preprocessed training datasets and supported LLM fine-tuning deliveries with validation, error handling and batch quality checks across multilingual domains.',
    ],
    stack: [
      'Python', 'LangChain', 'LangGraph', 'LLM Evaluation', 'RLHF', 'SFT',
      'Agentic AI', 'FastAPI', 'Prompt Engineering',
    ],
  },
];

export const projects = [
  {
    title: 'Neural Nexus',
    kind: 'Hybrid-RAG knowledge engine',
    flagship: true,
    description:
      'Gen AI knowledge engine wiring LLMs into Neo4j, PostgreSQL and Redis behind FastAPI. Parallel retrieval, graph analytics and SSE streaming keep production answers grounded and fast.',
    tags: ['Neo4j', 'PostgreSQL', 'Redis', 'FastAPI', 'RAG', 'SSE'],
    context: 'Examic EdTech · internal',
  },
  {
    title: 'DeepWeed CNN',
    kind: 'Published computer vision research',
    description:
      'VGG16-based deep learning model for weed classification. Presented at 2024 ASIANCON and published on IEEE Xplore.',
    tags: ['TensorFlow', 'VGG16', 'CNN', 'Python'],
    context: 'IEEE ASIANCON 2024',
    link: 'https://ieeexplore.ieee.org/',
    linkLabel: 'IEEE Xplore',
  },
  {
    title: 'AI Proctoring System',
    kind: 'Real-time computer vision',
    description:
      'Google MediaPipe pipeline detecting multiple persons and prohibited objects during live exams, streamed over LiveKit.',
    tags: ['MediaPipe', 'LiveKit', 'OpenCV', 'Python'],
    context: 'Examic EdTech · internal',
  },
  {
    title: 'Gemini Voice Agent',
    kind: 'Multimodal conversational AI',
    description:
      'Real-time spoken AI built on Google Gemini multimodal and LiveKit Agents, handling live two-way voice interaction.',
    tags: ['Gemini', 'LiveKit Agents', 'WebRTC', 'Async Python'],
    context: 'Examic EdTech · internal',
  },
  {
    title: 'NLP Question Generator',
    kind: 'Applied NLP service',
    description:
      'Hugging Face BERT behind FastAPI for semantic similarity, grammar checking and automated question generation from PDFs.',
    tags: ['Hugging Face', 'BERT', 'FastAPI', 'NLP'],
    context: 'Examic EdTech · internal',
  },
  {
    title: 'Airflow ETL Platform',
    kind: 'Data engineering',
    description:
      'Apache Airflow DAGs for UAT-to-cloud migration and data-warehouse upserts, with Python validation feeding ML and analytics workloads.',
    tags: ['Airflow', 'Python', 'PostgreSQL', 'Azure'],
    context: 'Examic EdTech · internal',
  },
];

// w = visual weight in the skill cloud (1 default, 2 strong, 3 signature)
export const skillGroups = [
  {
    id: 'genai',
    label: 'Gen AI & LLM',
    items: [
      { n: 'Generative AI', w: 3 }, { n: 'LangGraph', w: 3 }, { n: 'LangChain', w: 2 },
      { n: 'RAG', w: 3 }, { n: 'RAG Architecture', w: 2 }, { n: 'Agentic AI', w: 2 },
      { n: 'LLM', w: 2 }, { n: 'Prompt Engineering', w: 2 }, { n: 'Few-Shot Prompting' },
      { n: 'LLM Evaluation', w: 2 }, { n: 'RLHF' }, { n: 'SFT' },
      { n: 'Ollama' }, { n: 'vLLM' },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning & Deep Learning',
    items: [
      { n: 'TensorFlow', w: 3 }, { n: 'PyTorch', w: 2 }, { n: 'Scikit-learn', w: 2 },
      { n: 'Pandas' }, { n: 'Feature Engineering' }, { n: 'Model Training' },
      { n: 'Model Evaluation' }, { n: 'CNN', w: 2 }, { n: 'Supervised Learning' },
    ],
  },
  {
    id: 'cv',
    label: 'AI / NLP & Computer Vision',
    items: [
      { n: 'NLP', w: 3 }, { n: 'Hugging Face Transformers', w: 2 }, { n: 'BERT', w: 2 },
      { n: 'Computer Vision', w: 3 }, { n: 'OpenCV' }, { n: 'Google MediaPipe', w: 2 },
      { n: 'Object Detection' }, { n: 'Multimodal AI', w: 2 },
    ],
  },
  {
    id: 'eng',
    label: 'ML Engineering & APIs',
    items: [
      { n: 'Python', w: 3 }, { n: 'FastAPI', w: 3 }, { n: 'REST APIs' },
      { n: 'Async Python', w: 2 }, { n: 'WebSockets' }, { n: 'SSE Streaming', w: 2 },
      { n: 'OpenAI API', w: 2 }, { n: 'Google Gemini', w: 2 },
    ],
  },
  {
    id: 'ops',
    label: 'Data Engineering & MLOps',
    items: [
      { n: 'Apache Airflow', w: 3 }, { n: 'ETL Pipelines', w: 2 }, { n: 'PostgreSQL', w: 2 },
      { n: 'Neo4j', w: 2 }, { n: 'Redis' }, { n: 'Azure Machine Learning', w: 2 },
      { n: 'Azure Blob Storage' }, { n: 'Git', w: 2 }, { n: 'Docker', w: 2 },
      { n: 'CI/CD' }, { n: 'LLMOps', w: 3 }, { n: 'pytest' },
    ],
  },
];

export const research = {
  publication: {
    title: 'Deep learning for weed classification',
    venue: '2024 ASIANCON',
    index: 'IEEE Xplore',
    note: 'Computer vision research using a VGG16 convolutional architecture.',
    link: 'https://ieeexplore.ieee.org/',
  },
  education: {
    school: 'Amrita School of Computing, Mysuru',
    parent: 'Amrita Vishwa Vidyapeetham',
    degree: 'Integrated BCA — MCA',
    period: '2019 — 2024',
    courses: [
      'Machine Learning',
      'Data Structures and Algorithms',
      'Database Management Systems',
      'Statistics for Data Science',
    ],
  },
  certifications: [
    { name: 'Microsoft Certified: Azure Data Science Associate', issuer: 'Microsoft' },
    { name: 'The Joy of Computing using Python', issuer: 'NPTEL' },
  ],
};

export const sections = [
  { id: 'home', n: '00', label: 'home' },
  { id: 'about', n: '01', label: 'about' },
  { id: 'experience', n: '02', label: 'experience' },
  { id: 'work', n: '03', label: 'work' },
  { id: 'skills', n: '04', label: 'skills' },
  { id: 'research', n: '05', label: 'research' },
  { id: 'contact', n: '06', label: 'contact' },
];
