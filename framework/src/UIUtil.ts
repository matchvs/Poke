class Utils {
    public static ox(value) {
        return Math.floor(value / 480 * App.SCENT_WIDTH);
    }

    public static oy(value) {
        return Math.floor(value / 800 * App.SCENT_HEIGHT);
    }

    public static oScaleX() {
        return Math.floor(1 / 480 * App.SCENT_WIDTH);
    }

    public static oScaleY() {
        return Math.floor(1 / 800 * App.SCENT_HEIGHT);

    }
}