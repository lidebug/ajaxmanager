var js = require("libraryjs");

class AjaxManager {

  constructor() {
    this.isDb = false;
    this.isRes = false;
    this.isReq = false;
    this.isClosed = false;

    this.import = {};
    this.export = {};

    this.errors = new js.Errors();
    this.endEvents = new js.Events();
  }

  set(param) {
    if (js.is(param.db)) this.setdb(param.db);
    if (js.is(param.res)) this.setres(param.res);
    if (js.is(param.req)) this.setreq(param.req);
  }

  setdb(db) {
    this.db = db;
    this.isDb = true;
  }

  setreq(req) {
    this.req = req;
    if ( js.is(this.req.body) ) this.import = this.req.body;
    this.isReq = true;
  }

  setres(res) {
    this.res = res;
    this.isRes = true;
  }

  onend(event) {
    return this.endEvents.push(event);
  }

  error(msg, code) {
    this.adderror(msg, code);
    this.end();
  }
  adderror(msg, code) {
    console.log("[ERROR]: " + msg);
    this.errors.addError(msg, code);
  }

  success() {
    this.end();
  }

  send(pkg) {
    this.export = pkg;
    this.close();
  }

  reply(pkg) {
    this.export.pkg = pkg;
    this.end();
  }

  end() {
    Object.assign(this.export, this.errors.exportErrors());

    this.close();
  }

  close() {
    if (this.isClosed) {
      console.log("[ERROR]: ajax was closed already");
      return;
    }
    this.isClosed = true;

    this.endEvents.run();
    if (this.isDb) this.db.close();

    if (!this.isRes) {
      console.log("[ERROR]: ajax response isn't set");
      return;
    }

    this.res.send(this.export);
  }

}

function create() {
  return new AjaxManager();
}

module.exports = {
  body: AjaxManager,
  create: create
};