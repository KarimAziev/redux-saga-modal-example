import { createDevTools } from '@redux-devtools/core';
import { LogMonitor } from '@redux-devtools/log-monitor';

export default createDevTools(<LogMonitor />);
