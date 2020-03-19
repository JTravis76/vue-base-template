/* ===========================
 * dataset.ts - Author: Jeremy Travis (2020)
 * When working with Chart.Js, often time may need to
 * convert datatable to a friendier dataset for certain
 * charts within Chart.Js
 * 
let datatable = [
    { ProjectName: "B", SumOf: 11, WasteType: "Type I" },
    { ProjectName: "A", SumOf: 22, WasteType: "Type II" },
    { ProjectName: "B", SumOf: 33, WasteType: "Type II" }
]
let chartDataset = ConvertToChartDataset(datatable, 0, 2, 1);

// returns:
chartDataset = {
    series = [ "A", "B" ],
    datasets: [ 
      {
        labels: "Type I",
        data: [ 0, 11 ]
      },
      {
        labels: "Type II",
        data: [ 22, 33 ]
      }
    ]
}

// build ChartJS dataset, (optional: add background)
let datasets = [] as ChartDataSet[];
chartDataset.datasets.forEach(d => {
    datasets.push({
        label: d.label,
        data: d.data
    });
});

this.chartData.data.labels = chartDataset.series;
this.chartData.data.datasets = datasets;
this.chart.update();
*/

/** Converts data table to Chart.Js friendly dataset
 * @param dataTable data to convert
 * @param seriesIdx index of series element
 * @param labelIdx index of label element
 * @param dataIdx index of data element
 */
export function ConvertToChartDataset(dataTable: any[], seriesIdx: number, labelIdx: number, dataIdx: number): IChartDatasetResult {
    let seriesName = "", labelName = "", dataName = "";
    let labels = [] as string[];
    let result = {
        series: [],
        datasets: []
    } as IChartDatasetResult;


    for (let i = 0; i < dataTable.length; i++) {
        const el = dataTable[i];
        seriesName = Object.getOwnPropertyNames(el)[seriesIdx];
        labelName = Object.getOwnPropertyNames(el)[labelIdx];
        dataName = Object.getOwnPropertyNames(el)[dataIdx];

        if (result.series.indexOf(el[seriesName]) === -1)
            result.series.push(el[seriesName]);

        if (labels.indexOf(el[labelName]) === -1)
            labels.push(el[labelName]);
    }
    result.series.sort();
    labels.sort();

    // Add Labels
    labels.forEach(x => {
        result.datasets.push({ label: x.toString(), data: [] });
    });
    //Add Data
    result.series.forEach(s => {
        result.datasets.forEach(d => {
            let z = dataTable.find(x => {
                return (x[seriesName] === s && x[labelName] === d.label);
            });
            if (z !== undefined)
                d.data.push(z[dataName]);
            else
                d.data.push(0);
        });
    });

    return result;
}

interface IChartDatasetResult {
    series: string[],
    datasets: { label: string, data: number[] }[]
}