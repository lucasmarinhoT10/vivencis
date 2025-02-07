export interface IHeaderProps {
  title: string | React.ReactNode;
  onPressPrimary?: () => void;
  isBack?: boolean;
  isDrawer?: boolean;
  sizeText?: number 
}