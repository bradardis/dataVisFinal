(function render() { 
    //iife - this wraps the code in a function so it isn't accidentally exposed 
    //to other javascript in other files. It is not required.
    
    $("#HomeTotalScore").empty();
    $("#HomeProj").empty();

        var lineVal = $("#line").val();
        var lineVal2 = lineVal/100;
        var lineVal3 = lineVal2*60;

        var mylist = document.getElementById("myList");  
        var awayTeam = mylist.options[mylist.selectedIndex].text; 

        var mylist2 = document.getElementById("myList2");  
        var homeTeam = mylist2.options[mylist.selectedIndex].text; 

        var width=800, height=600
    
        //read in our csv file 
        d3.csv("games.csv").then((data) => {
        
          const svg = d3
          .select("#HomeTotalScore")
          .append("g")
          .attr("transform", "translate(40,40)");

        console.log(data)
            
          //filter out items without proce data
          data = data.filter((d) => {
              return d.Away == "Wizards" || d.Away == "wizards" || d.Home == "Wizards" || d.Home == "wizards"
          })

          data = data.filter((d) => {
            return d.Actual_Score != "";
        })




        //   var parseTime = d3.timeParse("%d/%m/%Y");

          function sortByIDAscending(a, b) {
            return a.ID - b.ID;
          } 
        
          data = data.sort(sortByIDAscending);
          console.log(data)

          const timeScale = d3
          .scaleLinear()
        //   .scaleTime()
          .domain([0, 200])
          .range([0, width]);
          console.log(timeScale)
          const yScale = d3
          .scaleLinear()
          .domain([100, 300])
          .range([height, 0]);

          const lineGenerator = d3
          .line()
          .x(function (d, i) {
            return timeScale(d.ID); //use our x scale on the index
          })
          .y(function (d) {
            return yScale(+d.Actual_Score); //use our y scale on the y value from data
          });

          //formula to place line: value/100*60  

          // create Red Line function
          var overunder = d3.line()
          .x(function (d, i) {
            return timeScale(d.ID); //use our x scale on the index
          })
          .y(lineVal3)
    
        // //line generator will create SVG vectors based on data
          const line = lineGenerator(data);

          const redline = overunder(data);
    
        // Create a path element and set its d attribute
          svg
          .append("path")
          .attr("d", line) //data items
          .attr("stroke", "steelblue")
          .attr("stroke-width", "3px")
          .attr("fill", "white");

          // Add the x Axis
          svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(timeScale));
          // Add the y Axis
          svg.append("g")
          .call(d3.axisLeft(yScale));

          // Create Red Line
          svg
          .append("path")
          .attr("d", redline)
          .attr("stroke", "red")
          .attr("stroke-width", "3px")
          .attr("fill", "white");


          const svg2 = d3
          .select("#HomeProj")
          .append("g")
          .attr("transform", "translate(40,40)");

        console.log(data)
            
          //filter out items without proce data
          data = data.filter((d) => {
              return d.Away == "Wizards" || d.Away == "wizards" || d.Home == "Wizards" || d.Home == "wizards"
          })

          data = data.filter((d) => {
            return d.Actual_Score != "";
        })




        //   var parseTime = d3.timeParse("%d/%m/%Y");

          function sortByIDAscending(a, b) {
            return a.ID - b.ID;
          } 
        
          data = data.sort(sortByIDAscending);
          console.log(data)

          const timeScale2 = d3
          .scaleLinear()
        //   .scaleTime()
          .domain([0, 200])
          .range([0, width]);
          console.log(timeScale)
          const yScale2 = d3
          .scaleLinear()
          .domain([100, 300])
          .range([height, 0]);

          const lineGenerator2 = d3
          .line()
          .x(function (d, i) {
            return timeScale(d.ID); //use our x scale on the index
          })
          .y(function (d) {
            return yScale(+d.Projection); //use our y scale on the y value from data
          });

          //formula to place line: value/100*60  

          // create Red Line function
          var overunder = d3.line()
          .x(function (d, i) {
            return timeScale(d.ID); //use our x scale on the index
          })
          .y(lineVal3)
    
        // //line generator will create SVG vectors based on data
          const line2 = lineGenerator2(data);

          const redline2 = overunder(data);
    
        // Create a path element and set its d attribute
          svg2
          .append("path")
          .attr("d", line2) //data items
          .attr("stroke", "steelblue")
          .attr("stroke-width", "3px")
          .attr("fill", "white");

          // Add the x Axis
          svg2.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(timeScale2));
          // Add the y Axis
          svg2.append("g")
          .call(d3.axisLeft(yScale2));

          // Create Red Line
          svg2
          .append("path")
          .attr("d", redline2)
          .attr("stroke", "red")
          .attr("stroke-width", "3px")
          .attr("fill", "white");


        });
    
    })();