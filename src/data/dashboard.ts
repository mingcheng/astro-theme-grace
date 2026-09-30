import type { HostStatus, StatusTone } from '@/lib/status';

export interface Host {
  name: string;
  region: string;
  status: HostStatus;
  cpu: number;
  memory: number;
  uptime: string;
  latency: number;
}

export interface Activity {
  time: string;
  event: string;
  target: string;
  status: StatusTone;
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

export const hosts: Host[] = [
  { name: 'edge-shanghai-01', region: '华东 · 上海', status: 'healthy', cpu: 34, memory: 58, uptime: '42 天', latency: 18 },
  { name: 'api-beijing-02', region: '华北 · 北京', status: 'warning', cpu: 78, memory: 71, uptime: '18 天', latency: 42 },
  { name: 'worker-guangzhou-01', region: '华南 · 广州', status: 'healthy', cpu: 46, memory: 63, uptime: '31 天', latency: 27 },
  { name: 'backup-hongkong-01', region: '亚太 · 香港', status: 'critical', cpu: 92, memory: 88, uptime: '2 小时', latency: 136 },
];

export const activities: Activity[] = [
  { time: '23:32', event: '自动扩容完成', target: 'api-beijing-02', status: 'healthy' },
  { time: '23:18', event: '磁盘使用率超过阈值', target: 'backup-hongkong-01', status: 'critical' },
  { time: '22:54', event: '部署版本 v2.8.4', target: 'edge-shanghai-01', status: 'neutral' },
  { time: '22:30', event: '延迟恢复至正常范围', target: 'worker-guangzhou-01', status: 'healthy' },
];

export const trafficTrend = [42, 48, 44, 61, 58, 72, 67, 82, 76, 91, 86, 94];

export const storageSegments: ChartSegment[] = [
  { label: '应用数据', value: 38, color: 'var(--chart-1)' },
  { label: '日志', value: 18, color: 'var(--chart-2)' },
  { label: '备份', value: 12, color: 'var(--chart-3)' },
  { label: '可用', value: 32, color: 'var(--chart-4)' },
];

export const getAverage = (values: number[]) =>
  values.length === 0 ? 0 : Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
