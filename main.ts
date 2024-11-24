namespace SpriteKind {
    export const Utility = SpriteKind.create()
    export const ButiksMedarbejderMajs = SpriteKind.create()
    export const ButiksmedarbejderGulderod = SpriteKind.create()
    export const ButiksmedarbedjerKartoffel = SpriteKind.create()
    export const ModerJord = SpriteKind.create()
    export const Abe = SpriteKind.create()
}
namespace StatusBarKind {
    export const Money = StatusBarKind.create()
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`x0`, function (sprite, location) {
    if (MainTileMap == "Butik") {
        tileUtil.loadConnectedMap(MapConnectionKind.Door2)
        tileUtil.connectMaps(TileMapButik, TileMapMenu, MapConnectionKind.Door2)
        tiles.placeOnTile(Bondemand, tiles.getTileLocation(9, 13))
        controller.moveSprite(Bondemand, 200, 200)
        sprites.destroy(ChooseArrow)
        ChoosenSeedsToBuy = 0
        PlaceSælgere()
    } else if (MainTileMap == "Farm") {
        tileUtil.loadConnectedMap(MapConnectionKind.Door2)
        tileUtil.connectMaps(TileMapLandbrug, TileMapMenu, MapConnectionKind.Door2)
        ABEfar()
        Moderjord = sprites.create(assets.image`ModerJord`, SpriteKind.ModerJord)
        tiles.placeOnTile(Moderjord, tiles.getTileLocation(37, 47))
        tiles.placeOnTile(Bondemand, tiles.getTileLocation(34, 47))
        controller.moveSprite(Bondemand, 200, 200)
        sprites.destroy(ChooseArrow)
    }
})
function DestroySælgere () {
    sprites.destroy(MajsSælger)
    sprites.destroy(KartoffelSælger)
    sprites.destroy(Gulerodsælger)
    sprites.destroy(Moderjord)
}
function MovePlayerAnimation () {
    if ((MainTileMap == "Farm" || MainTileMap == "Butik") && !(tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), assets.tile`Block6`))) {
        controller.moveSprite(Bondemand, 200, 200)
        if (Bondemand.vx != 0 || Bondemand.vy != 0) {
            animation.runImageAnimation(
            Bondemand,
            assets.animation`BondemandMoving`,
            100,
            true
            )
        } else {
            animation.stopAnimation(animation.AnimationTypes.All, Bondemand)
            Bondemand.setImage(assets.image`Bondemand`)
        }
    } else {
        controller.moveSprite(Bondemand, 0, 0)
        animation.stopAnimation(animation.AnimationTypes.All, Bondemand)
        Bondemand.setImage(assets.image`EmptySpirit`)
    }
}
function CreateFieldsMedium (num: number, Index: number) {
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + Index), assets.tile`FarmFieldLeftTop`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + Index), assets.tile`FarmFieldRightTop`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldLeftBtn`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldRightBtn`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 2, Index + FieldTileCount + Index), assets.tile`FarmField`)
    FarmFieldColRow.push(num + 2)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 2, Index + FieldTileCount + (Index + 1)), assets.tile`FarmField`)
    FarmFieldColRow.push(num + 2)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    MediumField.push(FarmFieldColRow)
    FarmFieldColRow = []
}
function GrowPlants (SeedToGrow: number) {
    FieldToGrowOn = 10
    if (SeedTypeArray[SeedGrowthTime.indexOf(SeedToGrow)] == 3) {
        for (let index = 0; index < FieldToGrowOn; index++) {
            tiles.setTileAt(tiles.getTileLocation(PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0), PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0)), assets.tile`MajsSlut`)
        }
    } else if (SeedTypeArray[SeedGrowthTime.indexOf(SeedToGrow)] == 4) {
        for (let index = 0; index < FieldToGrowOn; index++) {
            tiles.setTileAt(tiles.getTileLocation(PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0), PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0)), assets.tile`GulerodSlut`)
        }
    } else if (SeedTypeArray[SeedGrowthTime.indexOf(SeedToGrow)] == 2) {
        for (let index = 0; index < FieldToGrowOn; index++) {
            tiles.setTileAt(tiles.getTileLocation(PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0), PlantedSeedsAarry[SeedGrowthTime.indexOf(SeedToGrow)].removeAt(0)), assets.tile`KartoffelSlut`)
        }
    }
    PlantedSeedsAarry.removeAt(SeedGrowthTime.indexOf(SeedToGrow))
    SeedTypeArray.removeAt(SeedGrowthTime.indexOf(SeedToGrow))
    SeedGrowthTime.removeAt(SeedGrowthTime.indexOf(SeedToGrow))
}
function Startskærm () {
    scene.setBackgroundImage(assets.image`start skærm`)
    Moderjord = sprites.create(assets.image`ModerJord`, SpriteKind.ModerJord)
    animation.runImageAnimation(
    Moderjord,
    assets.animation`Moder jord danser`,
    500,
    true
    )
    Moderjord.setPosition(120, 71)
    game.showLongText("Velkommen. Verden sulter!!! Du har fået ansvaret for en ny verdensfarm. ", DialogLayout.Top)
    pause(500)
    game.showLongText("Din mission er at plante så mange afgrøder du kan og donere dem til mig, Moderjord. ", DialogLayout.Top)
    pause(500)
    game.showLongText("Jeg vil sørge for dem der sulter vil få din mad.", DialogLayout.Top)
    pause(500)
    game.showLongText("Du starter med 4 kartoffelfrø og penge nok til en mark.", DialogLayout.Top)
    pause(500)
    game.showLongText("Tryk A for at købe den første mark. Du kan finde mig og butikken rundt på farmen.", DialogLayout.Top)
    pause(500)
    game.showLongText("Brug dine penge ordenligt. Held og lykke! Verden har brug for dig.", DialogLayout.Top)
    pause(500)
    animation.stopAnimation(animation.AnimationTypes.All, Moderjord)
    sprites.destroy(Moderjord)
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`UY`, function (sprite, location) {
    HoverNumbersMenu(11)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Bondemand.sayText("")
    PlantPåGrund()
})
scene.onOverlapTile(SpriteKind.Utility, assets.tile`1`, function (sprite, location) {
    HoverNumbersMenu(1)
})
function VælgAfgrøder (Number2: number) {
    if (Number2 == 2) {
        Bondemand.sayText("Kartoffel")
    } else if (Number2 == 3) {
        Bondemand.sayText("Majs")
    } else if (Number2 == 4) {
        Bondemand.sayText("Gulerod")
    }
}
function GetTileNumbers (Number2: number, Col: number, Row: number, TypeToChange: string) {
    for (let index = 0; index <= 6; index++) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`0`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`1`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`2`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`3`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`4`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`5`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`6`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`7`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`8`) || tiles.tileAtLocationEquals(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`9`)))))))))) {
            tiles.setTileAt(tiles.getTileLocation(Col + (index + 1), Row), assets.tile`BlackTile`)
        } else {
            break;
        }
    }
    if (Number2 == 0) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`0`)
    } else if (Number2 == 1) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`1`)
    } else if (Number2 == 2) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`2`)
    } else if (Number2 == 3) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`3`)
    } else if (Number2 == 4) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`4`)
    } else if (Number2 == 5) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`5`)
    } else if (Number2 == 6) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`6`)
    } else if (Number2 == 7) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`7`)
    } else if (Number2 == 8) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`8`)
    } else if (Number2 == 9) {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`9`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ButiksMedarbejderMajs, function (sprite, otherSprite) {
    tileUtil.connectMaps(TileMapButik, TileMapBuyMenuMajs, MapConnectionKind.Door2)
    tileUtil.loadConnectedMap(MapConnectionKind.Door2)
    controller.moveSprite(Bondemand, 0, 0)
    DestroySælgere()
    SetNumbersInMenu("Money", MoneyTotal)
    SetNumbersInMenu("SeedCountToBuy", ChoosenSeedsToBuy)
    tiles.setTileAt(tiles.getTileLocation(1, 2), assets.tile`SeedMajs`)
    tiles.setTileAt(tiles.getTileLocation(2, 2), assets.tile`5`)
    pause(200)
    ChooseArrow = sprites.create(assets.image`ChooseArrow`, SpriteKind.Utility)
    controller.moveSprite(ChooseArrow, 150, 150)
})
function MenuFunctions () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedKartoffel0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedGulerod0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedMajs`)) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(2, 4), assets.tile`1Hover`)) {
            ChoosenSeedsToBuy += 1
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(3, 4), assets.tile`2Hover`)) {
            ChoosenSeedsToBuy += 2
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(4, 4), assets.tile`4Hover`)) {
            ChoosenSeedsToBuy += 4
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 4), assets.tile`6Hover`)) {
            ChoosenSeedsToBuy += 6
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(6, 4), assets.tile`8Hover`)) {
            ChoosenSeedsToBuy += 8
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(7, 4), assets.tile`10Hover`)) {
            ChoosenSeedsToBuy += 10
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(3, 6), assets.tile`BUHover`) || tiles.tileAtLocationEquals(tiles.getTileLocation(4, 6), assets.tile`UYHover`)) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedMajs`)) {
                if (ChoosenSeedsToBuy * 50 <= MoneyTotal) {
                    MajsSeeds += ChoosenSeedsToBuy
                    MoneyTotal += 0 - ChoosenSeedsToBuy * 50
                    SetNumbersInMenu("Money", MoneyTotal)
                    ChoosenSeedsToBuy = 0
                }
            } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedKartoffel0`)) {
                if (ChoosenSeedsToBuy * 10 <= MoneyTotal) {
                    KartoffelSeeds += ChoosenSeedsToBuy
                    MoneyTotal += 0 - ChoosenSeedsToBuy * 10
                    SetNumbersInMenu("Money", MoneyTotal)
                    ChoosenSeedsToBuy = 0
                }
            } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedGulerod0`)) {
                if (ChoosenSeedsToBuy * 30 <= MoneyTotal) {
                    GulerodSeeds += ChoosenSeedsToBuy
                    MoneyTotal += 0 - ChoosenSeedsToBuy * 30
                    SetNumbersInMenu("Money", MoneyTotal)
                    ChoosenSeedsToBuy = 0
                }
            }
        }
        SetNumbersInMenu("SeedCountToBuy", ChoosenSeedsToBuy)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(8, 1), assets.tile`Personermad`)) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 1), assets.tile`KartoffelSellHover`)) {
            if (KartoffelAntal >= 1) {
                KartoffelAntal += -1
                TotalPeopleFed += 30
                SetNumbersInMenu("KartofflerModerJord", KartoffelAntal)
            }
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 3), assets.tile`SellGulerodHover`)) {
            if (GulerodAntal >= 1) {
                GulerodAntal += -1
                TotalPeopleFed += 60
                SetNumbersInMenu("GulerødderModerJord", GulerodAntal)
            }
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 5), assets.tile`SellCornHover`)) {
            if (MajsAntal >= 1) {
                MajsAntal += -1
                TotalPeopleFed += 90
                SetNumbersInMenu("MajsModerJord", MajsAntal)
            }
        }
    }
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`8`, function (sprite, location) {
    HoverNumbersMenu(8)
})
function CreatePlayerAndMapOnStart () {
    Bondemand = sprites.create(assets.image`Bondemand`, SpriteKind.Player)
    Moderjord = sprites.create(assets.image`ModerJord`, SpriteKind.ModerJord)
    controller.moveSprite(Bondemand, 200, 200)
    scene.cameraFollowSprite(Bondemand)
    TileMapLandbrug = tilemap`level`
    TileMapButik = tilemap`level0`
    TileMapMenu = tilemap`level12`
    TileMapBuyMenuMajs = tilemap`ModerJordMenu`
    TileMapMenuModerJord = tilemap`KøbMenuMajs`
    tileUtil.connectMaps(TileMapLandbrug, TileMapButik, MapConnectionKind.Door1)
    tileUtil.connectMaps(TileMapLandbrug, TileMapMenu, MapConnectionKind.Door2)
    tiles.setCurrentTilemap(TileMapLandbrug)
    tiles.placeOnTile(Moderjord, tiles.getTileLocation(37, 47))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    MainTileMap = "Farm"
    tileUtil.loadConnectedMap(MapConnectionKind.Door1)
    tiles.placeOnTile(Bondemand, tiles.getTileLocation(50, 21))
    ABEfar()
    DestroySælgere()
    Moderjord = sprites.create(assets.image`ModerJord`, SpriteKind.ModerJord)
    tiles.placeOnTile(Moderjord, tiles.getTileLocation(37, 47))
})
function SetNumbersInMenu (TypeToChangeMenu: string, NumberToShow: number) {
    NumbersToShowArrayInText = []
    NumbersToShowArrayInText.push(convertToText(NumberToShow).split(""))
    for (let index = 0; index <= NumbersToShowArrayInText[0].length - 1; index++) {
        if (TypeToChangeMenu == "Money") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 1, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "Kartoffel") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 3, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "Majs") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 4, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "Gulerod") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 5, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "KartoffelSeed") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 7, 3, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "MajsSeed") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 7, 4, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "GulerodSeed") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 7, 5, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "SeedCountToBuy") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 7, 6, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "KartofflerModerJord") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 1, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "GulerødderModerJord") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 3, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "MajsModerJord") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 5, TypeToChangeMenu)
        } else if (TypeToChangeMenu == "TotalPeopleFed") {
            GetTileNumbers(parseFloat(NumbersToShowArrayInText[0][index]), index + 2, 2, TypeToChangeMenu)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ModerJord, function (sprite, otherSprite) {
    tileUtil.connectMaps(TileMapLandbrug, TileMapMenuModerJord, MapConnectionKind.Door2)
    tileUtil.loadConnectedMap(MapConnectionKind.Door2)
    controller.moveSprite(Bondemand, 0, 0)
    sprites.destroy(AbeFar)
    DestroySælgere()
    SetNumbersInMenu("KartofflerModerJord", KartoffelAntal)
    SetNumbersInMenu("GulerødderModerJord", GulerodAntal)
    SetNumbersInMenu("MajsModerJord", MajsAntal)
    pause(200)
    ChooseArrow = sprites.create(assets.image`ChooseArrow`, SpriteKind.Utility)
    controller.moveSprite(ChooseArrow, 150, 150)
})
function PressAFarmOptions () {
    SpriteFieldLocationCol = Bondemand.tilemapLocation().column
    SpriteFieldLocationRow = Bondemand.tilemapLocation().row + 1
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmField`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldLeftTop`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldRightTop`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldLeftBtn`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldRightBtn`)))) {
        GørMarkKlar()
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldReady`)) {
        if (ValgAfAfgrøder == 0) {
            Bondemand.sayText("Hvad vil du plante?")
            pause(1000)
            Bondemand.sayText("- Tryk A for at skifte mellem afgrøder")
            pause(2000)
            Bondemand.sayText("- Tryk B for at bekæfte")
            pause(2000)
            Bondemand.sayText("")
        } else if (ValgAfAfgrøder == 5) {
            ValgAfAfgrøder = 1
        }
        ValgAfAfgrøder += 1
        VælgAfgrøder(ValgAfAfgrøder)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`MajsSlut`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`KartoffelSlut`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`GulerodSlut`)) {
        GørMarkKlar()
    }
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`6`, function (sprite, location) {
    HoverNumbersMenu(6)
})
scene.onOverlapTile(SpriteKind.Utility, assets.tile`KartoffelSell0`, function (sprite, location) {
    HoverNumbersMenu(12)
})
function AddToGrowPlantsArray (SeedType: number, NewlyPlantedSeedArry: number[]) {
    SeedTypeArray.push(SeedType)
    SeedGrowthTime.push(0)
    PlantedSeedsAarry.push(NewlyPlantedSeedArry)
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`4`, function (sprite, location) {
    HoverNumbersMenu(4)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), assets.tile`Block6`)) && MainTileMap == "Farm") {
        PressAFarmOptions()
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), assets.tile`Block6`) && MainTileMap == "Butik" || tiles.tileAtLocationEquals(tiles.getTileLocation(8, 1), assets.tile`Personermad`)) {
        MenuFunctions()
    }
})
function CreateFieldsSmal (num: number, Index: number) {
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + Index), assets.tile`FarmFieldLeftTop`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + Index), assets.tile`FarmFieldRightTop`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldLeftBtn`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldRightBtn`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    SmallField.push(FarmFieldColRow)
    FarmFieldColRow = []
}
function HøstMark () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`GulerodSlut`)) {
        GulerodAntal += 1
        return "Gulerøder: " + GulerodAntal
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`KartoffelSlut`)) {
        KartoffelAntal += 1
        return "Kartoffler: " + KartoffelAntal
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`MajsSlut`)) {
        MajsAntal += 1
        return "Majs: " + MajsAntal
    } else {
        return 0
    }
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`2`, function (sprite, location) {
    HoverNumbersMenu(2)
})
scene.onOverlapTile(SpriteKind.Utility, assets.tile`SellCorn0`, function (sprite, location) {
    HoverNumbersMenu(14)
})
function PlaceSælgere () {
    MajsSælger = sprites.create(assets.image`FarmerMajs`, SpriteKind.ButiksMedarbejderMajs)
    tiles.placeOnTile(MajsSælger, tiles.getTileLocation(2, 8))
    KartoffelSælger = sprites.create(assets.image`FarmerKartoffel`, SpriteKind.ButiksmedarbedjerKartoffel)
    tiles.placeOnTile(KartoffelSælger, tiles.getTileLocation(1, 1))
    Gulerodsælger = sprites.create(assets.image`FarmerGulerod`, SpriteKind.ButiksmedarbejderGulderod)
    tiles.placeOnTile(Gulerodsælger, tiles.getTileLocation(17, 17))
}
function GørMarkKlar () {
    for (let index22 of CombinedFields) {
        for (let value of index22) {
            for (let index22 = 0; index22 <= value.length; index22++) {
                if (SpriteFieldLocationCol == value[index22 * 2] && SpriteFieldLocationRow == value[index22 * 2 + 1]) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`MajsSlut`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`KartoffelSlut`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`GulerodSlut`)) {
                        for (let index = 0; index < value.length / 2 - 1; index++) {
                            HøstMark()
                        }
                        Bondemand.sayText(HøstMark())
                        for (let index32 = 0; index32 <= value.length / 2; index32++) {
                            tiles.setTileAt(tiles.getTileLocation(value[index32 * 2], value[index32 * 2 + 1]), assets.tile`FarmFieldReady`)
                        }
                        pause(1000)
                        Bondemand.sayText("")
                    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmField`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldLeftTop`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldRightTop`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldLeftBtn`) || tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldRightBtn`)))) {
                        PriceOfField = Math.round((value[3] * 12 + value[2] * 3) / 4) * 100
                        if (MoneyTotal >= PriceOfField) {
                            Bondemand.sayText("Pris: " + convertToText(PriceOfField))
                            pause(500)
                            Bondemand.sayText("")
                            for (let index32 = 0; index32 <= value.length / 2; index32++) {
                                tiles.setTileAt(tiles.getTileLocation(value[index32 * 2], value[index32 * 2 + 1]), assets.tile`FarmFieldReady`)
                            }
                            MoneyTotal += PriceOfField * -1
                        } else {
                            Bondemand.sayText("Pris: " + convertToText(PriceOfField) + " - " + "Ikke penge nok")
                            pause(500)
                            Bondemand.sayText("")
                        }
                    }
                }
            }
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MainTileMap == "Farm") {
        tileUtil.connectMaps(TileMapLandbrug, TileMapMenu, MapConnectionKind.Door2)
    } else if (MainTileMap == "Butik") {
        tileUtil.connectMaps(TileMapButik, TileMapMenu, MapConnectionKind.Door2)
    }
    tileUtil.loadConnectedMap(MapConnectionKind.Door2)
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), assets.tile`Block6`)) {
        DestroySælgere()
        SetNumbersInMenu("Money", MoneyTotal)
        SetNumbersInMenu("Gulerod", GulerodAntal)
        SetNumbersInMenu("Kartoffel", KartoffelAntal)
        SetNumbersInMenu("Majs", MajsAntal)
        SetNumbersInMenu("KartoffelSeed", KartoffelSeeds)
        SetNumbersInMenu("GulerodSeed", GulerodSeeds)
        SetNumbersInMenu("MajsSeed", MajsSeeds)
        SetNumbersInMenu("TotalPeopleFed", TotalPeopleFed)
    } else if (MainTileMap == "Butik") {
        PlaceSælgere()
    } else {
        Moderjord = sprites.create(assets.image`ModerJord`, SpriteKind.ModerJord)
        tiles.placeOnTile(Moderjord, tiles.getTileLocation(37, 47))
    }
})
function HoverNumbersMenu (Number2: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedKartoffel0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedGulerod0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedMajs`)) {
        if (Number2 == 1) {
            tiles.setTileAt(tiles.getTileLocation(2, 4), assets.tile`1Hover`)
        } else if (Number2 == 2) {
            tiles.setTileAt(tiles.getTileLocation(3, 4), assets.tile`2Hover`)
        } else if (Number2 == 4) {
            tiles.setTileAt(tiles.getTileLocation(4, 4), assets.tile`4Hover`)
        } else if (Number2 == 6) {
            tiles.setTileAt(tiles.getTileLocation(5, 4), assets.tile`6Hover`)
        } else if (Number2 == 8) {
            tiles.setTileAt(tiles.getTileLocation(6, 4), assets.tile`8Hover`)
        } else if (Number2 == 10) {
            tiles.setTileAt(tiles.getTileLocation(7, 4), assets.tile`10Hover`)
        } else if (Number2 == 11) {
            tiles.setTileAt(tiles.getTileLocation(3, 6), assets.tile`BUHover`)
            tiles.setTileAt(tiles.getTileLocation(4, 6), assets.tile`UYHover`)
        }
        if (Number2 != 1) {
            tiles.setTileAt(tiles.getTileLocation(2, 4), assets.tile`1`)
        }
        if (Number2 != 2) {
            tiles.setTileAt(tiles.getTileLocation(3, 4), assets.tile`2`)
        }
        if (Number2 != 4) {
            tiles.setTileAt(tiles.getTileLocation(4, 4), assets.tile`4`)
        }
        if (Number2 != 6) {
            tiles.setTileAt(tiles.getTileLocation(5, 4), assets.tile`6`)
        }
        if (Number2 != 8) {
            tiles.setTileAt(tiles.getTileLocation(6, 4), assets.tile`8`)
        }
        if (Number2 != 10) {
            tiles.setTileAt(tiles.getTileLocation(7, 4), assets.tile`10`)
        }
        if (Number2 != 11) {
            tiles.setTileAt(tiles.getTileLocation(3, 6), assets.tile`BU`)
            tiles.setTileAt(tiles.getTileLocation(4, 6), assets.tile`UY`)
        }
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(8, 1), assets.tile`Personermad`)) {
        if (Number2 == 12) {
            tiles.setTileAt(tiles.getTileLocation(5, 1), assets.tile`KartoffelSellHover`)
        } else if (Number2 == 13) {
            tiles.setTileAt(tiles.getTileLocation(5, 3), assets.tile`SellGulerodHover`)
        } else if (Number2 == 14) {
            tiles.setTileAt(tiles.getTileLocation(5, 5), assets.tile`SellCornHover`)
        }
        if (Number2 != 12) {
            tiles.setTileAt(tiles.getTileLocation(5, 1), assets.tile`KartoffelSell0`)
        }
        if (Number2 != 13) {
            tiles.setTileAt(tiles.getTileLocation(5, 3), assets.tile`SellGulerod0`)
        }
        if (Number2 != 14) {
            tiles.setTileAt(tiles.getTileLocation(5, 5), assets.tile`SellCorn0`)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ButiksmedarbedjerKartoffel, function (sprite, otherSprite) {
    tileUtil.connectMaps(TileMapButik, TileMapBuyMenuMajs, MapConnectionKind.Door2)
    tileUtil.loadConnectedMap(MapConnectionKind.Door2)
    controller.moveSprite(Bondemand, 0, 0)
    SetNumbersInMenu("Money", MoneyTotal)
    SetNumbersInMenu("SeedCountToBuy", ChoosenSeedsToBuy)
    DestroySælgere()
    tiles.setTileAt(tiles.getTileLocation(1, 2), assets.tile`SeedKartoffel0`)
    tiles.setTileAt(tiles.getTileLocation(2, 2), assets.tile`1`)
    pause(200)
    ChooseArrow = sprites.create(assets.image`ChooseArrow`, SpriteKind.Utility)
    controller.moveSprite(ChooseArrow, 150, 150)
})
scene.onOverlapTile(SpriteKind.Utility, assets.tile`BU`, function (sprite, location) {
    HoverNumbersMenu(11)
})
function CreateFieldsOnStart () {
    for (let Index222 = 0; Index222 <= 30 / 3; Index222++) {
        if (Index222 < 4) {
            CreateFieldsSmal(4, Index222 + 2)
            CreateFieldsSmal(7, Index222 + 2)
            CreateFieldsSmal(10, Index222 + 2)
            CreateFieldsSmal(13, Index222 + 2)
        } else if (Index222 < 6) {
            CreateFieldsMedium(4, Index222 + 2)
            CreateFieldsMedium(8, Index222 + 2)
            CreateFieldsMedium(12, Index222 + 2)
        } else {
            CreateFieldsLarge(4, Index222 + 2)
            CreateFieldsLarge(10, Index222 + 2)
        }
        FieldTileCount += 1
    }
    CombinedFields.push(SmallField)
    CombinedFields.push(MediumField)
    CombinedFields.push(LargeField)
}
function ABEfar () {
    AbeFar = sprites.create(assets.image`ABE`, SpriteKind.Abe)
    tiles.placeOnTile(AbeFar, tiles.getTileLocation(20, 20))
    AbeFar.setVelocity(10, 10)
    animation.runImageAnimation(
    AbeFar,
    assets.animation`MrJohnson`,
    300,
    true
    )
}
function CreateFieldsLarge (num: number, Index: number) {
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + Index), assets.tile`FarmFieldLeftTop`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldLeftBtn`)
    FarmFieldColRow.push(num)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + Index), assets.tile`FarmFieldRightTop`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 1, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldRightBtn`)
    FarmFieldColRow.push(num + 1)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 2, Index + FieldTileCount + Index), assets.tile`FarmField`)
    FarmFieldColRow.push(num + 2)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 2, Index + FieldTileCount + (Index + 1)), assets.tile`FarmField`)
    FarmFieldColRow.push(num + 2)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 3, Index + FieldTileCount + Index), assets.tile`FarmFieldLeftTop`)
    FarmFieldColRow.push(num + 3)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 3, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldLeftBtn`)
    FarmFieldColRow.push(num + 3)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    tiles.setTileAt(tiles.getTileLocation(num + 4, Index + FieldTileCount + Index), assets.tile`FarmFieldRightTop`)
    FarmFieldColRow.push(num + 4)
    FarmFieldColRow.push(Index + FieldTileCount + Index)
    tiles.setTileAt(tiles.getTileLocation(num + 4, Index + FieldTileCount + (Index + 1)), assets.tile`FarmFieldRightBtn`)
    FarmFieldColRow.push(num + 4)
    FarmFieldColRow.push(Index + FieldTileCount + (Index + 1))
    LargeField.push(FarmFieldColRow)
    FarmFieldColRow = []
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Abe, function (sprite, otherSprite) {
    animation.runImageAnimation(
    AbeFar,
    assets.animation`Abe Hop`,
    200,
    true
    )
    tiles.placeOnTile(AbeFar, tiles.getTileLocation(AbeFar.tilemapLocation().column - 1, AbeFar.tilemapLocation().row - 1))
    pause(2500)
    animation.runImageAnimation(
    AbeFar,
    assets.animation`MrJohnson`,
    300,
    true
    )
    tiles.placeOnTile(AbeFar, tiles.getTileLocation(AbeFar.tilemapLocation().column + 1, AbeFar.tilemapLocation().row + 1))
})
function PlantPåGrund () {
    for (let Index6 of CombinedFields) {
        for (let Value2 of Index6) {
            for (let Index5 = 0; Index5 <= Value2.length; Index5++) {
                if (SpriteFieldLocationCol == Value2[Index5 * 2] && SpriteFieldLocationRow == Value2[Index5 * 2 + 1]) {
                    for (let Index7 = 0; Index7 <= (Value2.length - 1) / 2; Index7++) {
                        if (ValgAfAfgrøder == 2) {
                            if (Value2.length / 2 <= KartoffelSeeds + Index7) {
                                KartoffelSeeds += -1
                                tiles.setTileAt(tiles.getTileLocation(Value2[Index7 * 2], Value2[Index7 * 2 + 1]), assets.tile`KartoffelStart`)
                            } else {
                                Bondemand.sayText("Ikke nok kartoffel seeds")
                                pause(500)
                                Bondemand.sayText("")
                            }
                        } else if (ValgAfAfgrøder == 3) {
                            if (Value2.length / 2 <= MajsSeeds + Index7) {
                                MajsSeeds += -1
                                tiles.setTileAt(tiles.getTileLocation(Value2[Index7 * 2], Value2[Index7 * 2 + 1]), assets.tile`MajsStart`)
                            } else {
                                Bondemand.sayText("Ikke nok majs seeds")
                                pause(500)
                                Bondemand.sayText("")
                            }
                        } else if (ValgAfAfgrøder == 4) {
                            if (Value2.length / 2 <= GulerodSeeds + Index7) {
                                GulerodSeeds += -1
                                tiles.setTileAt(tiles.getTileLocation(Value2[Index7 * 2], Value2[Index7 * 2 + 1]), assets.tile`GulerodStart`)
                            } else {
                                Bondemand.sayText("Ikke nok Gulerod seeds")
                                pause(500)
                                Bondemand.sayText("")
                            }
                        }
                        if (NewlyPlantedSeed.length < Value2.length) {
                            NewlyPlantedSeed.push(Value2[Index7 * 2])
                            NewlyPlantedSeed.push(Value2[Index7 * 2 + 1])
                        }
                    }
                }
            }
        }
    }
    if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(SpriteFieldLocationCol, SpriteFieldLocationRow), assets.tile`FarmFieldReady`))) {
        AddToGrowPlantsArray(ValgAfAfgrøder, NewlyPlantedSeed)
        NewlyPlantedSeed = []
        ValgAfAfgrøder = 1
    }
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`BlackTile`, function (sprite, location) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedKartoffel0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedGulerod0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(1, 2), assets.tile`SeedMajs`)) {
        tiles.setTileAt(tiles.getTileLocation(2, 4), assets.tile`1`)
        tiles.setTileAt(tiles.getTileLocation(3, 4), assets.tile`2`)
        tiles.setTileAt(tiles.getTileLocation(4, 4), assets.tile`4`)
        tiles.setTileAt(tiles.getTileLocation(5, 4), assets.tile`6`)
        tiles.setTileAt(tiles.getTileLocation(6, 4), assets.tile`8`)
        tiles.setTileAt(tiles.getTileLocation(7, 4), assets.tile`10`)
        tiles.setTileAt(tiles.getTileLocation(3, 6), assets.tile`BU`)
        tiles.setTileAt(tiles.getTileLocation(4, 6), assets.tile`UY`)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(8, 1), assets.tile`Personermad`)) {
        tiles.setTileAt(tiles.getTileLocation(5, 1), assets.tile`KartoffelSell0`)
        tiles.setTileAt(tiles.getTileLocation(5, 3), assets.tile`SellGulerod0`)
        tiles.setTileAt(tiles.getTileLocation(5, 5), assets.tile`SellCorn0`)
    }
})
function SetVariablesOnStart () {
    MainTileMap = "Farm"
    MajsSeeds = 0
    KartoffelSeeds = 4
    GulerodSeeds = 0
    MoneyTotal = 1640
    ArrayOfNumbersToTiles = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
    ]
}
scene.onOverlapTile(SpriteKind.Utility, assets.tile`SellGulerod0`, function (sprite, location) {
    HoverNumbersMenu(13)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ButiksmedarbejderGulderod, function (sprite, otherSprite) {
    tileUtil.connectMaps(TileMapButik, TileMapBuyMenuMajs, MapConnectionKind.Door2)
    tileUtil.loadConnectedMap(MapConnectionKind.Door2)
    controller.moveSprite(Bondemand, 0, 0)
    DestroySælgere()
    SetNumbersInMenu("Money", MoneyTotal)
    SetNumbersInMenu("SeedCountToBuy", ChoosenSeedsToBuy)
    tiles.setTileAt(tiles.getTileLocation(1, 2), assets.tile`SeedGulerod0`)
    tiles.setTileAt(tiles.getTileLocation(2, 2), assets.tile`3`)
    pause(200)
    ChooseArrow = sprites.create(assets.image`ChooseArrow`, SpriteKind.Utility)
    controller.moveSprite(ChooseArrow, 150, 150)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Block1`, function (sprite, location) {
    sprites.destroy(AbeFar)
    MainTileMap = "Butik"
    tileUtil.loadConnectedMap(MapConnectionKind.Door1)
    tiles.placeOnTile(Bondemand, tiles.getTileLocation(9, 16))
    PlaceSælgere()
})
scene.onOverlapTile(SpriteKind.Utility, assets.tile`10`, function (sprite, location) {
    HoverNumbersMenu(10)
})
let ArrayOfNumbersToTiles: number[] = []
let NewlyPlantedSeed: number[] = []
let LargeField: number[][] = []
let PriceOfField = 0
let CombinedFields: number[][][] = []
let SmallField: number[][] = []
let ValgAfAfgrøder = 0
let SpriteFieldLocationRow = 0
let SpriteFieldLocationCol = 0
let AbeFar: Sprite = null
let NumbersToShowArrayInText: string[][] = []
let TileMapMenuModerJord: tiles.TileMapData = null
let MajsAntal = 0
let GulerodAntal = 0
let TotalPeopleFed = 0
let KartoffelAntal = 0
let GulerodSeeds = 0
let KartoffelSeeds = 0
let MajsSeeds = 0
let MoneyTotal = 0
let TileMapBuyMenuMajs: tiles.TileMapData = null
let PlantedSeedsAarry: number[][] = []
let SeedGrowthTime: number[] = []
let SeedTypeArray: number[] = []
let FieldToGrowOn = 0
let MediumField: number[][] = []
let FarmFieldColRow: number[] = []
let FieldTileCount = 0
let Gulerodsælger: Sprite = null
let KartoffelSælger: Sprite = null
let MajsSælger: Sprite = null
let Moderjord: Sprite = null
let TileMapLandbrug: tiles.TileMapData = null
let ChoosenSeedsToBuy = 0
let ChooseArrow: Sprite = null
let Bondemand: Sprite = null
let TileMapMenu: tiles.TileMapData = null
let TileMapButik: tiles.TileMapData = null
let MainTileMap = ""
Startskærm()
SetVariablesOnStart()
CreatePlayerAndMapOnStart()
CreateFieldsOnStart()
ABEfar()
game.onUpdateInterval(2000, function () {
    AbeFar.follow(Bondemand, 0)
})
game.onUpdateInterval(1000, function () {
    if (MainTileMap == "Farm" && !(tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), assets.tile`Block6`))) {
        for (let Value22 of SeedGrowthTime) {
            if (Value22 >= 20) {
                GrowPlants(Value22)
            }
            SeedGrowthTime[SeedGrowthTime.indexOf(Value22)] = Value22 + 1
        }
    }
})
game.onUpdateInterval(60000, function () {
    if (TotalPeopleFed != 0) {
        Bondemand.sayText("NY DONATION PÅ: " + TotalPeopleFed / 6, 2000, false)
        MoneyTotal += TotalPeopleFed / 2
    }
})
game.onUpdateInterval(200, function () {
    MovePlayerAnimation()
})
game.onUpdateInterval(10000, function () {
    AbeFar.follow(Bondemand, 20)
})
