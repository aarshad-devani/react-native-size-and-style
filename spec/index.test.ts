import { registerDeviceInfo, useDeviceData } from ".."

interface ITestInterface {
  myTestField: string
}

const myFactory = registerDeviceInfo<ITestInterface>(() => ({
  myTestField: "blue"
}))

const mySizedStyles = myFactory((myCustomData) => ({
  container: {
    backgroundColor: myCustomData.myTestField
  }
}))

describe("useDeviceData should work well", function () {
  it("should return the correct data", function () {
    const styles = useDeviceData(mySizedStyles)
    expect(styles.container.backgroundColor).toEqual("blue")
  })
})
