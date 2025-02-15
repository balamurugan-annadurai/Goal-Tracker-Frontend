export interface IToggleButton {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
