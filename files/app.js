// Get the data endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// create a function to build the charts
function buildPlot(id) { 
    d3.json(url).then(function(data) {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id ==id);
        console.log(resultArray);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        var trace1 = { 
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        var data = [trace1];
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" }
        };
        Plotly.newPlot("bar", data, layout);  
    });
}

// make the dropdown menu
function init() {
    var selector = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        var sampleNames = data.names;
        sampleNames.forEach(function(name) {
            selector
                .append("option")
                .text(name)
                .property("value", name);
        });
        var firstSample = sampleNames[0];
        buildPlot(firstSample);
    });
}

// make the top 10 OTUs chart


// create a function to update the charts
function optionChanged(newSample) {
    buildPlot(newSample);
} 

init();   




