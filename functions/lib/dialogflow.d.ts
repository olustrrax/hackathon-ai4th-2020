declare const dialogflow: {
    postToDialogflow: (req: any) => Promise<any>;
    convertToDialogflow: (req: any, body: any) => Promise<any>;
};
export default dialogflow;
