import {expect} from "chai";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;

describe("Our first test", ()=>{
    it("should pass ", ()=>{
        expect(true).to.equal(true)
    })
})

describe('index.html', () => { // eslint-disable-line
  it('should say Users' , (done) => { // eslint-disable-line
    const index = "./src/index.html";
    const options = { }
    JSDOM.fromFile(index, options)
    .then(dom => {
      const h1 = dom.window.document.getElementsByTagName('h1')[0]
      expect(h1.innerHTML).to.equal('Users')
      done()
    }).catch(done)
  })
})
