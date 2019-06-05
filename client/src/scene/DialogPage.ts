
	class DialogPage {
		public static JumpResultUI(p3, p1, p2, iswin, islandwin, timestr, roomid: string) {
			SceneManager.root.removeChildren();
			let re = new ResultUI();
			SceneManager.root.addChild(re);
			if (p1.isLandLord) {
				re.showResult(p1, p2, p3, iswin, islandwin, timestr, roomid);
			} else if (p2.isLandLord) {
				re.showResult(p2, p1, p3, iswin, islandwin, timestr, roomid);
			} else if (p3.isLandLord) {
				re.showResult(p3, p1, p2, iswin, islandwin, timestr, roomid);
			}

		}

		public static ErrorPage(msg: string, callFun: Function, obj: any) {
			SceneManager.root.removeChildren();
			let errpage: ErrorNote = new ErrorNote();
			errpage.SetErrorMsg(msg, callFun);
			SceneManager.root.addChild(errpage);
		}
	}