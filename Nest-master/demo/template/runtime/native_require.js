
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/gui/gui.js",
	"libs/modules/res/res.js",
	"libs/modules/nest/nest.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/MD5.js",
	"bin-debug/Main.js",
	"bin-debug/components/GameEvent.js",
	"bin-debug/components/GameView.js",
	"bin-debug/components/LoginView.js",
	"bin-debug/skins/GameViewSkin.g.js",
	"bin-debug/skins/LoginViewSkin.g.js",
	"bin-debug/skins/simple/AlertSkin.g.js",
	"bin-debug/skins/simple/ButtonSkin.g.js",
	"bin-debug/skins/simple/CheckBoxSkin.g.js",
	"bin-debug/skins/simple/CloseButtonSkin.g.js",
	"bin-debug/skins/simple/DropDownListItemRendererSkin.g.js",
	"bin-debug/skins/simple/DropDownListOpenButtonSkin.g.js",
	"bin-debug/skins/simple/DropDownListSkin.g.js",
	"bin-debug/skins/simple/HScrollBarSkin.g.js",
	"bin-debug/skins/simple/HScrollBarThumbSkin.g.js",
	"bin-debug/skins/simple/HSliderSkin.g.js",
	"bin-debug/skins/simple/HSliderThumbSkin.g.js",
	"bin-debug/skins/simple/ItemRendererSkin.g.js",
	"bin-debug/skins/simple/ListSkin.g.js",
	"bin-debug/skins/simple/PanelSkin.g.js",
	"bin-debug/skins/simple/ProgressBarSkin.g.js",
	"bin-debug/skins/simple/RadioButtonSkin.g.js",
	"bin-debug/skins/simple/ScrollerSkin.g.js",
	"bin-debug/skins/simple/SkinnableContainerSkin.g.js",
	"bin-debug/skins/simple/SkinnableDataContainer.g.js",
	"bin-debug/skins/simple/SliderThumbSkin.g.js",
	"bin-debug/skins/simple/TabBarButtonSkin.g.js",
	"bin-debug/skins/simple/TabBarSkin.g.js",
	"bin-debug/skins/simple/TextAreaSkin.g.js",
	"bin-debug/skins/simple/TextInputSkin.g.js",
	"bin-debug/skins/simple/TitleWindowSkin.g.js",
	"bin-debug/skins/simple/ToggleButtonSkin.g.js",
	"bin-debug/skins/simple/ToggleSwitchSkin.g.js",
	"bin-debug/skins/simple/TreeDisclosureButtonSkin.g.js",
	"bin-debug/skins/simple/TreeItemRendererSkin.g.js",
	"bin-debug/skins/simple/TreeSkin.g.js",
	"bin-debug/skins/simple/VScrollBarSkin.g.js",
	"bin-debug/skins/simple/VScrollBarThumbSkin.g.js",
	"bin-debug/skins/simple/VSliderSkin.g.js",
	"bin-debug/skins/simple/VSliderThumbSkin.g.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};