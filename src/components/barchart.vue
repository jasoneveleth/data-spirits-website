<template>
    <div class="container">
        <svg id="chart"></svg>
    </div>
  </template>
  
  <script>
import * as d3 from 'd3';

const parseTime = d3.timeParse("%Y-%m-%d");

const barSize = 48
const marginTop = 16
const marginRight = 6
const marginBottom = 6
const marginLeft = 0
const n = 15 // number of bars to show

const k = 10 // how fast things switch places?

const height = marginTop + barSize * n + marginBottom
const width = 975
const duration = 250


const tickFormat = d3.format(",d")
const formatNumber = d3.format(",d")
const formatDate = d3.utcFormat("%Y")


let x = d3.scaleLinear([0, 1], [marginLeft, width - marginRight])
let y = d3.scaleBand()
  .domain(d3.range(n + 1))
  .rangeRound([marginTop, marginTop + barSize * (n + 1 + 0.1)])
  .padding(0.1)

  export default{
    props: ["play1", "dataStr"],
    emits: [],
    components: {},
    data() {
      return {
        svg: null,
        currFrame: 0,
        goGoGo: false,
        names: undefined,
        datevalues: undefined,
        keyframes: undefined,
        color: undefined,
        nameframes: undefined,
        prev: undefined,
        next: undefined,
        updateBars: undefined,
        updateAxis: undefined,
        updateLabels: undefined,
        updateTicker: undefined,
      }
    },
    computed: {
    },
    methods: {
        rank(value) {
            const data = Array.from(this.names, name => ({name, value: value(name)}));
            data.sort((a, b) => d3.descending(a.value, b.value));
            for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
            return data;
        },
        bars(svg) {
        let bar = svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("rect");

        return ([date, data], transition) => bar = bar
            .data(data.slice(0, n), d => d.name)
            .join(
            enter => enter.append("rect")
                .attr("fill", this.color)
                .attr("height", y.bandwidth())
                .attr("x", x(0))
                .attr("y", d => y((this.prev.get(d) || d).rank))
                .attr("width", d => x((this.prev.get(d) || d).value) - x(0)),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("y", d => y((this.next.get(d) || d).rank))
                .attr("width", d => x((this.next.get(d) || d).value) - x(0))
            )
            .call(bar => bar.transition(transition)
            .attr("y", d => y(d.rank))
            .attr("width", d => x(d.value) - x(0)));
        },
        labels(svg) {
        let label = svg.append("g")
            .style("font", "bold 12px var(--sans-serif)")
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .selectAll("text");

        return ([date, data], transition) => label = label
            .data(data.slice(0, n), d => d.name)
            .join(
            enter => enter.append("text")
                .attr("transform", d => `translate(${x((this.prev.get(d) || d).value)},${y((this.prev.get(d) || d).rank)})`)
                .attr("y", y.bandwidth() / 2)
                .attr("x", -6)
                .attr("dy", "-0.25em")
                .text(d => d.name)
                .call(text => text.append("tspan")
                .attr("fill-opacity", 0.7)
                .attr("font-weight", "normal")
                .attr("x", -6)
                .attr("dy", "1.15em")),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("transform", d => `translate(${x((this.next.get(d) || d).value)},${y((this.next.get(d) || d).rank)})`)
                .call(g => g.select("tspan").tween("text", d => this.textTween(d.value, (this.next.get(d) || d).value)))
            )
            .call(bar => bar.transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g => g.select("tspan").tween("text", d => this.textTween((this.prev.get(d) || d).value, d.value))));
        },
        textTween(a, b) {
        const i = d3.interpolateNumber(a, b);
        return function(t) {
            this.textContent = formatNumber(i(t));
        };
        },
        axis(svg) {
        const g = svg.append("g")
            .attr("transform", `translate(0,${marginTop})`);

        const axis = d3.axisTop(x)
            .ticks(width / 160, tickFormat)
            .tickSizeOuter(0)
            .tickSizeInner(-barSize * (n + y.padding()));

        return (_, transition) => {
            g.transition(transition).call(axis);
            g.select(".tick:first-of-type text").remove();
            g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
            g.select(".domain").remove();
        };
        },
        ticker(svg) {
        const now = svg.append("text")
            .style("font", `bold ${barSize}px var(--sans-serif)`)
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .attr("x", width - 6)
            .attr("y", marginTop + barSize * (n - 0.45))
            .attr("dy", "0.32em")
            .text(formatDate(this.keyframes[0][0]));

        return ([date], transition) => {
            transition.end().then(() => now.text(formatDate(date)));
        };
        },
        colorf(data) {
        const scale = d3.scaleOrdinal(d3.schemeTableau10);
        if (data.some(d => d.category !== undefined)) {
            const categoryByName = new Map(data.map(d => [d.name, d.category]))
            scale.domain(categoryByName.values());
            return d => scale(categoryByName.get(d.name));
        }
        return d => scale(d.name);
        },
        async playAnimation() {
            if (!this.goGoGo) {
                return
            }
            const keyframe = this.keyframes[this.currFrame]
            const transition = this.svg.transition()
                .duration(duration)
                .ease(d3.easeLinear);

            // Extract the top bar’s value.
            x.domain([0, keyframe[1][0].value]);

            this.updateAxis(keyframe, transition);
            this.updateBars(keyframe, transition);
            this.updateLabels(keyframe, transition);
            this.updateTicker(keyframe, transition);

            // invalidation.then(() => svg.interrupt());
            await transition.end();
            this.currFrame++
            if (this.currFrame < this.keyframes.length) {
                this.playAnimation(this.currFrame)
            }
        },
        initialize(newValue) {
            if (this.svg === null) {
                this.svg = d3.select("svg")
            }
            if (newValue.length === 0) {
                return
            }
            newValue.forEach(d => {
                d.date = parseTime(d.date)
            })
            const thedata = newValue
            this.currFrame = 0
            this.svg.selectAll("*").remove();
            this.names = new Set(thedata.map(d => d.name))

            this.datevalues = Array.from(d3.rollup(thedata, ([d]) => d.value, d => +d.date, d => d.name))
                .map(([date, data]) => [new Date(date), data])
                .sort(([a], [b]) => d3.ascending(a, b))
            this.keyframes = []
            let ka, a, kb, b;
            for ([[ka, a], [kb, b]] of d3.pairs(this.datevalues)) {
                for (let i = 0; i < k; ++i) {
                    const t = i / k;
                    this.keyframes.push([
                        new Date(ka * (1 - t) + kb * t),
                        this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                    ])
                }
            }
            this.keyframes.push([new Date(kb), this.rank(name => b.get(name) || 0)])
            this.color = this.colorf(thedata)
            this.nameframes = d3.groups(this.keyframes.flatMap(([, data]) => data), d => d.name)
            this.prev = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
            this.next = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data)))
            this.updateBars = this.bars(this.svg)
            this.updateAxis = this.axis(this.svg)
            this.updateLabels = this.labels(this.svg)
            this.updateTicker = this.ticker(this.svg)
        }
    },
    mounted() {
        this.svg = d3.select("svg")
        this.initialize(this.dataStr)
    },
    watch: {
        play1(newValue) {
            if (newValue) {
                this.goGoGo = true
            } else {
                this.goGoGo = false
            }
            this.playAnimation(this.currFrame)
        },
        dataStr(newValue) {
            this.initialize(newValue)
        }
    }
  }
  </script>
  
  <style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
  .container {
    width: 100%;
  }
  </style>
  