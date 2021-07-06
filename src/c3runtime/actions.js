"use strict";

{
	self.C3.Behaviors.JeyDotC_Notify.Acts =
	{
		Notify(event)
		{
			const {debounced, debouncedFor, debounceStart} = this._notifyMap[event] || { debounced: false };

			if(debounced){
				const ellapsedTime = Date.now() - debounceStart;
				if(ellapsedTime < debouncedFor * 1000){
					return;
				}	
			}

			this._notifyMap[event] = {
				notified: true,
				debounced: false
			};
			this.Trigger(C3.Behaviors.JeyDotC_Notify.Cnds.OnNotified);
		},

		DebounceFor(event, seconds){
			// Avoid accumulated debouncing.
			if(this._notifyMap[event] && this._notifyMap[event].debounced){
				return;
			}
			this._notifyMap[event] = {
				notified: false,
				debounced: true,
				debouncedFor: seconds,
				debounceStart: Date.now()
			};
		},

		Observe(instanceVar, frequency, ignoreDeferred){
			const currentValue = this.GetObjectInstance().GetInstanceVariableValue(instanceVar);
			this._watchedVariables[instanceVar] = {
				frequency,
				lastNotifiedAt: Date.now(),
				currentValue,
				deferrredChangeDetected: false,
				ignoreDeferred
			};
		},

		StopObserving(instanceVar){
			this._watchedVariables.hasOwnProperty(instanceVar) && delete this._watchedVariables[instanceVar];
		}
	};
}