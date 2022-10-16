import ResepHelper from "./ResepHelper.js"

test('display decimal as Sp', () => {
    let price = 1.5
    let displayedPrice = ResepHelper.displayPrice(price)
    expect(displayedPrice).toBe("Sp1")
})

test('display integer as Lp', () => {
    let price = 1
    let displayedPrice = ResepHelper.displayPrice(price)
    expect(displayedPrice).toBe("Lp1")
})

test('display decimal with zero (e.g. 1.0) as Lp', () => {
    let price = 1.0
    let displayedPrice = ResepHelper.displayPrice(price)
    expect(displayedPrice).toBe("Lp1")
})