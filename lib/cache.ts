export default class LocalStorageCache {
  public cache: { [key: string]: string } = {};

  constructor() {
    this.cache = {};
  }

  save() {
    this.cache = { ...localStorage };
  }

  clear() {
    localStorage.clear();
  }

  saveAndClear() {
    this.save()
    this.clear()
  }

  restore() {
    for (const key in this.cache) {
      localStorage.setItem(key, this.cache[key]);
    }
  }
}
