import { createAsyncThunk } from '@reduxjs/toolkit';
import { SoftGoodInterface } from './SoftGoodType';

const API_URL = '/api/admin/products/softgoods';

export const fetchSoftGoods = createAsyncThunk<SoftGoodInterface[], void, { rejectValue: string }>(
  'softgoods/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?limit=5000`);
      if (!response.ok) throw new Error('Failed to fetch SoftGoods products');
      const data = await response.json();
      return data.data as SoftGoodInterface[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while fetching SoftGoods products');
    }
  }
);

export const fetchSoftGoodById = createAsyncThunk<SoftGoodInterface, string, { rejectValue: string }>(
  'softgoods/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch SoftGood product');
      const data = await response.json();
      return data.data as SoftGoodInterface;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while fetching the SoftGood product');
    }
  }
);

export const createSoftGood = createAsyncThunk<
  any,
  SoftGoodInterface | SoftGoodInterface[],
  { rejectValue: string }
>(
  'softgoods/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create SoftGood product(s)');
      const data = await response.json();
      return data as SoftGoodInterface | SoftGoodInterface[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while creating SoftGood product(s)');
    }
  }
);

export const updateSoftGood = createAsyncThunk<
  SoftGoodInterface,
  { sku: string; data: Partial<SoftGoodInterface> },
  { rejectValue: string }
>(
  'softgoods/update',
  async ({ sku, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ ...data, sku }]),
      });
      if (!response.ok) throw new Error('Failed to update SoftGood product');
      const responseData = await response.json();
      return responseData.data as SoftGoodInterface;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while updating the SoftGood product');
    }
  }
);

export const deleteSoftGood = createAsyncThunk<string, string, { rejectValue: string }>(
  'softgoods/delete',
  async (sku, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([sku]),
      });
      if (!response.ok) throw new Error('Failed to delete SoftGood product');
      return sku;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred while deleting the SoftGood product');
    }
  }
);
