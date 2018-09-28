
function postProcess(encoded, decoded) {

	postProcessTemperaturePressure(decoded);
	postProcessLocation(encoded, decoded);
	postProcessLed(decoded);
	postProcessBatteryLevel(decoded);
	decoded = JSON.stringify(decoded);
	return decoded;
}

