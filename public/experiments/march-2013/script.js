$(function () {

  var paper = new Raphael(document.getElementById('map'), 940, 940);
  var worldProjection = d3.geo.mercator()
  .scale(14000)
  .translate([600,2600]);

  var border_color = "#444";
  var unsel_color = "#e0e0e0";

  $.getJSON('GBR_adm1.json', function(data) {
    console.log(data);
    // svg_borders = {};
    // $.each(data["features"], function(idx,feature) {
    //   country = feature.properties.name;
    //   svg_borders[country]=[];
    //   var polygons = [];
    //   if (feature.geometry.type == "MultiPolygon") {
    //     polygons = feature.geometry.coordinates;
    //   } else { // Single polygon
    //     polygons[0] = feature.geometry.coordinates;
    //   }
    //   $.each(polygons, function (idxpolygon, polygon) {
    //     $.each (polygon, function (idxline, geojson_line) {
    //       var line;
    //       var i;
    //       var str_line = "M ";
    //       for (var i=0, l=geojson_line.length;i<l;i+=1) {
    //         if (i> 0) str_line += " L ";
    //         xy = worldProjection(geojson_line[i]);
    //         str_line += xy[0] + " " + xy[1];
    //       }
    //       str_line += " Z";
    //       line = paper.path(str_line);
    //       line.attr({stroke:border_color,'stroke-width':1,'fill':unsel_color});
    //       line.country=country;
    //       // $(line.node).click( get_click_handler(country));
    //       // $(line.node).mousemove( get_over_handler(country));
    //       // $(line.node).mouseout( get_out_handler(country));
    //       svg_borders[country].push(line);
    //     });
    //   });
    // });
  });

});
