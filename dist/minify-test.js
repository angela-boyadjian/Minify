"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Minify_1 = require("../srcs/Minify");
const chai_1 = require("chai");
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Minify function', () => {
    it('should return minifed string', () => {
        const obj = new Minify_1.default("../test.js");
        const result = obj.minify();
        chai_1.expect(result).to.equal("var decode = function(encoded) {try {var dsl = 'byte:1 is_led_on; ushort pressure_value; ushort temp_value; ushort altitude; ubyte battery_lvl; byte[6] raw_gps; ';var decoded = BinaryDecoder.decode(dsl, encoded);return postProcess(encoded, JSON.parse(decoded));} catch (e) {return decoded;}};");
    });
});
//# sourceMappingURL=minify-test.js.map