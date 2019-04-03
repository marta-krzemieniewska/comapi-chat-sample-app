export class AppSettings {
    // API space
    public static API_SPACE_ID = '97f38f7a-db12-41f4-97b8-0c81015c437f';

    // API base routes
    public static URL_BASE = 'https://stage-api.comapi.com';
    public static WEB_SOCKET = 'wss://stage-api.comapi.com';

    // Authorization
    public static ISSUER = 'https://api.comapi.com/defaultauth';
    public static AUDIENCE = 'https://api.comapi.com';
    public static SECRET = '14d1dad950a2a83523465f5809d24d6b0594b738';

    // Number of messages to retrieve for a conversation (last n)
    public static MESSAGE_PAGE_SIZE = 50;
}
