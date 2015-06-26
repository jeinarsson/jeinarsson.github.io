var sources = [
    {title: 'Social democrats', color: d3.rgb(238, 32, 32) }, 
    {title: 'Government', color: d3.rgb(27, 73, 221) },
    {title: 'Other', color: d3.rgb(255, 165, 0) }
];
var committees = [
{ title: 'Traffic', color: d3.rgb(128, 0, 128) }, 
{ title: 'Tax', color: d3.rgb(128, 0, 128) }, 
{ title: 'Defense', color: d3.rgb(128, 0, 128) }, 
{ title: 'Foreign Affairs', color: d3.rgb(128, 0, 128) }
];
var decisions = [
{ title: 'Accepted', color: d3.rgb(44, 160, 44) }, 
{ title: 'Rejected', color: d3.rgb(214, 39, 40) }
];

var examplePathsData = {
    nodes: [
        {
            title: 'Proposal\nSources',
            x: 0,
            items: [
            {
                title: '',
                label: 0,
                items: sources
            }
            ]
        },
        {
            title: 'Committees',
            x: 0.5,
            items: [
            {
                title: '',
                label: 0,
                items: (function() {
                    var ret=[];
                    sources.forEach(function(source) {
                        committees.forEach(function(committee) {
                            ret.push({ title: source.title + " -> " + committee.title, color: committee.color });
                        });
                    });
                    return ret;
                })()
            }
            ]
        },
        {
            title: 'Decisions',
            x: 1,
            items: [
            {
                title: '',
                label: 0,
                items: (function() {
                    var ret=[];
                    sources.forEach(function(source) {
                        committees.forEach(function(committee) {
                            decisions.forEach(function(decision) {
                                ret.push({ title: source.title + " -> " + committee.title + " -> " + decision.title, color: decision.color });
                            });
                        });
                    });
                    return ret;
                })()
            },             
            ]
        }                        
    ],
    flows: (function() {
        var ret = [];
        sources.forEach(function(source,i) {
            committees.forEach(function(committee,j) {
                decisions.forEach(function(decision,k) {
                    var source_idx = i;
                    var committee_idx = i*committees.length+j;
                    var decision_idx = committee_idx*decisions.length+k;
                    ret.push({ magnitude: 5, path: [[0,0,source_idx], [1,0,committee_idx]] });
                    ret.push({ magnitude: 5, path: [[1,0,committee_idx],[2,0,decision_idx]] });
                });
            });
        });
        return ret;
    })()
};

var exampleFlowsData = {
    nodes: [
        {
            title: 'Proposal\nSources',
            x: 0,
            items: [
            {
                title: '',
                label: 0,
                items: sources
            }
            ]
        },
        {
            title: 'Committees',
            x: 0.5,
            items: [
            {
                title: '',
                label: 0,
                items: committees
            }
            ]
        },
        {
            title: 'Decisions',
            x: 1,
            items: [
            {
                title: '',
                label: 0,
                items: decisions
            },             
            ]
        }                        
    ],
    flows: (function() {
        var ret = [];
        sources.forEach(function(source,i) {
            committees.forEach(function(committee,j) {
                ret.push({magnitude:5, path: [[0,0,i],[1,0,j]]});
            });
        });
        committees.forEach(function(committee,j) {
            decisions.forEach(function(decision,k) {
                ret.push({magnitude:sources.length * 5 / decisions.length, path: [[1,0,j],[2,0,k]]});
            });
        });

        return ret;
    })()
};

var exampleSankeyData = {
    nodes: [
        {
            title: 'Proposal\nSources',
            x: 0,
            items: [
            {
                title: '',
                label: 0,
                items: sources
            }
            ]
        },
        {
            title: 'Committees',
            x: 0.5,
            items: [
            {
                title: '',
                label: 0,
                items: committees
            }
            ]
        },
        {
            title: 'Decisions',
            x: 1,
            items: [
            {
                title: '',
                label: 0,
                items: decisions
            },             
            ]
        }                        
    ],
    flows: (function() {
        var ret = [];
        sources.forEach(function(source,i) {
            committees.forEach(function(committee,j) {
                decisions.forEach(function(decision,k) {
                    ret.push({ magnitude: 5, path: [[0,0,i], [1,0,j],[2,0,k]] });
                });
            });
        });
        return ret;
    })()
};

var chartPath = d3.pathSankey()
                    .width(450).height(250)
                    .selectedNodeAddress([0,0,1]);
var chartFlow = d3.pathSankey()
                    .width(450).height(250)
                    .selectedNodeAddress([0,0,1]);
var chartSankey = d3.pathSankey()
                    .width(450).height(250)
                    .selectedNodeAddress([0,0,1]);

function initializeExamples() {
    d3.select("#figExamplePaths").datum(examplePathsData);
    d3.select("#figExampleFlows").datum(exampleFlowsData);
    d3.select("#figExampleSankey").datum(exampleSankeyData);
    
    d3.select(window).on("resize",drawExamples);
    drawExamples();
}


function getInnerWidth(selection) {
  var cs = window.getComputedStyle(selection.node());
  return parseInt(cs.width) - parseInt(cs.paddingLeft) - parseInt(cs.paddingRight);
}

function drawExamples() {

  var container = d3.select('section');
  var width = getInnerWidth(container);
  width = width > 450 ? 450 : width;
  var height = Math.round(width/2); 

  d3.select("#figExamplePaths")
    .html("")
    .attr("width", width)
    .attr("height", height)
    .call(chartPath);

  d3.select("#figExampleFlows")
    .html("")
    .attr("width", width)
    .attr("height", height)
    .call(chartFlow);

  d3.select("#figExampleSankey")
    .html("")
    .attr("width", width)
    .attr("height", height)
    .call(chartSankey);        

}