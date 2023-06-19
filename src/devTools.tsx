import { createDevTools } from '@redux-devtools/core';
import { LogMonitor } from '@redux-devtools/log-monitor';

const Monitor = (
  <LogMonitor
    expandActionRoot={false}
    preserveScrollTop={false}
    expandStateRoot={true}
    markStateDiff={true}
    hideMainButtons={true}
  />
);

export const DevTools = createDevTools(Monitor);
