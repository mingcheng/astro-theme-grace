export type StatusTone = 'healthy' | 'warning' | 'critical' | 'neutral';

export type HostStatus = Exclude<StatusTone, 'neutral'>;

export const statusLabels: Record<HostStatus, string> = {
  healthy: '正常',
  warning: '关注',
  critical: '故障',
};

export const USAGE_THRESHOLDS = { warning: 70, critical: 90 } as const;

export const getUsageTone = (percentage: number): HostStatus => {
  if (percentage >= USAGE_THRESHOLDS.critical) return 'critical';
  if (percentage >= USAGE_THRESHOLDS.warning) return 'warning';
  return 'healthy';
};
