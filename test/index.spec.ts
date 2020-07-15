import { expect } from "chai"
import helloWorld from "../src/index"

describe("Hello, World", () => {
    it('Must equal with "Hello, World"', (done) => {
        const world = helloWorld()
        expect(world).to.equal("Hello, World!")
        done()
    })
    it("Must be a string", () => {
        const world = helloWorld()
        expect(world).to.be.a("string")
    })
})
