$(function() {


var projection = d3.geo.mercator()
  .scale(14000)
  .translate([600,3050]);

var border_color = "#444";

var width = 900,
    height = 900,
    minArea = 1,
    formatArea = d3.format(".2r"),
    formatPercent = d3.format(".2%");

var x = d3.scale.sqrt()
    .domain([0, 100])
    .range([0, width]);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

// var bg = svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height);

var shape = svg.append("path");

// var text = svg.append("text")
//     .attr("x", width / 2)
//     .attr("y", height / 2)
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle");

// var path = d3.geo.path()
//     .projection(function(d) { return [d[0], d[1]]; });

// var simplify = d3.simplify()
//     .projection(d3.geo.albers().scale(1300).translate([450, 300]));

d3.json("GBR_adm2.json", function(data) {

  console.log(data.features);

  for (var i = 0; i < data.features.length; i++) {
    var feature = data.features[i];
    var polygons = [];

    //console.log(feature);

    if (feature.geometry.type == "MultiPolygon") {
      polygons = feature.geometry.coordinates;
    } else { // Single polygon
      polygons[0] = feature.geometry.coordinates;
    }

    for (var j = 0; j < polygons.length; j++) {
      var polygon = polygons[j];
      for (var k = 0; k < polygon.length; k++) {
        var geojson_line = polygon[k];
        var line, str_line = "M ";
        for (var l = 0; l < geojson_line.length; l++) {
          if (l>0)  str_line += " L ";
          var xy = projection(geojson_line[l]);
          str_line += xy[0]+" "+xy[1];
        }

        str_line += " Z";
        line = svg.append("path").attr("d", str_line);
        line.attr({stroke:border_color,'stroke-width':1});

      }

    }

  }

  // var m = us.features.reduce(function(m, feature) {
  //     country = feature.properties.name;
  //     svg_borders[country]=[];
  //     var polygons = [];
  //     if (feature.geometry.type == "MultiPolygon") {
  //       polygons = feature.geometry.coordinates;
  //     } else { // Single polygon
  //       polygons[0] = feature.geometry.coordinates;
  //     }

  //   console.log("reduce", arguments);
  //   return m + polygon.reduce(function(m, lineString) {
  //     return m + lineString.length;
  //   }, 0);
  // }, 0);

  // simplify(us);
  // redraw();

  // bg.on("mousemove", function() {
  //   minArea = x.invert(d3.mouse(this)[0]);
  //   redraw();
  // });

  // function redraw() {
  //   var n = 0;

  //   shape.attr("d", path({
  //     type: "MultiPolygon",
  //     coordinates: us.coordinates.map(function(polygon) {
  //       return polygon.map(function(lineString) {
  //         return lineString.filter(function(point) {
  //           return point[2] >= minArea && ++n;
  //         });
  //       });
  //     })
  //   }));

  //   text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
  // }
});

});
