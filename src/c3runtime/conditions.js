"use strict";

{
	self.C3.Behaviors.JeyDotC_Notify.Cnds =
	{
		OnNotified(event)
		{
			const wasNotified = !!(this._notifyMap[event] && this._notifyMap[event].notified);
			if(wasNotified){
				this._notifyMap[event].notified = false;
			}
			return wasNotified;
		},

		OnInstanceVariableChanged(instanceVar)
		{
			const wasNotified = !!(this._watchedVariables[instanceVar] && this._watchedVariables[instanceVar].notified);
			if(wasNotified){
				this._watchedVariables[instanceVar].notified = false;
				this._watchedVariables[instanceVar].deferrredChangeDetected = false;
			}
			return wasNotified;
		}
	};
}