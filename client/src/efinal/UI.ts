class UI {

	private static LOGGER: any = console;

	public static printLog(par?: any) {
		UI.LOGGER.info('[INFO] : ' + par);
	}

	public static setLogger(logger) {
		UI.LOGGER = logger;
	}
	public static buildEgretLogger(root: egret.DisplayObjectContainer) {
		var text: eui.Label = new eui.Label();
		text.touchEnabled = false;
		text.alpha = 0.8;
		text.textColor = 0x98e165;
		text.name = "Log";
		var logger: any = text;
		logger.info = function (msg) {
			logger.text += msg;
			logger.text += "\r\n";
			if (logger.text > 1024) {
				logger.text.substr(512, logger.text.length);
			}
		}
		root.addChild(logger);
		UI.setLogger(logger);
	}
}