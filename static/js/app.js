//------------------------------------------------------------
function init() {
    // Populate dropdown menu with ids
    d3.json("../samples.json").then(data => { 
        var names = data.names;
        // Get reference to dropdown selection
        var select = d3.select("#selDataset");
        names.forEach(name => 
            select.append("option").text(name).property("value"));       
    });
    // Use first id to build inital plots
    //buildPlot(names[0]);
    //buildData(names[0]);
}
// Call updatePlotly() when a change takes place to the DOM
function optionChanged(newName) {
    console.log(newName);
    //buildPlot(newName);
    //buildData(newName);   
}
//------------------------------------------------------------
// function buildPlot() { }

init();
