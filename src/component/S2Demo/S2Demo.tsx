import React, { useRef, useEffect } from "react"
import { PivotSheet, S2Options } from "@antv/s2"
import { Button } from "antd"
import mockData from "./mockData"
export default function () {
  const s2DataConfig = {
    data: mockData,
    fields: {
      rows: ["group_type"],
      columns: ["row_rank"],
      values: [
        "creative_total_cost",
        "creative_total_cost_rate",
        "customize_creative_name",
        "max_cost_source_url",
      ],
      valueInCols: false,
    },
  }
  const s2Options: S2Options = {
    width: 600,
    height: 480,
    hierarchyType: "grid",
    cornerExtraFieldText: "自定义",
    interaction: {
      copy: {
        enable: true,
        withFormat: true,
        withHeader: true,
      },
    },
  }
  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const s2 = new PivotSheet(
      container.current as HTMLDivElement,
      s2DataConfig,
      s2Options
    )
    s2.render()
  }, [])

  return (
    <div>
      {/* <Button type="primary">click</Button> */}
      <div ref={container}></div>
    </div>
  )
}
