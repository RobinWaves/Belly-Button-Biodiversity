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

        var ids = thisSample.otu_ids;
        var values = thisSample.sample_values;
        var labels = thisSample.otu_labels;
        
        // Get data for BAR- top 10
        otuIds = ids.map(i => 'OTU ' + i);
        // Build bar plot
        var data = [{
            x: (values.slice(0, 10)).reverse(),
            y: (otuIds.slice(0, 10)).reverse(),
            text: (labels.slice(0, 10)).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        var layout = {
            title: `Top 10 OTUs Found in ${thisSample.id}`,
        };
        Plotly.newPlot('bar', data, layout);

        // Build BUBBLE
        console.log(`OTU IDS: ${thisSample.otu_ids}`);
        console.log(`Sample Values: ${thisSample.sample_values}`);
        
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
            title: `Every Sample for ${thisSample.id}`,
            xaxis: { title: "OTU ID" },
        };
        Plotly.newPlot('bubble', data, layout); 
            
        // var data = [{
        //     x: thisSample.otu_ids,
        //     y: thisSample.sample_values,
        //     text: thisSample.otu_labels,
        //     mode: 'markers',
        //     marker: {
        //         color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  
        //                 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //         opacity: [1, 0.8, 0.6, 0.4],
        //         size: [40, 60, 80, 100]
        //     }
        // }];
        // var layout = {
        //     title: `Every Sample for ${thisSample.id}`,
        //     showlegend: true,
        //     height: 600,
        //     width: 1200
        // };
        // Plotly.newPlot('bubble', data, layout);
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
