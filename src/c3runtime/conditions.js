"use strict";

{
	self.C3.Behaviors.JeyDotC_Notify.Cnds =
	{
		OnNotified(event)
		{
			return !!(this._notifyMap[event] && this._notifyMap[event].notified);
		},

		OnInstanceVariableChanged(instanceVar)
		{
			return !!(this._watchedVariables[instanceVar] && this._watchedVariables[instanceVar].notified);
		}
	};
}