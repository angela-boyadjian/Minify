import {Minify} from '../srcs/Minify';
import { expect } from 'chai';

describe('Minify function', () => {
	it('should return minifed string', () => {
		const obj: Minify = new Minify("./test.js");
		const result = obj.minify();
		expect(result).to.equal("var decode = function(encoded) {try {var dsl = 'byte:1 is_led_on; ushort pressure_value; ushort temp_value; ushort altitude; ubyte battery_lvl; byte[6] raw_gps; ';var decoded = BinaryDecoder.decode(dsl, encoded);return postProcess(encoded, JSON.parse(decoded));} catch (e) {return decoded;}};");
	});
});

describe('Minify function-full script', () => {
	it('should return minifed string of full script', () => {
		const obj: Minify = new Minify("./script.js");
		const result = obj.minify();
		expect(result).to.equal("var decode = function(encoded) {try {var dsl = 'byte:1 is_led_on; ushort pressure_value; ushort temp_value; ushort altitude; ubyte battery_lvl; byte[6] raw_gps; ';var decoded = BinaryDecoder.decode(dsl, encoded);return postProcess(encoded, JSON.parse(decoded));} catch (e) {return \\\"{\\\\\\\"error\\\\\\\":\\\\\\\"decoding failed\\\\\\\"}\\\";}};function postProcess(encoded, decoded) {postProcessTemperaturePressure(decoded);postProcessLocation(encoded, decoded);postProcessLed(decoded);postProcessBatteryLevel(decoded);decoded = JSON.stringify(decoded);return decoded;}function decodeLatitude(encoded) {var latitudeHexa = encoded.substring(16, 22);var latitudeInt = parseInt(latitudeHexa, 16);if (latitudeInt > 8388607) {latitudeInt = 8388608 - latitudeInt;}var latitude = (latitudeInt * 90 / 0x007FFFFF);if (latitude < 0) {latitude += 90;latitude *= -1;}return latitude;}function decodeLongitude(encoded) {var longitude = encoded.substring(22, 28);var longitudeInt = parseInt(longitude, 16);if (longitudeInt > 8388607) {longitudeInt = 8388608 - longitudeInt;}var longitude = (longitudeInt * 180 / 0x007FFFFF);if (longitude < 0) {longitude += 180;longitude *= -1;}return longitude;}function postProcessBatteryLevel(decoded) {decoded.battery = {level : {value : Number((decoded.battery_lvl / 254 * 100).toFixed(0)),unit : '%'}};delete decoded.battery_lvl;}function postProcessLed(decoded) {decoded.led = decoded.is_led_on == 1 ? 'ON' : 'OFF';delete decoded.is_led_on;}function postProcessLocation(encoded, decoded) {var latitude = decodeLatitude(encoded);var longitude = decodeLongitude(encoded);decoded.location = {\\\"lat\\\" : Number(latitude.toFixed(5)),\\\"lon\\\" : Number(longitude.toFixed(5)),\\\"alt\\\" : decoded.altitude / 10};delete decoded.raw_gps;delete decoded.altitude;}function postProcessTemperaturePressure(decoded) {decoded.temperature = {currentTemperature : {value : decoded.temp_value / 100,unit : '\\\\u00B0' + 'C'}};decoded.pressure = {value : decoded.pressure_value / 10,unit : 'hPa'};delete decoded.pressure_value;delete decoded.temp_value;}");
	});
});
