import AsyncStorage from "@react-native-async-storage/async-storage";
import { TModel, keyByModelName } from "./key-by-model";

export type TDataItem = {
  id: number;
  money: string;
  description: string;
  date: Date;
};

export class Model {
  storage: typeof AsyncStorage | null = null;
  key = "";

  private static _instance: Model;

  private constructor(name: TModel, storage: typeof AsyncStorage) {
    this.storage = storage;
    this.key = keyByModelName[name];
  }

  public static getInstance(type: TModel, storage: typeof AsyncStorage) {
    if (this._instance) return this._instance;
    this._instance = new Model(type, storage);
    return this._instance;
  }

  async getAll(): Promise<TDataItem[]> {
    if (!this.storage) {
      throw new Error(`Storage not found`);
    }
    const data = await this.storage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  async getAllOrderedByLatest(): Promise<TDataItem[]> {
    const all = await this.getAll();
    return all.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (aDate < bDate) return 1;
      else if (aDate > bDate) return -1;
      return 0;
    });
  }

  async getById(id: number): Promise<TDataItem> {
    if (!this.storage) {
      throw new Error(`Storage not found`);
    }
    const all = await this.getAll();
    const found = all.find((item) => item.id === id);
    if (!found) {
      throw new Error(`Not found`);
    }
    return found;
  }

  async create(data: Omit<TDataItem, "id" | "date">): Promise<TDataItem> {
    if (!this.storage) {
      throw new Error(`Storage not found`);
    }
    const all = await this.getAll();
    const lastItem = all[all.length - 1];
    const input: TDataItem = {
      id: lastItem?.id > 0 ? lastItem.id + 1 : 1,
      money: data.money,
      description: data.description,
      date: new Date(),
    };
    const allItems = [...all, input];
    console.warn("allItems", allItems);
    await this.storage.setItem(this.key, JSON.stringify(allItems));
    return input;
  }

  async deleteById(id: number): Promise<void> {
    if (!this.storage) {
      throw new Error(`Storage not found`);
    }
    const all = await this.getAll();
    const foundIdx = all.findIndex((item) => item.id === id);
    if (foundIdx === -1) {
      throw new Error(`Item not found`);
    }
    all.splice(foundIdx, 1);
    await this.storage.setItem(this.key, JSON.stringify(all));
  }
}
