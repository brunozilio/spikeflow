export type ComponentType =
  | "text"
  | "heading"
  | "button"
  | "container"
  | "image"
  | "input"
  | "div";

export interface FlexboxStyles {
  display?: "flex" | "block" | "inline-flex";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  gap?: string;
  padding?: string;
  margin?: string;
}

export interface ComponentStyles extends FlexboxStyles {
  color?: string;
  backgroundColor?: string;
  background?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
}

export interface PageComponent {
  id: string;
  type: ComponentType;
  content?: string;
  styles: ComponentStyles;
  children?: PageComponent[];
  parentId?: string | null;
}

export interface PageData {
  id: string;
  projectId: string;
  name: string;
  components: PageComponent[];
  canvasSettings: {
    width: number;
    height: number;
  };
  version: string;
  createdAt: string;
  updatedAt: string;
}
