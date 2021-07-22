"use strict";

{
	self.C3.Behaviors.JeyDotC_Notify.Acts =
	{
		Notify(event, notifyAfter = 0) {
			const existingEvent = this._notifyMap[event];
			const eventExists = existingEvent !== undefined;

			if (!eventExists) {
				this._notifyMap[event] = {
					notified: false,
					debounced: false,
					notifyAfter,
					notifyCreated: Date.now()
				};
			}
		},

		DebounceFor(event, debouncedFor) {
			const existingEvent = this._notifyMap[event];
			const eventExists = existingEvent !== undefined;

			if (!eventExists) {
				this._notifyMap[event] = {
					notified: false,
					debounced: true,
					debouncedFor,
					debounceStart: Date.now()
				};
			} else if(!existingEvent.debounced) {
				this._notifyMap[event] = {...existingEvent, debounced: true, debouncedFor, debounceStart: Date.now()}
			}
		},

		Observe(instanceVar, frequency, ignoreDeferred) {
			const currentValue = this.GetObjectInstance().GetInstanceVariableValue(instanceVar);
			this._watchedVariables[instanceVar] = {
				frequency,
				lastNotifiedAt: Date.now(),
				currentValue,
				deferrredChangeDetected: false,
				ignoreDeferred
			};
		},

		StopObserving(instanceVar) {
			this._watchedVariables.hasOwnProperty(instanceVar) && delete this._watchedVariables[instanceVar];
		}
	};
}