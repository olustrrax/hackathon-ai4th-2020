import { MessageEvent, Client } from '@line/bot-sdk';
declare const HandleMessage: (event: MessageEvent, client: Client, req: any) => Promise<any>;
export default HandleMessage;
