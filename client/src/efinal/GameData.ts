// TypeScript file
class GameData {
    static env: string = "fluttergo";
    static userID: number = MathUtils.random(100000000);
    static userName:string = GameData.userID+"";
    static MAX_ROOM_USER_COUNT: number = 10;
    static FPS: number = 5;
    static token: string = "xxx"
    static gameID: number = 0;
}