//------------------------------------------------------------
// Builds Bar and Bubble Plots
function buildPlot(name) {
    d3.json("../samples.json").then(data => { 
        // Get this Sample data - for BAR and BUBBLE
        var thisSample = data.samples.filter(sample => sample.id == name);
        thisSample = thisSample[0];
        console.log(thisSample);
        
        var ids = thisSample.otu_ids;
        otuIds = ids.map(i => 'OTU ' + i);
        var values = thisSample.sample_values;
        var labels = thisSample.otu_labels;
        
        // Get this Metadata - for GAUGE
        var thisMeta = data.metadata.filter(meta => meta.id == name);
        var value = thisMeta[0].wfreq;;
        console.log(`Wfreq: ${value}`)

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

        // Build GAUGE
        var data = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: value,
            title: { text: `<b>Belly Button Washing Frequency</b><br><span style="font-size:0.8em;color:gray">Scrubs per Week</span>`,
                    font: { size: 24 }  },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9],
                        tickmode: "linear" },
                steps: [
                    { range: [0, 1], color: "#e6ffff" },
                    { range: [1, 2], color: "#b3ffff" },
                    { range: [2, 3], color: "#80ffff" },
                    { range: [3, 4], color: "#4dffff" },
                    { range: [4, 5], color: "#00e6e6" },
                    { range: [5, 6], color: "#00b3b3" },
                    { range: [6, 7], color: "#009999" },
                    { range: [7, 8], color: "#008080" },
                    { range: [8, 9], color: "#006666" }
                ],
                threshold: {
                    line: { color: "purple", width: 8 },
                    thickness: .75,
                    value: value
                }
            }
        }];
        var layout = {
            width: 600, 
            height: 450, 
            margin: { 
                t: 0, 
                b: 0 } 
            };
        Plotly.newPlot('gauge', data, layout);
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
        d3.selectAll("p").remove();
        thisMeta.forEach(meta => {
            Object.entries(meta).forEach(([key, value]) => select.append("p").text(`${key}: ${value}`));
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
