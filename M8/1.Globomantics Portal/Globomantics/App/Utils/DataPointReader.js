"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataPoint = void 0;
function readDataPoint(dataSelection, table, column) {
    var returnValue = null;
    if (dataSelection && dataSelection.dataPoints) {
        dataSelection.dataPoints.forEach(function (point) {
            if (point.identity && point.identity.length > 0) {
                // Check Identities
                var matchedIdentity = point.identity.find(function (identity) {
                    return identity.target.table == table &&
                        identity.target.column == column;
                });
                if (matchedIdentity) {
                    returnValue = matchedIdentity.equals;
                }
            }
            // Check Values
            if (returnValue == null && point.values && point.values.length > 0) {
                var matchedValue = point.values.find(function (value) {
                    return value.target.table == table &&
                        value.target.column == column;
                });
                if (matchedValue) {
                    returnValue = matchedValue.value;
                }
            }
        });
    }
    return returnValue;
}
exports.readDataPoint = readDataPoint;
