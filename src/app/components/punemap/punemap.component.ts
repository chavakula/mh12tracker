import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3"
import * as topojson from "topojson";
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-punemap',
  templateUrl: './punemap.component.html',
  styleUrls: ['./punemap.component.css']
})
export class PunemapComponent implements OnInit {

  private height: number = 375;
  private  width: number  = 375;
  private locationset: any = [];
  
  @Input() summarydetails: any;

  private containmentZones = [
    {long: 73.8545463, lat: 18.4930424, cases: 50, area: "S.T colony, Parvati Paytha"},
    {long: 73.8554097, lat: 18.4960206, cases: 50, area: "Laxminarayan Theater"},
    {long: 73.8367257, lat: 18.4872008, cases: 100, area: "Parvati Darshan"},
    {long: 73.8367257, lat: 18.4872004, cases: 50, area: "Hotel Panchami, Parvati Paytha"},
    {long: 73.8465563, lat: 18.4967603, cases: 50, area: "Velankar Nagar, Parvati Paytha"},
    {long: 73.8446469, lat: 18.501517, cases: 50, area: "Dandekar Pul Vasahat"},
    {long: 73.8475243, lat: 18.504401, cases: 50, area: "Ambil Odha Colony"},
    {long: 73.8452863, lat: 18.493548, cases: 50, area: "Mahatma Phule Vasahat & Laxmi Nagar, Parvati Paytha"}
  ]

  private confirmedMarkers = [
    {long: 73.8859, lat: 18.5105, cases: 463, area: "Pune Cantonment"},
    {long: 73.8735123, lat: 18.5360328, cases: 1801, area: "Dhole Patil Road"},
    {long: 73.9052891, lat: 18.5570334, cases: 407, area: "Nagar Road - Wadgoansheri"},
    {long: 73.812654, lat: 18.5609177, cases: 302, area: "Aundh Baner"},
    {long: 73.8072235, lat: 18.5012357, cases: 184, area: "Kothrud - Bavdhan"},
    {long: 73.8215563, lat: 18.498383, cases: 97, area: "Warje - Karve Nagar"},
    {long: 73.8864692, lat: 18.5454903, cases: 1133, area: "Yerwada - Kalas - Dhanori"},
    {long: 73.8874883, lat: 18.471762, cases: 252, area: "Kondhwa - Yewalewadi"},
    {long: 73.8678985, lat: 18.5087575, cases: 1001, area: "Bhawani Peth"},
    {long: 73.9324013, lat: 18.49994, cases: 479, area: "Hadapsar Mundhwa"},
    {long: 73.8556604, lat: 18.4890336, cases: 643, area: "Bibwewadi"},
    {long: 73.8556317, lat: 18.4554342, cases: 459, area: "Dhankawadi - Sahakarnagar"},
    {long: 73.8442432, lat: 18.4852537, cases: 572, area: "Singhagad Road"},
    {long: 73.9083849, lat: 18.5016267, cases: 784, area: "Wanawadi - Ramtekdi"},
    {long: 73.8566656, lat: 18.5236091, cases: 1129, area: "Kasba - Visharambaghwada"},
    {long: 73.8247899, lat: 18.5329442, cases: 918, area: "Shivaji Nagar - Ghole Road"},
    {long: 73.9477, lat: 18.5258, cases: 493, area: "Pune Rural" }
  ];


  private recoveredMarker = [
    {long: 73.8859, lat: 18.5105, cases: 0, area: "Pune Cantonment"},
    {long: 73.8735123, lat: 18.5360328, cases: 1436, area: "Dhole Patil Road"},
    {long: 73.9052891, lat: 18.5570334, cases: 222, area: "Nagar Road - Wadgoansheri"},
    {long: 73.812654, lat: 18.5609177, cases: 102, area: "Aundh Baner"},
    {long: 73.8072235, lat: 18.5012357, cases: 42, area: "Kothrud - Bavdhan"},
    {long: 73.8215563, lat: 18.498383, cases: 42, area: "Warje - Karve Nagar"},
    {long: 73.8864692, lat: 18.5454903, cases: 792, area: "Yerwada - Kalas - Dhanori"},
    {long: 73.8874883, lat: 18.471762, cases: 121, area: "Kondhwa - Yewalewadi"},
    {long: 73.8678985, lat: 18.5087575, cases: 734, area: "Bhawani Peth"},
    {long: 73.9324013, lat: 18.49994, cases: 254, area: "Hadapsar Mundhwa"},
    {long: 73.8556604, lat: 18.4890336, cases: 420, area: "Bibwewadi"},
    {long: 73.8556317, lat: 18.4554342, cases: 268, area: "Dhankawadi - Sahakarnagar"},
    {long: 73.8442432, lat: 18.4852537, cases: 200, area: "Singhagad Road"},
    {long: 73.9083849, lat: 18.5016267, cases: 374, area: "Wanawadi - Ramtekdi"},
    {long: 73.8566656, lat: 18.5236091, cases: 650, area: "Kasba - Visharambaghwada"},
    {long: 73.8247899, lat: 18.5329442, cases: 545, area: "Shivaji Nagar - Ghole Road"},
    {long: 73.9477, lat: 18.5258, cases: 257, area: "Pune Rural" }
  ];

  private activeMarker = [

    {long: 73.8859, lat: 18.5105, cases: 0, area: "Pune Cantonment"},
    {long: 73.8735123, lat: 18.5360328, cases: 318, area: "Dhole Patil Road"},
    {long: 73.9052891, lat: 18.5570334, cases: 170, area: "Nagar Road - Wadgoansheri"},
    {long: 73.812654, lat: 18.5609177, cases: 196, area: "Aundh Baner"},
    {long: 73.8072235, lat: 18.5012357, cases: 136, area: "Kothrud - Bavdhan"},
    {long: 73.8215563, lat: 18.498383, cases: 50, area: "Warje - Karve Nagar"},
    {long: 73.8864692, lat: 18.5454903, cases: 253, area: "Yerwada - Kalas - Dhanori"},
    {long: 73.8874883, lat: 18.471762, cases: 122, area: "Kondhwa - Yewalewadi"},
    {long: 73.8678985, lat: 18.5087575, cases: 203, area: "Bhawani Peth"},
    {long: 73.9324013, lat: 18.49994, cases: 206, area: "Hadapsar Mundhwa"},
    {long: 73.8556604, lat: 18.4890336, cases: 192, area: "Bibwewadi"},
    {long: 73.8556317, lat: 18.4554342, cases: 173, area: "Dhankawadi - Sahakarnagar"},
    {long: 73.8442432, lat: 18.4852537, cases: 360, area: "Singhagad Road"},
    {long: 73.9083849, lat: 18.5016267, cases: 370, area: "Wanawadi - Ramtekdi"},
    {long: 73.8566656, lat: 18.5236091, cases: 437, area: "Kasba - Visharambaghwada"},
    {long: 73.8247899, lat: 18.5329442, cases: 346, area: "Shivaji Nagar - Ghole Road"},
    {long: 73.9477, lat: 18.5258, cases:205, area: "Pune Rural" }
  ];


  constructor() {}

  ngOnInit(): void {

     var map = d3.json('assets/pune.topojson');
     var sqrtScale = d3.scaleSqrt().domain([0, 1900]).range([0, 30]);

     Promise.all([map]).then(data => {

      var summaryData = this.summarydetails;

      let mapData = data[0]
       let geoData = topojson.feature(mapData, mapData.objects["PuneWards"]).features;

       let projection = d3.geoMercator()
        .fitSize([this.width, this.height], {type:"FeatureCollection", features: geoData})

        let svg = d3.select(".punemap")

        let path = d3.geoPath()
        .projection(projection)

        svg.selectAll('.wards')
        .data(geoData)
        .enter()
        .append('path')
        .attr('d', path)
        .attr("class","path")

        // add confirmed cases
        svg.selectAll(".ward")
        .data(this.confirmedMarkers.sort(function(a, b) { 
            //sort cases low to high
            return b.cases - a.cases; 
          }))
        .enter()
        .append("circle")
          .attr("class","confirmedbubble")
          .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
          .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
          .attr("r", function(d){
            return sqrtScale(d.cases);
          })
          .style("fill", "#ff073a")
          .attr("stroke", "#FFF")
          .attr("stroke-width", 0.5)
          .attr("fill-opacity", .4)
          .on("mouseover",function(d) { 
               d3.select("#title").text(d.area).style("color","#ff073a");
               d3.select("#cases").text(d.cases);
          })
          .on("mouseout",function(d){
            d3.select("#title").text("Pune Confirmed Cases");
            d3.select("#cases").text(summaryData.DistrictCases[0].Confirmed);
          });


          // add recovered cases
          svg.selectAll(".ward")
          .data(this.recoveredMarker.sort(function(a, b) { 
              //sort cases low to high
              return b.cases - a.cases; 
            }))
          .enter()
          .append("circle")
            .attr("class","recoveredbubble")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", function(d){
              return sqrtScale(d.cases);
            })
            .style("fill", "green")
            .attr("stroke", "#FFF")
            .attr("stroke-width", 0.5)
            .attr("fill-opacity", .4)
            .on("mouseover",function(d) { 
                d3.select("#title").text(d.area).style("color","green");
                d3.select("#cases").text(d.cases);
            })
            .on("mouseout",function(d){
              d3.select("#title").text("Pune Recovered Cases").style("color","green");
              d3.select("#cases").text(summaryData.DistrictCases[0].Recovered);
            });


            // add Active cases
          svg.selectAll(".ward")
          .data(this.activeMarker.sort(function(a, b) { 
              //sort cases low to high
              return b.cases - a.cases; 
            }))
          .enter()
          .append("circle")
            .attr("class","activebubble")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", function(d){
              return sqrtScale(d.cases);
            })
            .style("fill", "#007bff")
            .attr("stroke", "#FFF")
            .attr("stroke-width", 0.5)
            .attr("fill-opacity", .4)
            .on("mouseover",function(d) { 
                d3.select("#title").text(d.area).style("color","#007bff");
                d3.select("#cases").text(d.cases);
            })
            .on("mouseout",function(d){
              d3.select("#title").text("Pune Active Cases").style("color","#007bff");
              d3.select("#cases").text(summaryData.DistrictCases[0].Active);
            });


            // show users co-ordinates using a pulsating circle based on location 
          this.getLocation().subscribe(success => {            
            let loc = [{long: this.locationset[1], lat: this.locationset[0], cases: "Active: 400"}];
            svg.selectAll(".pulsating-circle")
            .data(loc)
            .enter()
            .append("circle")
                .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
                .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
                .attr("r", 8)
                .style("fill", "#000000")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("fill-opacity", .5)
                .call(transition, 2, 8); 

        });
        
        // user current location transition loop
        function transition(element, start, end) { 
            element.transition().duration(1000).attr("r", end)
            .on("end",function(){
              d3.select(this).call(transition, end, start)
            });
        }

          // update bubble function
          function update(){             
            d3.selectAll(".checkbox").each(function(d){
              let cb = d3.select(this);
              let grp = cb.property("value")
              if(cb.property("checked")){
                svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return sqrtScale(d.cases); })
                if(grp == 'confirmedbubble'){
                  d3.select("#title").text("Pune Confirmed Cases").style("color","#ff073a");
                  d3.select("#cases").text(summaryData.DistrictCases[0].Confirmed);
                }

                if(grp == 'activebubble'){
                  d3.select("#title").text("Pune Active Cases").style("color","#007bff");
                  d3.select("#cases").text(summaryData.DistrictCases[0].Active);
                }

                if(grp == 'recoveredbubble'){
                  d3.select("#title").text("Pune Recovered Cases").style("color","green");
                  d3.select("#cases").text(summaryData.DistrictCases[0].Recovered);
                }

                if(grp == 'containbubble'){
                  d3.select("#title").text("Pune Containment Zones").style("color","orange");
                  d3.select("#cases").text("Area");
                }

              }else{
                svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
              }
            })
          }

          // change trigger
          d3.selectAll(".checkbox").on("change",update);

          update();

     });

  }


  // get user location using geo-cordinates
  getLocation(): Observable<boolean> {
    this.locationset = [];
    return new Observable(observer => {
      if(navigator){
            navigator.geolocation.getCurrentPosition( pos => {
            this.locationset.push(pos.coords.latitude);
            this.locationset.push(pos.coords.longitude);
            observer.next(true);
            observer.complete();
        });
      }else{
        observer.next(false);
        observer.complete();
      }
    });
  }

}
