import { describe, expect, it } from "vitest"
import { getQueryTime } from "../src/js/getQueryTime.js"

describe("getQueryTime", () => {
  it("sleepTime, wasteTime, workTime がすべて数値として解釈できるときにオブジェクトを返す", () => {
    const result = getQueryTime("?sleepTime=8&wasteTime=2&workTime=8")

    expect(result).toEqual({ sleepTime: 8, wasteTime: 2, workTime: 8 })
  })

  it("クエリパラメータの順番に依存せずオブジェクトを返す", () => {
    const result = getQueryTime("?workTime=10&sleepTime=7&wasteTime=1")

    expect(result).toEqual({ sleepTime: 7, wasteTime: 1, workTime: 10 })
  })

  it("いずれかが数値として解釈できない場合は null を返す", () => {
    expect(getQueryTime("?sleepTime=abc&wasteTime=2&workTime=8")).toBeNull()
    expect(getQueryTime("?sleepTime=8&wasteTime=hoge&workTime=8")).toBeNull()
    expect(getQueryTime("?sleepTime=8&wasteTime=2&workTime=foo")).toBeNull()
  })

  it("前後に空白があっても数値として解釈できる場合はオブジェクトを返す", () => {
    const result = getQueryTime("?sleepTime= 8 &wasteTime= 1 &workTime= 10 ")

    expect(result).toEqual({ sleepTime: 8, wasteTime: 1, workTime: 10 })
  })

  it("小数を含む文字列でも数値として解釈できればオブジェクトを返す", () => {
    const result = getQueryTime("?sleepTime=7.5&wasteTime=1.25&workTime=40.5")

    expect(result).toEqual({
      sleepTime: 7.5,
      wasteTime: 1.25,
      workTime: 40.5,
    })
  })
})
