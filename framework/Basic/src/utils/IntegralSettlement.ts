class IntegralSettlement {
	public constructor() {
	}

	/**
	 * @param {number} base 基础值
	 * @param {times} times 倍数
	 * @returns {number} 
	 */
	public static PointIncrement(base:number, times:number):number{
		return base*(Math.pow(2,times));;
	}

	public static FinalValueResult(landowner:battle.Player, p1:battle.Player, p2:battle.Player, isLandWin:boolean, base:number, times:number):number{
		let incValue = IntegralSettlement.PointIncrement(base, times);
		let finalValue = 0;
		if(isLandWin){
			if(p1.pointValue > incValue){
				finalValue += incValue; 
				p1.pointValue -= incValue;
			}else{
				finalValue += p1.pointValue;
				p1.pointValue = 0;
			}

			if(p2.pointValue > incValue){
				finalValue += incValue; 
				p2.pointValue -= incValue;
			}else{
				finalValue += p2.pointValue;
				p2.pointValue = 0;
			}
			landowner.pointValue += finalValue;
		}else{
			incValue = (incValue*2);
			if(landowner.pointValue > incValue){
				landowner.pointValue -= incValue;
				finalValue = incValue;
			}else{
				landowner.pointValue = 0;
				finalValue += landowner.pointValue;
			}

			p1.pointValue = finalValue/2;
			p2.pointValue = finalValue/2;
		}
		return finalValue;
	}
}