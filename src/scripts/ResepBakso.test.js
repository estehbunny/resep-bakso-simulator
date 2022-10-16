import ResepBakso from "./ResepBakso";

describe("Get required ingredient data", () => {
    test("Get required 1 bakso ingredient info for PC", () => {
        const resepBaksoHelper = new ResepBakso(false)
        const info = resepBaksoHelper.getRequiredIngredientData("bakso", 1)
        let expectedInfo = {
            "id": "bakso",
            "name": "Bakso",
            "price": 22500,
            "requiredAmount": 1,
            "amount": 25,
            "availability": "Supermarket",
            "instantBuy": {
                "amount": 25,
                "price": 45000,
            },
            "essential": true
        }
        expect(info).toStrictEqual(expectedInfo)
    })

    test("Get required 1 bakso ingredient info for mobile", () => {
        const resepBaksoHelper = new ResepBakso(true)
        const info = resepBaksoHelper.getRequiredIngredientData("bakso", 1)
        let expectedInfo = {
            "id": "bakso",
            "name": "Bakso",
            "price": 30000,
            "amount": 25,
            "requiredAmount": 1,
            "availability": "Supermarket",
            "instantBuy": {
                "amount": 25,
                "price": 45000,
            },
            "essential": true
        }
        expect(info).toStrictEqual(expectedInfo)
    })

    test("Get required 1 micin ingredient info for PC", () => {
        const resepBaksoHelper = new ResepBakso(false)
        const info = resepBaksoHelper.getRequiredIngredientData("micin", 1)
        let expectedInfo = {
            "id": "micin",
            "name": "Micin",
            "price": 30000,
            "requiredAmount": 1,
            "amount": 25,
            "availability": "Toko Rahasia",
            "essential": false,
            "instantBuy": undefined,
        }
        expect(info).toStrictEqual(expectedInfo)
    })

    test("Get required 1 micin ingredient info for mobile", () => {
        const resepBaksoHelper = new ResepBakso(true)
        const info = resepBaksoHelper.getRequiredIngredientData("micin", 1)
        let expectedInfo = {
            "id": "micin",
            "name": "Micin",
            "price": 40000,
            "requiredAmount": 1,
            "amount": 25,
            "availability": "Toko Rahasia",
            "essential": false,
            "instantBuy": undefined,
        }
        expect(info).toStrictEqual(expectedInfo)
    })
})

describe("Get recipe information", () => {
    test("Get recipe information for bakso ori (PC)", () => {
        const resepBaksoHelper = new ResepBakso(false)
        const data = resepBaksoHelper.baksoList.find((e) => {
            return e.id === "bakso-original"
        })
        const info = resepBaksoHelper.getRecipeInformation(data)
        expect(info.recipe[0].id).toBe("bakso")
        expect(info.recipe[0].requiredAmount).toBe(2)
        expect(info.recipe[0].amount).toBe(25)
        expect(info.recipe[1].id).toBe("cabe")
        expect(info.recipe[1].requiredAmount).toBe(1)
        expect(info.recipe[1].amount).toBe(25)
        expect(info.recipe[2].id).toBe("sayur")
        expect(info.recipe[2].requiredAmount).toBe(1)
        expect(info.recipe[2].amount).toBe(25)
        expect(info.recipe[3].id).toBe("mie-bihun")
        expect(info.recipe[3].requiredAmount).toBe(1)
        expect(info.recipe[3].amount).toBe(25)
        expect(info.recipe[4].id).toBe("bumbu")
        expect(info.recipe[4].requiredAmount).toBe(1)
        expect(info.recipe[4].amount).toBe(25)
    })

    test("Get recipe information for bakso ori (PC, called twice)", () => {
        const resepBaksoHelper = new ResepBakso(false)
        const data = resepBaksoHelper.baksoList.find((e) => {
            return e.id === "bakso-original"
        })
        let info = resepBaksoHelper.getRecipeInformation(data)
        info = resepBaksoHelper.getRecipeInformation(data)
        expect(info.recipe[0].id).toBe("bakso")
        expect(info.recipe[0].requiredAmount).toBe(2)
        expect(info.recipe[0].amount).toBe(25)
        expect(info.recipe[1].id).toBe("cabe")
        expect(info.recipe[1].requiredAmount).toBe(1)
        expect(info.recipe[1].amount).toBe(25)
        expect(info.recipe[2].id).toBe("sayur")
        expect(info.recipe[2].requiredAmount).toBe(1)
        expect(info.recipe[2].amount).toBe(25)
        expect(info.recipe[3].id).toBe("mie-bihun")
        expect(info.recipe[3].requiredAmount).toBe(1)
        expect(info.recipe[3].amount).toBe(25)
        expect(info.recipe[4].id).toBe("bumbu")
        expect(info.recipe[4].requiredAmount).toBe(1)
        expect(info.recipe[4].amount).toBe(25)
    })
})

describe("Get price per amount", () => {
    test("Get cost required for 5 bakso in PC", () => {
        const resepBaksoHelper = new ResepBakso(false)
        const data = resepBaksoHelper.getRequiredIngredientData("bakso")
        let ingredientCost = ResepBakso.getPricePerAmount(data, 5)
        let ingredientCostInstantBuy = ResepBakso.getPricePerAmount(data.instantBuy, 5)
        expect(ingredientCost).toBe(4500)
        expect(ingredientCostInstantBuy).toBe(9000)
    })
    test("Get cost required for 5 bakso in mobile", () => {
        const resepBaksoHelper = new ResepBakso(true)
        const data = resepBaksoHelper.getRequiredIngredientData("bakso")
        let ingredientCost = ResepBakso.getPricePerAmount(data, 5)
        let ingredientCostInstantBuy = ResepBakso.getPricePerAmount(data.instantBuy, 5)
        expect(ingredientCost).toBe(6000)
        expect(ingredientCostInstantBuy).toBe(9000)
    })
})