/**
 * S2Demo 组件 - 使用AntV S2库展示数据透视表
 * 功能：
 * 1. 展示mockData中的数据透视表
 * 2. 支持复制表格数据
 * 3. 演示RxJS Subject的基本用法
 */
import React, { useRef, useEffect } from "react"
import { PivotSheet, S2Options } from "@antv/s2"
import { Button } from "antd"
import mockData from "./mockData"
import { Observable, delay, map, Subject } from "rxjs"

export default function () {
  // S2数据配置
  const s2DataConfig = {
    data: mockData, // 使用mockData作为数据源
    fields: {
      rows: ["group_type"], // 行维度字段
      columns: ["row_rank"], // 列维度字段
      values: [
        "creative_total_cost", // 展示的指标字段
        "creative_total_cost_rate",
        "customize_creative_name",
        "max_cost_source_url",
      ],
      valueInCols: false, // 指标是否显示在列上
    },
  }
  // S2表格配置选项
  const s2Options: S2Options = {
    width: 600, // 表格宽度
    height: 480, // 表格高度
    hierarchyType: "grid", // 层级类型为网格
    cornerExtraFieldText: "自定义", // 角头额外字段文本
    interaction: {
      copy: {
        // 复制交互配置
        enable: true, // 启用复制
        withFormat: true, // 带格式复制
        withHeader: true, // 带表头复制
      },
    },
  }
  const container = useRef<HTMLDivElement | null>(null)

  // 初始化S2表格
  useEffect(() => {
    const s2 = new PivotSheet(
      container.current as HTMLDivElement, // 挂载容器
      s2DataConfig, // 数据配置
      s2Options // 表格配置
    )
    s2.render() // 渲染表格
  }, [])

  // 创建RxJS Subject用于演示响应式编程
  const subject = new Subject<number>()

  // 订阅Subject
  subject.subscribe({
    next: (v) => {
      console.log("Received value:", v) // 打印接收到的值
      return 10
    },
  })

  // 按钮点击事件处理
  const onClick = (event) => {
    let a = subject.next(event) // 向Subject发送事件
    console.log("Subject next return:", a) // 打印next方法返回值
  }
  return (
    <div>
      <Button type="primary" onClick={onClick}>
        click
      </Button>
      <div ref={container}></div>
    </div>
  )
}
