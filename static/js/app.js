//------------------------------------------------------------
// Builds Bar and Bubble Plots
function buildPlot(name) {
    d3.json("../samples.json").then(data => { 
        // Get this sample's data
        var thisSample = data.samples.filter(sample => sample.id == name);
        thisSample = thisSample[0];
        console.log(thisSample);

        var ids = thisSample.otu_ids;
        otuIds = ids.map(i => 'OTU ' + i);
        var values = thisSample.sample_values;
        var labels = thisSample.otu_labels;
        
        // Build BAR
        var data = [{
            x: (values.slice(0, 10)).reverse(),
            y: (otuIds.slice(0, 10)).reverse(),
            text: (labels.slice(0, 10)).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        var layout = {
            title: `Top 10 Bacteria Cultures Found in ${thisSample.id}`,
        };
        Plotly.newPlot('bar', data, layout);

        // Build BUBBLE
        var data = [{
            x: ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                color: ids,
                size: values
            }
        }];
        var layout = {
            title: `Bacteria Cultures Per Sample for ${thisSample.id}`,
            xaxis: { title: "OTU ID" },
        };
        Plotly.newPlot('bubble', data, layout); 
    });    
}    
//------------------------------------------------------------
// Builds data for demographic info
function buildInfo(name) {
    d3.json("../samples.json").then(data => { 
        var thisMeta = data.metadata.filter(meta => meta.id == name);
        console.log(thisMeta);
        // Get reference to html element, remove any existing elements, and append info
        var select = d3.select(".panel-body");
        d3.selectAll("h5").remove();
        thisMeta.forEach(meta => {
            Object.entries(meta).forEach(([key, value]) => select.append("h5").text(`${key}: ${value}`));
        });
    });
}
//------------------------------------------------------------
// Fills dropdown menu and build inital plots and info
function init() {
    // Populate dropdown menu with ids
    d3.json("../samples.json").then(data => { 
        var names = data.names;
        // Get reference to dropdown
        var select = d3.select("#selDataset");
        names.forEach(name => 
            select.append("option").text(name).property("value"));     
        // Use first id to build inital plots and info
        buildPlot(names[0]);
        buildInfo(names[0]);  
    });    
}
//------------------------------------------------------------
// Executes when a change takes place to dropdown menu then builds plots and data
function optionChanged(newName) { 
    console.log(newName);
    buildPlot(newName);
    buildInfo(newName);   
}
//------------------------------------------------------------
init();
