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
// Builds BAR plot
function buildPlot(name) {
    d3.json("../samples.json").then(data => { 
        // Get this one sample's data
        var thisSample = data.samples.filter(sample => sample.id == name);
        thisSample = thisSample[0];
        // Get data for horizontal bar - top 10
        var sampleValues = thisSample.sample_values.slice(0, 10);
        var otuIds = thisSample.otu_ids.slice(0, 10);
        otuIds = otuIds.map(i => 'OTU ' + i);
        var otuLabels = thisSample.otu_labels.slice(0, 10);
        console.log(thisSample);
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);
        
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
