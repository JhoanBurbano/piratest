export interface INotify {
  title: string;
  content: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}
