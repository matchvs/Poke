class Tips {
	private step = 0;
	private root;
	private stepViewNames: Array<string> = [];
	public show(root: BaseScene, stepViewName: Array<string>) {
		this.stepViewNames = stepViewName;
		this.root = root;
		root.findChild(stepViewName[0]).visible = true;
		root.findChild(stepViewName[1]).visible = true;
		for (var i = 2; i < this.stepViewNames.length; i++) {
			root.findChild(stepViewName[i]).visible = false;
		}
	}
	public nextStep() {
		if (this.root === null) {
			console.warn("please call func 'Tips.show(root,stepViewNameArray)' as  the first step");
			return false;
		}
		this.step++;
		if (this.step+1 > this.stepViewNames.length-1) {// next step is exit tips ,-1 =  root
			this.root.findChild(this.stepViewNames[0]).visible = false;
			return true;
		} else {
			this.root.findChild(this.stepViewNames[this.step]).visible = false;
			this.root.findChild(this.stepViewNames[this.step+1]).visible = true;
			return false;
		}
	}
}