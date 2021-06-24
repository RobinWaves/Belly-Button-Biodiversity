//------------------------------------------------------------
// Fills dropdown menu and build inital plots and data
function init() {
    // Populate dropdown menu with ids
    d3.json("../samples.json").then(data => { 
        var names = data.names;
        // Get reference to dropdown
        var select = d3.select("#selDataset");
        names.forEach(name => 
            select.append("option").text(name).property("value"));     
        // Use first id to build inital plots
        buildPlot(names[0]);
        //buildInfo(names[0]);  
    });    
}
//------------------------------------------------------------
// Executes when a change takes place to dropdown menu then builds plots and data
function optionChanged(newName) { 
    console.log(newName);
    //buildPlot(newName);
    //buildInfo(newName);   
}
//------------------------------------------------------------
// Builds Plots
function buildPlot(name) {
    d3.json("../samples.json").then(data => { 
        // Get this one sample's data
        var thisSample = data.samples.filter(sample => sample.id == name);
        thisSample = thisSample[0];
        console.log(thisSample);
        // Get data for BAR- top 10
        var sampleValues = (thisSample.sample_values.slice(0, 10)).reverse();
        var otuIds = (thisSample.otu_ids.slice(0, 10)).reverse();
        otuIds = otuIds.map(i => 'OTU ' + i);
        var otuLabels = thisSample.otu_labels.slice(0, 10);
        // Build bar plot
        var data = [{
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }];
        var layout = {
            title: `Top 10 OTUs Found in ${thisSample.id}`,
        };
        Plotly.newPlot('bar', data, layout);

        // Build BUBBLE
        console.log(thisSample.otu_ids);
        var data = [{
            x: thisSample.otu_ids,
            y: thisSample.sample_values,
            text: thisSample.otu_labels,
            mode: 'markers',
            // marker: {
            //     size: [40, 60, 80, 100]
            // }
        }];
        var layout = {
            title: `Every Sample for ${thisSample.id}`,
            showlegend: true,
            height: 600,
            width: 600
        };
        Plotly.newPlot('bubble', data, layout);
    });    
}    
//------------------------------------------------------------
// Builds data for demographic info
// function buildInfo(name) {
//     d3.json("../samples.json").then(data => { 
//         console.log(data);
//         var sampleObj = data.samples.filter(data.samples.id == name);
//         console.log(sampleObj);
//     });
//}
//------------------------------------------------------------
init();
