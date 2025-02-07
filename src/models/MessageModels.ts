export interface IMessageProps {
  text?: any;
  hour?: string;
  selected?: boolean;
  handleSelect: (item: any) => void;
  handleLongPressItem: (item: any) => void;
  senderMe: boolean;
  messages?: IMessagesTextProps[];
  data: any;
}

export interface IMessagesTextProps {
  text: string;
  hour: string;
  senderMe: boolean;
}
