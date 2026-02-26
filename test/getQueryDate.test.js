import { describe, expect, it } from "vitest"
import { getQueryDate } from "../src/js/getQueryDate.js"

describe("getQueryDate", () => {
  it("year, month, day がすべて揃っているときに Date オブジェクトを返す", () => {
    const result = getQueryDate("?year=2024&month=6&day=15")

    expect(result).toEqual(new Date(2024, 5, 15))
  })

  it("クエリパラメータの順番に依存せず Date オブジェクトを返す", () => {
    const result = getQueryDate("?month=12&day=25&year=1990")

    expect(result).toEqual(new Date(1990, 11, 25))
  })

  it("クエリパラメータが足りない場合は null を返す", () => {
    expect(getQueryDate("?year=2024&month=6")).toBeNull()
    expect(getQueryDate("?year=2024&day=1")).toBeNull()
    expect(getQueryDate("?month=6&day=1")).toBeNull()
    expect(getQueryDate("")).toBeNull()
  })

  it("year, month, day のいずれかが整数として解釈できない場合は null を返す", () => {
    // 数値に変換できない文字列
    expect(getQueryDate("?year=abcd&month=6&day=1")).toBeNull()
    // 小数
    expect(getQueryDate("?year=2024&month=6.5&day=1")).toBeNull()
    expect(getQueryDate("?year=2024&month=6&day=1.2")).toBeNull()
  })

  it("整数として解釈できる文字列であれば前後に空白があっても Date オブジェクトを返す", () => {
    const result = getQueryDate("?year= 2024 &month= 6 &day= 1 ")

    expect(result).toEqual(new Date(2024, 5, 1))
  })
})
