import MemoryAdapter from '../adapters/memory';
import random from '../utils/random';

export default class PwdKeeper {
  constructor (adapter, domainPrefix = '$d$', identityPrefix = '$i$') {
    if (!adapter) {
      adapter = new MemoryAdapter();
    }
    this.adapter = adapter;
    this.domainPrefix = domainPrefix;
    this.identityPrefix = identityPrefix;
  }

  addDomain (domain) {
    return this.adapter.add(this._domainKey(domain), random());
  }

  removeDomain (domain) {
    return this.adapter.remove(this._domainKey(domain));
  }

  allDomains () {
    return this.adapter.keys(this.domainPrefix).map(key => this._domain(key));
  }

  addCredential (domain, identity, password) {
    const domainHash = this.adapter.get(this._domainKey(domain));
    return this.adapter.add(this._identityKey(domainHash, identity), password);
  }

  updateCredential (domain, identity, password) {
    const domainHash = this.adapter.get(this._domainKey(domain));
    return this.adapter.update(this._identityKey(domainHash, identity), password);
  }

  removeCredential (domain, identity) {
    const domainHash = this.adapter.get(this._domainKey(domain));
    return this.adapter.remove(this._identityKey(domainHash, identity));
  }

  allCredentials (domain) {
    const domainHash = this.adapter.get(this._domainKey(domain));
    return this.adapter.keys(`${this.identityPrefix}${domainHash}`).map(key => this._identity(domainHash, key));
  }

  getCredentialPassword (domain, identity) {
    const domainHash = this.adapter.get(this._domainKey(domain));
    return this.adapter.get(this._identityKey(domainHash, identity));
  }

  _domainKey (domain) {
    return `${this.domainPrefix}${domain}`;
  }

  _domain (key) {
    return key.replace(this.domainPrefix, '');
  }

  _identityKey (domainHash, identity) {
    return `${this.identityPrefix}${domainHash}${identity}`;
  }

  _identity (domainHash, key) {
    return key.replace(`${this.identityPrefix}${domainHash}`, '');
  }
}
