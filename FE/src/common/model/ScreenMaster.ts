export interface IAccessScreenResponse {
  screenMasterList: IScreenMaster[];
}

export interface IScreenMaster {
  screenId: string;
  screenName: string;
  screenUrl: string;
  screenComponentList: ScreenComponent[];
  active: boolean;
}

export interface ScreenComponent {
  componentId: string;
  componentName: string;
  role?: string;
  authorities?: string[];
  level?: number;
}
