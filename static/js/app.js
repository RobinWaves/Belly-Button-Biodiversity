//------------------------------------------------------------
function init() {
    // Populate dropdown menu with ids
    d3.json("../samples.json").then(data => { 
        var names = data.names;
        // Get reference to dropdown selection
        var select = d3.select("#selDataset");
        console.log(select);
        names.forEach(name => 
            select.append("option").text(name).property("value"));
       
    });
    //buildPlot(data.names[0]);
}
//------------------------------------------------------------
// function buildPlot() {
//     d3.json("../samples.json").then((data) => { 
//         console.log(data);
//         console.log(data.samples);
//          // Grab values from the response json object to build the plots
//         var ids = data.samples.map(row => row.id);
//         console.log(ids)
        //         //datetimes = tableData.map(date => date.datetime);
        //         // var otuIds = data.samples.map(row => row[1]);
        //         // var sampleValues = data.samples.map(row => row[2]);
        //         // var otuLabels = data.samples.map(row => row[3]);
        //         console.log(ids);
        //         // console.log(otuIds);
        //         // console.log(sampleValues);
        //         // console.log(otuLabels);
        });
        // } 
}

init();
var selection = 
