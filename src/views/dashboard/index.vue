<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
      <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
      <div class="pie">
        <div class="">

        </div>
      </div>
      <div id="barpic">

      </div>
    </div>
  </template>

  <script>
    import { mapGetters } from 'vuex'
    import Echarts from 'echarts'
    export default {
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'name',
          'roles'
          ])
      },

      methods: {
        init(){
          this.bar()
        },

        bar() {
          var myChart = Echarts.init(document.getElementById('barpic'));
          var xAxisData = [];
          var data1 = [];
          var data2 = [];
          for (var i = 0; i < 100; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
          }

          var option = {
            title: {
              text: '柱状图动画延迟'
            },
            legend: {
              data: ['bar', 'bar2'],
              align: 'left'
            },
            toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
    myChart.setOption(option);
  }
},

mounted(){
  this.init()
}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
#barpic{
  width: 100%;
  height: 400px;
}
.pie{
  width: 100%;
  height: 400px;
}
</style>
