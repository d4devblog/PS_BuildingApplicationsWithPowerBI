import { ISelection, IColumnTarget } from "powerbi-models";

export function readDataPoint(
  dataSelection: ISelection,
  table: string,
  column: string
): any {
  let returnValue: any = null;

  if (dataSelection && dataSelection.dataPoints) {
    dataSelection.dataPoints.forEach(point => {
      if (point.identity && point.identity.length > 0) {

        // Check Identities
        const matchedIdentity = point.identity.find(
          identity =>
            (identity.target as IColumnTarget).table == table &&
            (identity.target as IColumnTarget).column == column
        );

        if (matchedIdentity) {
          returnValue = matchedIdentity.equals;
        }
      }

      // Check Values
      if (returnValue == null && point.values && point.values.length > 0) {
        const matchedValue = point.values.find(
          value =>
            (value.target as IColumnTarget).table == table &&
            (value.target as IColumnTarget).column == column
        );

        if (matchedValue) {
          returnValue = matchedValue.value;
        }
      }
    });
  }

  return returnValue;
}
