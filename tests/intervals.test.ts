import { getDatePlus } from "../src/utility/intervals";

test("empty string, now gets same as param", ()=> {
    let now = new Date()
    expect(getDatePlus("", now).getTime()).toBe(now.getTime())
    expect(getDatePlus("now", now).getTime()).toBe(now.getTime())
})

test("hour works as expected", ()=> {
    let now = new Date()
    let plus2hours = now.getTime() + 2 * 60 * 60 * 1000
    let minus2hours = now.getTime() - (2*60*60*1000)
    expect(getDatePlus("2h", now).getTime()).toBe(plus2hours)
    expect(getDatePlus("-2 hours", now).getTime()).toBe(minus2hours)
})

test("minute works as expected", ()=> {
    let now = new Date()
    let plus25mins = now.getTime() + 25 * 60 * 1000
    let minus25mins = now.getTime() - (25*60*1000)
    expect(getDatePlus("25 mins", now).getTime()).toBe(plus25mins)
    expect(getDatePlus("-25m", now).getTime()).toBe(minus25mins)
})

test("day works as expected", ()=> {
    let now = new Date()
    let plus3days = now.getTime() + 3 * 24 * 60 * 60 * 1000
    let minus3days = now.getTime() - (3 * 24 * 60 * 60 * 1000)
    expect(getDatePlus("3d", now).getTime()).toBe(plus3days)
    expect(getDatePlus("-3 days", now).getTime()).toBe(minus3days)
})

test("exact date works as expected", ()=> {
    let target = new Date("04/30/2023")
    expect(getDatePlus("4/30/23").getTime()).toBe(target.getTime())
    expect(()=>{getDatePlus("not a date")}).toThrow()
})