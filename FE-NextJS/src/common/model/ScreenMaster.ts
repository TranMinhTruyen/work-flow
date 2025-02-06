export interface ScreenMaster {
  screenId: string;
  screenName: string;
  url: string;
  screenComponentList: ScreenComponent[];
}

export interface ScreenComponent {
  componentId: string;
  componentName: string;
  role?: string;
  authorities?: string[];
  level?: number;
}
