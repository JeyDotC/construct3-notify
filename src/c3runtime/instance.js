"use strict";

{
	const C3 = self.C3;

	C3.Behaviors.JeyDotC_Notify.Instance = class NotifyInstance extends C3.SDKBehaviorInstanceBase
	{
		constructor(behInst, properties)
		{
			super(behInst);

			this._notifyMap = {};

			this._watchedVariables = {};
						
			// Opt-in to getting calls to Tick()
			this._StartTicking();
		}

		Release()
		{
			super.Release();
		}

		_SetMyProperty(n)
		{
			this._myProperty = 0;
		}

		_GetMyProperty()
		{
			return this._myProperty;
		}
		
		SaveToJson()
		{
			return {
				// data to store for savegames
			};
		}

		LoadFromJson(o)
		{
			// load state for savegames
		}
		
		
		Tick()
		{
			// const dt = this._runtime.GetDt(this._inst);
			// const wi = this._inst.GetWorldInfo();
			
			this._watchedVariables = Object.entries(this._watchedVariables).map(([instanceVar, watch]) => {
				const {frequency, lastNotifiedAt, currentValue, deferrredChangeDetected, ignoreDeferred} = watch;
				
				let lastNotified = lastNotifiedAt;
				let deferredChange = deferrredChangeDetected;
				let notified = false;

				const mostRecentValue = this.GetObjectInstance().GetInstanceVariableValue(instanceVar);
				const valueDidChange = currentValue !== mostRecentValue;
				const timeElapsedSinceLastWatch = Date.now() - lastNotifiedAt;
				const matchesFrequency = timeElapsedSinceLastWatch > frequency * 1000;

				if(matchesFrequency && (valueDidChange || deferrredChangeDetected)){
					lastNotified = Date.now();
					deferredChange = false;
					notified = true;
				} else if(!matchesFrequency && valueDidChange && !ignoreDeferred){
					deferredChange = true;
				}

				return [instanceVar, {
					frequency,
					lastNotifiedAt: lastNotified, 
					currentValue: mostRecentValue, 
					deferrredChangeDetected: deferredChange,
					notified
				}];
			}).reduce((total, [instanceVar, watch]) => ({...total, [instanceVar]: watch}), {});

			this.Trigger(C3.Behaviors.JeyDotC_Notify.Cnds.OnInstanceVariableChanged);
		}

		GetScriptInterfaceClass()
		{
			return self.INotifyInstance;
		}
	};
	
	// Script interface for behavior instance
	const map = new WeakMap();
	
	self.INotifyInstance = class INotifyInstance extends self.IBehaviorInstance {
		constructor()
		{
			super();
			
			// Map by SDK instance
			map.set(this, self.IBehaviorInstance._GetInitInst().GetSdkInstance());
		}
		
		// Example setter/getter property on script interface
		set myProperty(n)
		{
			map.get(this)._SetMyProperty(n);
		}

		get myProperty()
		{
			return map.get(this)._GetMyProperty();
		}
	};
}