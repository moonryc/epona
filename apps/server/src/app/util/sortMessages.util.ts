import { ChatMessage } from "@epona/epona-db";


const sortChatMessages = (messages: ChatMessage[]) => {

    const { summaries, messages: regularMessages } = messages.reduce((acc, message) => {
        if (message.isSummary) {
            acc.summaries.push(message);
        } else {
            acc.messages.push(message);
        }
        return acc;
    }, {
        summaries: [] as ChatMessage[],
        messages: [] as ChatMessage[]
    });

    const sortedSummaries = summaries.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const sortedMessages = regularMessages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
    return [...sortedSummaries, ...sortedMessages];
}

export default sortChatMessages;