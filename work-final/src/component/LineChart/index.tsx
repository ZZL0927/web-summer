import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';
import { PieChart } from 'echarts/charts';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart
]);
export default function Chart(props:{
  option:{
    xAxis:{
      data:string[]
    },
    yAxis:{}
    series:{type:string,data:number[],barWidth: '20%'}[]
  }
}) {
    const chartRef = useRef(null)
    useEffect(()=>{
        let chartInstance = echarts.init(chartRef.current!)
        chartInstance.setOption(props.option)
    },[props.option])
  return (
    <div ref={chartRef} style={{ height: "230px" }}></div>
  )
}
