'use client';

import { useState, useEffect } from 'react';

interface HotTopic {
  id: number;
  title: string;
  hot: number;
  category: string;
}

interface ContentTemplate {
  title: string;
  content: string; 
  style: string;
}

type AIProvider = 'none' | 'openai' | 'ollama';

interface GeneratedContent {
  topic: string;
  category: string;
  templates: ContentTemplate[];
  imageSuggestions: { type: string; description: string; keywords: string[] }[];
  aiContent?: string | null;
  aiError?: string | null;
  aiProvider?: AIProvider;
  aiModel?: string | null;
}

export default function ContentGenerator() {
  const [topics, setTopics] = useState<HotTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<HotTopic | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<AIProvider>('none');
  const [openaiModel, setOpenaiModel] = useState('gpt-4o-mini');
  const [ollamaModel, setOllamaModel] = useState('qwen2.5:32b');
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState('http://127.0.0.1:11434');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const providerLabelMap: Record<AIProvider, string> = {
    none: '仅模板（不调用大模型）',
    openai: 'OpenAI API（云端）',
    ollama: 'Ollama（本地模型）',
  };

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/hot-topics');
        const data = await res.json();
        if (data.success) {
          setTopics(data.data);
        }
      } catch (error) {
        console.error('获取热点失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const generateContent = async (topic: HotTopic) => {
    setSelectedTopic(topic);
    setGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.title,
          category: topic.category,
          provider,
          apiKey: provider === 'openai' ? apiKey || null : null,
          openaiModel,
          ollamaModel,
          ollamaBaseUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedContent(data.data);
      }
    } catch (error) {
      console.error('生成内容失败:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyContent = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const refreshTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hot-topics');
      const data = await res.json();
      if (data.success) {
        setTopics(data.data);
      }
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            📕 小红书内容生成器
          </h1>
          <p className="text-gray-600">选择热点话题，AI 为你生成推文文案</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">🤖 AI 模式</span>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as AIProvider)}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
                >
                  <option value="none">仅模板（免费）</option>
                  <option value="openai">OpenAI API（云端）</option>
                  <option value="ollama">Ollama（本地）</option>
                </select>
              </div>

              <button
                onClick={refreshTopics}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? '加载中...' : '🔄 刷新热点'}
              </button>
            </div>

            {provider === 'openai' && (
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">OpenAI API Key</p>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">OpenAI 模型名</p>
                  <input
                    value={openaiModel}
                    onChange={(e) => setOpenaiModel(e.target.value)}
                    placeholder="gpt-4o-mini"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
                  />
                </div>
              </div>
            )}

            {provider === 'ollama' && (
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ollama 模型名</p>
                  <input
                    value={ollamaModel}
                    onChange={(e) => setOllamaModel(e.target.value)}
                    placeholder="qwen2.5:32b"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ollama 地址</p>
                  <input
                    value={ollamaBaseUrl}
                    onChange={(e) => setOllamaBaseUrl(e.target.value)}
                    placeholder="http://127.0.0.1:11434"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-300"
                  />
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500">
              当前选择：{providerLabelMap[provider]}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🔥 实时热点话题
            </h2>

            {loading && topics.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                加载中...
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {topics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => generateContent(topic)}
                    disabled={generating}
                    className={`w-full text-left p-4 rounded-xl transition-all hover:shadow-md ${
                      selectedTopic?.id === topic.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-gray-50 hover:bg-pink-50'
                    } ${generating ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-lg font-bold ${
                        index < 3 ? 'text-pink-500' : 'text-gray-400'
                      } ${selectedTopic?.id === topic.id ? 'text-white' : ''}`}>
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          selectedTopic?.id === topic.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {topic.title}
                        </p>
                        <div className={`flex items-center gap-2 mt-1 ${
                          selectedTopic?.id === topic.id ? 'text-pink-100' : 'text-gray-400'
                        }`}>
                          <span className="text-xs">{topic.category}</span>
                          <span>•</span>
                          <span className="text-xs">{formatHot(topic.hot)}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ✨ 生成的推文文案
            </h2>

            {!generatedContent ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>选择一个热点话题开始生成</p>
              </div>
            ) : generating ? (
              <div className="text-center py-12 text-gray-400">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p>AI 正在生成内容...</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">当前话题</p>
                  <p className="text-lg font-semibold text-gray-800">{generatedContent.topic}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-pink-500 text-white text-xs rounded-full">
                    {generatedContent.category}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🤖 AI 状态</h3>
                  <p className="text-sm text-gray-700">
                    提供商：{providerLabelMap[(generatedContent.aiProvider ?? 'none') as AIProvider]}
                  </p>
                  {generatedContent.aiModel && (
                    <p className="text-sm text-gray-700 mt-1">模型：{generatedContent.aiModel}</p>
                  )}
                  {generatedContent.aiError && (
                    <p className="text-sm text-red-500 mt-2">{generatedContent.aiError}</p>
                  )}
                </div>

                {generatedContent.templates.map((template, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-4 hover:border-pink-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                        {template.style}
                      </span>
                      <button
                        onClick={() => copyContent(template.content, index)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          copiedIndex === index
                            ? 'bg-green-500 text-white'
                            : 'bg-pink-500 text-white hover:bg-pink-600'
                        }`}
                      >
                        {copiedIndex === index ? '✓ 已复制' : '📋 一键复制'}
                      </button>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-sans">
                      {template.content}
                    </pre>
                  </div>
                ))}

                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">🖼️ 配图建议</h3>
                  <div className="space-y-2">
                    {generatedContent.imageSuggestions.map((img, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600">•</span>
                        <div>
                          <span className="font-medium text-gray-700">{img.type}：</span>
                          <span className="text-gray-600">{img.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {generatedContent.aiContent && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">🤖 AI 增强内容</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-600">
                      {generatedContent.aiContent}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-3">📖 使用说明</h3>
          <ol className="list-decimal list-inside text-gray-600 space-y-1 text-sm">
            <li>在左侧选择你感兴趣的热点话题</li>
            <li>点击话题后，系统会自动生成 3 条不同风格的小红书文案</li>
            <li>可在顶部切换 AI 模式：仅模板 / OpenAI / Ollama 本地模型</li>
            <li>点击「一键复制」按钮，复制文案到剪贴板</li>
            <li>打开小红书 App，粘贴文案并添加图片发布</li>
            <li>（可选）若使用 Ollama，请先在本机启动 Ollama 并拉取模型</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function formatHot(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}
