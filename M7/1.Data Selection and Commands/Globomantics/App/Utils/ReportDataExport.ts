import * as pbi from "powerbi-client";
import { saveAs } from "file-saver";

export function exportReportData(
  report: pbi.Report,
  pageIndex: number,
  visualTitle: string,
  fileName: string
): void {
  report.getPages().then(pages => {
    pages[pageIndex].getVisuals().then(visuals => {
      const targetVisual = visuals.find(x => x.title === visualTitle);
      if (targetVisual) {
        exportVisualData(targetVisual, fileName);
      }
    });
  });
}

function exportVisualData(
  visual: pbi.VisualDescriptor,
  fileName: string
): void {
  visual.exportData(pbi.models.ExportDataType.Summarized).then((data: any) => {
    triggerFileDownload(fileName, data.data);
  });
}

function triggerFileDownload(fileName: string, fileContents: string): void {
  if (fileContents && fileName) {
    try {
      const blob = new Blob([fileContents], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, fileName);
    } catch (ex) {
      console.error(ex);
    }
  }
}
