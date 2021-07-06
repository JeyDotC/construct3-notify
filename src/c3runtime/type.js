"use strict";

{
	const C3 = self.C3;

	C3.Behaviors.JeyDotC_Notify.Type = class NotifyType extends C3.SDKBehaviorTypeBase
	{
		constructor(behaviorType)
		{
			super(behaviorType);
		}
		
		Release()
		{
			super.Release();
		}
		
		OnCreate()
		{	
		}
	};
}