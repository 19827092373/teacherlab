export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  // 这里可以集成 Google Analytics 或其他统计工具
  console.log(`[Analytics] ${eventName}`, data);
};

export const trackToolClick = (toolId: string, toolName: string) => {
  trackEvent('tool_click', { toolId, toolName });
};
