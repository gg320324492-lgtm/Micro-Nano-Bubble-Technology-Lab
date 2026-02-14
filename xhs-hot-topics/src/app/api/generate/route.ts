import { NextRequest, NextResponse } from 'next/server';
import ollama, { Ollama } from 'ollama';

type AIProvider = 'none' | 'openai' | 'ollama';

const buildPrompt = (topic: string, category: string) => `你是小红书爆款文案专家。请围绕话题「${topic}」（分类：${category}）输出高质量中文内容，要求：
1) 产出 3 条不同风格文案（种草、观点、干货）
2) 每条包含：标题、正文、建议标签（3-6个）
3) 语气真实、有网感，不过度夸张，不编造事实
4) 尽量使用短段落、emoji 提升可读性
5) 最后补充 3 条配图建议（封面/中间/结尾）

请直接输出可读内容，不要解释你的思考过程。`;

const generateTemplates = (topic: string, category: string) => {
  const templates = [
    {
      title: `${topic}，你必须知道的那些事！`,
      content: `姐妹们！今天来聊聊${topic}🔥

📍最近这个话题真的超火
👀相信很多姐妹都已经注意到了

✨个人体验：
作为一个经常关注这个领域的人
我想说...真的很有感触！

💡小建议：
1. 首先要了解清楚
2. 不要盲目跟风
3. 结合自己的实际情况

📌总结：
总的来说，${topic}还是很值得关注的！

你们怎么看？评论区聊聊~

#${category} #热点 #分享`,
      style: "种草推荐",
    },
    {
      title: `关于${topic}，我有话说`,
      content: `最近${topic}也太火了吧！🔥

作为一名资深爱好者
今天必须来聊聊我的看法👇

📌核心观点：
这个话题真的很有讨论价值

✅优点：
• 确实很有帮助
• 值得我们关注
• 还有很多发展空间

⚠️需要注意：
理性看待，不要盲目

🤔你们觉得呢？
欢迎在评论区分享你们的想法！

#${category} #话题讨论 #真实分享`,
      style: "观点评论",
    },
    {
      title: `${topic}到底是怎么回事？一篇讲清楚`,
      content: `📖 纯干货分享

来聊聊最近超火的${topic}

🌟是什么？
简单来说，就是...

🌟为什么火？
1. 符合当下趋势
2. 解决了实际问题
3. 引发共鸣

🌟怎么办？
我的建议是...

💪行动建议：
不要犹豫，赶紧行动！

有问题评论区见~

#${category} #知识分享 #必看`,
      style: "知识科普",
    },
  ];

  return templates;
};

const generateImageSuggestions = (topic: string, category: string) => {
  return [
    {
      type: "封面",
      description: `精美的${category}主题封面图，配上"${topic}"标题`,
      keywords: [category, "简约", "ins风"],
    },
    {
      type: "内容图",
      description: `展示${topic}相关的实拍图或素材`,
      keywords: [topic, "真实", "生活化"],
    },
    {
      type: "结尾图",
      description: `引导关注的结尾图`,
      keywords: ["关注", "收藏", "点赞"],
    },
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      topic,
      category,
      apiKey,
      provider = 'none',
      openaiModel = 'gpt-4o-mini',
      ollamaModel = 'qwen2.5:32b',
      ollamaBaseUrl = 'http://127.0.0.1:11434',
    }: {
      topic?: string;
      category?: string;
      apiKey?: string;
      provider?: AIProvider;
      openaiModel?: string;
      ollamaModel?: string;
      ollamaBaseUrl?: string;
    } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: '请提供热点话题' },
        { status: 400 }
      );
    }

    const templates = generateTemplates(topic, category || '热点');
    const imageSuggestions = generateImageSuggestions(topic, category || '热点');

    await new Promise(resolve => setTimeout(resolve, 1000));

    let aiContent = null;
    let aiError: string | null = null;
    let aiProvider: AIProvider = 'none';
    let aiModel: string | null = null;

    if (provider === 'openai' && apiKey) {
      try {
        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: openaiModel,
            messages: [
              {
                role: 'system',
                content: '你是一个小红书文案专家，擅长写吸引人的种草笔记。'
              },
              {
                role: 'user',
                content: buildPrompt(topic, category || '热点')
              }
            ],
            max_tokens: 1000,
          }),
        });

        if (!aiResponse.ok) {
          throw new Error(`OpenAI 请求失败: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();
        if (aiData.choices && aiData.choices[0]) {
          aiContent = aiData.choices[0].message.content;
          aiProvider = 'openai';
          aiModel = openaiModel;
        }
      } catch (e) {
        console.error('AI API 调用失败:', e);
        aiError = 'OpenAI 调用失败，请检查 API Key、模型名或网络。';
      }
    }

    if (provider === 'ollama') {
      try {
        const ollamaClient = ollamaBaseUrl
          ? new Ollama({ host: ollamaBaseUrl.replace(/\/$/, '') })
          : ollama;

        const ollamaResponse = await ollamaClient.chat({
          model: ollamaModel,
          messages: [
            {
              role: 'user',
              content: buildPrompt(topic, category || '热点'),
            },
          ],
        });

        if (ollamaResponse.message?.content) {
          aiContent = ollamaResponse.message.content;
          aiProvider = 'ollama';
          aiModel = ollamaModel;
        } else {
          throw new Error('Ollama 响应缺少 message.content');
        }
      } catch (e) {
        console.error('Ollama API 调用失败:', e);
        aiError = 'Ollama 调用失败，请确认 Ollama 正在运行且模型已拉取。';
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        topic,
        category: category || '热点',
        templates,
        imageSuggestions,
        aiContent,
        aiError,
        aiProvider,
        aiModel,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('生成内容失败:', error);
    return NextResponse.json(
      { success: false, error: '生成内容失败' },
      { status: 500 }
    );
  }
}
