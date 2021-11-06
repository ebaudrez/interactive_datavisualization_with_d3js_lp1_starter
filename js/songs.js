const topRockSongs = [
  { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
  { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
  { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
  { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
  { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
];

const topSongsSection = d3.select('#top-songs');
topSongsSection.append('h3').text('Top Rock Songs');

const circlesChartWidth = 600;
const circlesChartHeight = 130;
const circlesChart = topSongsSection.append('svg')
  .attr('viewbox', [0, 0, circlesChartWidth, circlesChartHeight])
  .attr('width', circlesChartWidth)
  .attr('height', circlesChartHeight);

circlesChart.append('line')
  .attr('x1', 0).attr('y1', circlesChartHeight / 2)
  .attr('x2', circlesChartWidth).attr('y2', circlesChartHeight / 2)
  .attr('stroke', '#333').attr('stroke-width', 2);

// to emphasize the _relative_ differences between the sales volume, I
// intentionally reduce the domain and range; although this wouldn't be OK in a
// context where objective comparisons must be made, I reckon it should be
// acceptable right here ...
const circlesScale = d3.scaleSqrt()
  .domain([d3.min(topRockSongs, d => d.sales_and_streams), d3.max(topRockSongs, d => d.sales_and_streams)])
  .range([20, 45]);
const circlesPos = d3.scaleLinear()
  .domain([0, topRockSongs.length - 1])
  .range([55, circlesChartWidth - 55]);

const circlesChartGroups = circlesChart
  .selectAll('g')
  .data(topRockSongs)
  .join('g');

circlesChartGroups
  .append('circle')
    .attr('cx', (d, i) => circlesPos(i))
    .attr('cy', circlesChartHeight / 2)
    .attr('r', d => circlesScale(d.sales_and_streams))
    .attr('fill', '#a6d854');

circlesChartGroups
  .append('text')
    .attr('class', 'label label-volume')
    .attr('x', (d, i) => circlesPos(i))
    .attr('y', 10)
    .text(d => d.sales_and_streams / 1_000_000 + 'M');

circlesChartGroups
  .append('text')
    .attr('class', 'label label-title')
    .attr('x', (d, i) => circlesPos(i))
    .attr('y', circlesChartHeight - 20)
    .text(d => d.title);

circlesChartGroups
  .append('text')
    .attr('class', 'label label-artist')
    .attr('x', (d, i) => circlesPos(i))
    .attr('y', circlesChartHeight - 5)
    .text(d => '(' + d.artist + ')');
