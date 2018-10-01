/**
* marque device date
*/

var decode = function(encoded) {
	try {
		var dsl = 'byte:1 is_led_on; ushort pressure_value; ushort temp_value; ushort altitude; ubyte battery_lvl; byte[6] raw_gps; ';
		var decoded = BinaryDecoder.decode(dsl, encoded);

		return postProcess(encoded, JSON.parse(decoded));

	} catch (e) {
		return "{\"error\":\"decoding failed\"}";
	}
};